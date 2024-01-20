const CrudRepository  = require('./crud-repository')
const { BookMark } = require("../models")

class bookMarkRepository extends CrudRepository{

    constructor(){
        super(BookMark)
    }

   async getLatestBookmarks(query){
    // Sort in descending order based on the timestamp
      const latestRecords = await BookMark.find(query)
                                                .sort({createdAt:-1})
                                                .limit(5)
      return latestRecords;
   }

}

module.exports=bookMarkRepository
