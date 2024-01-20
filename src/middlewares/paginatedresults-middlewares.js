const {ErrorResponse}=require('../utils/common');

function paginatedResults(model){

    return async(req,res,next)=>{
        try{
            const page = parseInt(req.query.page,10) || 1 // default page 1 
            const limit = parseInt(req.query.limit,10) || 10  // default limit 10
            const startIndex = (page-1)*limit
            const endIndex = (page*limit)
            // Create a new object without 'page' and 'limit' properties
            const { page: _, limit: __, ...newQuery } = req.query;
            const results = {}
            const count = await model.countDocuments(newQuery)
            if(startIndex>0){
                results.previous = {
                    page : page -1,
                    limit : limit 
                }
            }
            if(endIndex<count){
                results.next = {
                    page : page + 1,
                    limit : limit
                }
            }   
            results.results=await model.find(newQuery)
                                                    .skip(startIndex)
                                                    .limit(limit)
                                                    .exec()
            res.paginatedResults=results
            next();
        }catch(error){
            ErrorResponse.error=error
            return res
                      .status(error.statusCode)
                      .json(ErrorResponse)
        }
    }
}

module.exports={
    paginatedResults
}