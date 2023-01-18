const mongoose = require ('mongoose');

const docSchema =  mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    phone:{type:String,required:true},
    speciality:{type:String,required:true},
    professional_bio:{type:String,required:true},
    academic_qualifications:{type:String,required:true},
    industry_exp:{type:String,required:true},
})

const DocModel = mongoose.model('doctor',docSchema);



const EmpSchema =  mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    phone:{type:String,required:true},
    department:{type:String,required:true},
    designation:{type:String,required:true},
    academic_qualifications:{type:String,required:true},
    experiance:{type:String,required:true},
    address:{type:String,required:true},
    payroll:{type:Number,required:true}
})

const EmpModel = mongoose.model('employee',EmpSchema);

module.exports = EmpModel