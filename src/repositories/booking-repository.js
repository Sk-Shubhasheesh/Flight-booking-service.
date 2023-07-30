const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const { Booking } = require('../models');
const CrudRepository = require('./crud-repository');
const {  Enums } = require('../utils/common');
const { BOOKED ,CANCELLED } = Enums.BOOKING_STATUS;


class BookingRepository extends CrudRepository {
    constructor(){
        super(Booking);
    }
    async createBooking(data, transaction){
        const responce = await Booking.create(data, {transaction: transaction});
        return responce;
    }

    async get(data, transaction){
        try {
           const responce = await Booking.findByPk(data, {transaction: transaction}); // findByPk method obtains only a single entry from the table, using the provided primary key.
           return responce;
        } catch (error) {
            Logger.error('Something went wrong in the Crud Repo: get');
            throw error;
        }
    }

    async update(id, data, transaction){  // data -> {col:value, ....}
        try {
           const responce = await Booking.update(data, {
            where : {
                id : id
            }
           }, {transaction: transaction}) 
           return responce;
        } catch (error) {
            Logger.error('Something went wrong in the Crud Repo: update');
            throw error;
        }
    }

    async cancelOldBookings(timestamp) {
        const response = await Booking.update({status:CANCELLED}, {
            where: {
                [Op.and]: [
                    {
                        createdAt: {
                            [Op.lt] : timestamp
                        }
                    }, {
                        status:{
                            [Op.ne]: BOOKED
                        }
                    },
                    {
                        status: {
                            [Op.ne]: CANCELLED
                        }
                    }
                    
                ], 
                
            }
        });
        return response;
    }
}

module.exports = BookingRepository;