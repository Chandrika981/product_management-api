const Joi =require("joi");
const productSchema=Joi.object({
    productName : Joi.string().min(3).max(50).required(),
    category:Joi .string().required(),
    subCategory: Joi.string().optional(),
})
module.exports=productSchema;