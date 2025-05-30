const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     {
     type: String,
      required: true,
       unique: true ,
       validate(value){
      if(!validator.isEmail(value)) {
        throw new Error("Email is not valid");  
       }
      }
      },
  password:  { type: String, required: true },
  skills:    { type: [String], default: [] }, // 👈 Added skills field
  age:       { type: Number },
  photoUrl:  { type: String, default: "default.jpg" },
  gender:    { 
    type: String,
    validate(value) {
      if (!["male", "female", "other"].includes(value)) {
        throw new Error("Gender data is not valid");
      }
    }
  }
},
 {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
