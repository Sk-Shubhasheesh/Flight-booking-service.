const { StatusCodes } = require('http-status-codes');

const { Booking } = require('../models');
const CrudRepository = require('./crud-repository');

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
           const responce = await this.model.findByPk(data, {transaction: transaction}); // findByPk method obtains only a single entry from the table, using the provided primary key.
           return responce;
        } catch (error) {
            Logger.error('Something went wrong in the Crud Repo: get');
            throw error;
        }
    }

    async update(id, data, transaction){  // data -> {col:value, ....}
        try {
           const responce = await this.model.update(data, {
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
}

module.exports = BookingRepository;