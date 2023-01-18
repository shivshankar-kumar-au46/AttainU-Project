const mongoose = require('mongoose');


// User Schema

const newPatientSchema = mongoose.Schema({
	name:{type:String, required:true},
	username:{type:String, required:true},
	phone:{type:String, required:true},
	department:{type:String, required:true},
	doctors:{type:String, required:true},
	address:{type:String, required:true}

})

const PatientNew = mongoose.model('appointment', newPatientSchema)


module.exports = PatientNew;
