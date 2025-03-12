const mongoose=require(`mongoose`);

    const productSchema=new mongoose.Schema({
        productName:{type:String,requires:true},
        category:{type:String ,required:true},
        subCatergory:{type:String , default:"NA"}
    });
 module.exports=mongoose.model("product",productSchema);