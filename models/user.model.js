const jwt =require ('jsonwebtoken');
const Joi =require ('joi');
const  mongoose =require ('mongoose');
const schema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true

    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    nationalId:{
        type:String,
        required:true
    },
    role:{
        type:String,
        values:['admin','user','candidate'],
        default:'user'
    }


},{
    timestamps:true
})
schema.methods.generateAuthToken = function () {
    return jwt.sign({
      id: this._id,
    }, process.env.JWT_SECRET, {
      expiresIn: '5h'
    })
  };

  const Model = mongoose.model("user", schema);
module.exports.NationalIdPattern = /(?<!\d)\d{16}(?!\d)/;
module.exports.PhoneRegex = /(?<!\d)\d{10}(?!\d)/
module.exports.User = Model;
module.exports.validateUser = (body, isUpdating = false) => {
    return Joi.object({
      name: Joi.string().required(),
      address: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().pattern(this.PhoneRegex).required(), // validate phone
      password: isUpdating ? Joi.string().min(6) : Joi.string().min(6).required(),
      nationalId: Joi.string().pattern(this.NationalIdPattern).length(16).required(),
    }).validate(body);
  };
  module.exports.validateUserLogin = (body) => {
    return Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }).validate(body);
  };