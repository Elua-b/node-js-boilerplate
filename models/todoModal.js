const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const schema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    }
},{
    timestamps:true
})
module.exports.Todo=mongoose.model("todo",schema);
module.exports.validateTodo=(body)=>{
    return Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        status:Joi.string().valid('active','inactive')
    }).validate(body)
}
