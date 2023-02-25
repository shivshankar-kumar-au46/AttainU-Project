/*
 	Define the authentification system and the user model.

	***Password are stored encrypted using Bcrypt algorithm.
*/
const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken')


const newUserSchema =  mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
		unique:true
    },
	phone:{
		type:String,
		required:true
	},
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    is_Admin:{
        type:Boolean,
        default:false
    }
})


newUserSchema.pre('save', async function (next) {
	if(this.isModified('password')){
		this.password = await bcrypt.hash(this.password, 10);
		this.confirmPassword = undefined;
	}
	next();
})




const RegisterModel = mongoose.model("newUser",newUserSchema)

module.exports = RegisterModel


