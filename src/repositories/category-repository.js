const CrudRepository  = require('./crud-repository')
const { Category } = require("../models")

class categoryRepository extends CrudRepository{

    constructor(){
        super(Category)
    }
    
    async searchCategories(req){
        const results =await Category.find({
            "$or": [
                { name: { $regex: req.params.key, $options: 'i' } },
                { description: { $regex: req.params.key, $options: 'i' } }
            ]
        });
        return results;
    }


}

module.exports=categoryRepository
