const CrudRepository  = require('./crud-repository')
const { BookMark } = require("../models")

class bookMarkRepository extends CrudRepository{

    constructor(){
        super(BookMark)
    }

}

module.exports=bookMarkRepository
