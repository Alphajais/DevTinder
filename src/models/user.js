const mongooes = require('mongoose');
const userSchema = new  mongooes.Schema({
   firstName:{
    type:String
   },
    lastName:{
     type:String
    },  
    age:{
     type:Number
    },
    email:{
     type:String,
     required: true 
    },
    password:{
     type:String,
     required: true
    },
    gender:{
        type:String
    }
});

const User = mongooes.model('User', userSchema);
module.exports = User;