const jwt = require('jsonwebtoken')
const userAuth=(req,res,next)=>{
    const tokens= req.header.authorization
    if(!tokens){
        return res.status(401).json({message:"no token was provided"})
    }
    try{
      const decoded=jwt.verify(tokens,process.env.JWT_SECRET);
      req.user=decoded;
      next()
    }
    catch(err){
        return res.status(401).json({message:"invalid token"})
    }
}
module.exports=userAuth;