const jwt = require("jsonwebtoken")
module.exports = (req,res,next)=>{
    const accessToken = req.headers.authorization?.split(" ")[1]
    if (!accessToken)
        return res.status(401).json({message:"access token is missing"})
    try{
        const decoded = jwt.verify(accessToken,process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    }
    catch(err){
        return res.status(401).json({message:"invalid access token"})
    }
}