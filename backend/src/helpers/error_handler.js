const error_handler=(fn,func_name)=>{
    return async(req,res)=>{
        try{
            await fn(req,res);
        }catch(e){
            console.log(`error in ${func_name}`,e)
            res.send({error:e.message})
        }
    }
}
module.exports=error_handler