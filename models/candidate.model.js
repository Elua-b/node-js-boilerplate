const mongoose = require("mongoose");
const Joi= require("joi");
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  nationalId: {
    type: String,
    required: true,
  },


},
{
    timeStamps:true
}

);
const Model = mongoose.model("candidate", schema);
// module.exports = mongoose.model("Candidate",schema);
module.exports.NationalIdPattern = /(?<!\d)\d{16}(?!\d)/;
module.exports.PhoneRegex = /(?<!\d)\d{10}(?!\d)/

module.exports.Candidate = Model;
module.exports.validateUser = (body, isUpdating = false) => {
  return Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(this.PhoneRegex).required(), 
    nationalId: Joi.string().pattern(this.NationalIdPattern).length(16).required(),
  }).validate(body);
};

