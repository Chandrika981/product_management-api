const express=require('express');

const router=express.Router();
router.use((req,res,next)=>{
    console.log("User route Accessed");
    next();
});

router.get("/",(req,res)=>{
res.status(200),json({users:"All users"});
});

module.exports=router;