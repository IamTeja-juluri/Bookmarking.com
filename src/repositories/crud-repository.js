const AppError = require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');

class CrudRepository{
    
    constructor(model){
        this.model=model;
    }

    async create(data){
        const response=await this.model.create(data);
        return response;
    }

    async destroy(data){  
        const response=await this.model.destroy({
            where:{
                id:data
            }
        });
        if(!response)
            throw new AppError("Not able to find resource",StatusCodes.NOT_FOUND);
        return response;
    }

    async get(data){
        const response=await this.model.find(data);
        if(!response)
            throw new AppError("Not able to find resource",StatusCodes.NOT_FOUND);
        return response;
    }

    async getOne(data){
        console.log("repository")
        const response=await this.model.findById(data);
        console.log(response)
        if(!response)
            throw new AppError("Not able to find resource",StatusCodes.NOT_FOUND);
        return response;
    }

    async getAll(){
        const response=await this.model.find();
        return response;
    }

    async update(id,data){
        const response=await this.model.update(data,{
            where :{
                id:id
            }
        });
        console.log(response);
        return response;
    }
    
}

module.exports=CrudRepository;

