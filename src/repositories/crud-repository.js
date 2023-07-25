const { Logger } = require('../config')

class CrudRepository{
    // This class has a constructor method that takes a model parameter
    constructor(model){
        this.model = model;
    }

    async create(data){
        try {
           const responce = await this.model.create(data);
           return responce;
        } catch (error) {
            Logger.error('Something went wrong in the Crud Repo: create');
            throw error;
        }
    }

    async destroy(data){
        try {
           const responce = await this.model.destroy({
            where : {
                id: data
            }
           });
           return responce;
        } catch (error) {
            Logger.error('Something went wrong in the Crud Repo: Delete');
            throw error;
        }
    }

// get function is doning something like - select * from airplanes where id = this so where is primary key it put it on where query on that primary key  
    async get(data){
        try {
           const responce = await this.model.findByPk(data) // findByPk method obtains only a single entry from the table, using the provided primary key.
           return responce;
        } catch (error) {
            Logger.error('Something went wrong in the Crud Repo: get');
            throw error;
        }
    }

 // these function is give to all of data no filtering in nothing . So findAll method is generates a standard SELECT query which will retrieve all entries from the table (unless restricted by something like a where clause,
    async getAll(data){
        try {
           const responce = await this.model.findAll() // we does not pass the data because there in no filtering is done here
           return responce;
        } catch (error) {
            Logger.error('Something went wrong in the Crud Repo: getAll');
            throw error;
        }
    }

    // Update the value on id basiss
    async update(id, data){  // data -> {col:value, ....}
        try {
           const responce = await this.model.update(data, {
            where : {
                id : id
            }
           }) 
           return responce;
        } catch (error) {
            Logger.error('Something went wrong in the Crud Repo: update');
            throw error;
        }
    }
}

module.exports = CrudRepository;