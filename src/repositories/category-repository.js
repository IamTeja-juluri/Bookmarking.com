const CrudRepository  = require('./crud-repository')
const { Category } = require("../models")

class categoryRepository extends CrudRepository{

    constructor(){
        super(Category)
    }

}

module.exports=categoryRepository
