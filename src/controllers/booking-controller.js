const{StatusCodes} = require('http-status-codes');
const { BookingService } = require('../services');
// const { response } = require('express');
const{SuccessResponce, ErrorResponce} = require('../utils/common');
// const { data } = require('../utils/common/error-response');

const inMemoryDb = {};

async function createBooking(req, res){
    try {
        // console.log("body", req.body);
        const response = await BookingService.createBooking({
            flightId: req.body.flightId,
            userId: req.body.userId,
            noOfSeats:req.body.noOfSeats

        });
        SuccessResponce.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponce);

    } catch (error) {
        ErrorResponce.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponce);
    }
}


async function makePayment(req, res){
    try {
        const idempotencykey = req.headers['x-idempotency-key'];
        if(!idempotencykey){
            return res
            .status(StatusCodes.BAD_REQUEST)
            .json({message: 'idempotency key is missing'});

        }
        if(inMemoryDb[idempotencykey]){
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({message: 'Cannot retry on a successful payment'});
        }
        // console.log("body", req.body);
        const response = await BookingService.makePayment({
            userId: req.body.userId,
            bookingId:req.body.bookingId,
            totalCost: req.body.totalCost,

        });
        inMemoryDb[idempotencykey] = idempotencykey;
        SuccessResponce.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponce);

    } catch (error) {
        ErrorResponce.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponce);
    }
}






module.exports = {
    createBooking,
    makePayment
}