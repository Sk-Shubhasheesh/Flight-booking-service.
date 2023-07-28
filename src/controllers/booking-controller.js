const{StatusCodes} = require('http-status-codes');
const { BookingService } = require('../services');
// const { response } = require('express');
const{SuccessResponce, ErrorResponce} = require('../utils/common');
// const { data } = require('../utils/common/error-response');

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

module.exports = {
    createBooking
}