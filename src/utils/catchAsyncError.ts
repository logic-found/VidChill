const catchAsyncError = (fun : Function) => {
    return async (...args) => {
        try{
            await fun(...args)
        }
        catch(err){
            console.log(err)
        }
    }
} 

export default catchAsyncError