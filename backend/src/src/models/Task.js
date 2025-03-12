const mongoose=require(`mongoose`);

    const taskSchema=new mongoose.Schema({
        taskName:{type:String,requires:true},
        description:{type:String ,required:true},
        status:{type:String , default:"NA"}
    });
    
 module.exports=mongoose.model("Task",taskSchema);