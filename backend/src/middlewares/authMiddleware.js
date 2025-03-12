const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");

dotenv.config();

const authenticateJWT=(req,res,next)=>{
    const authHeader=req.header("Authorization");

    if(!authHeader|| !authHeader.startsWith("Bearer ")){
        res.status(401).json({message:"Accesss Denied"});
    }
    const token=authHeader.split(" ")[1];
    try{
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        req.user=verified;
        next();
    }catch(error){
        next(error);
    }
    };
module.exports= authenticateJWT;
