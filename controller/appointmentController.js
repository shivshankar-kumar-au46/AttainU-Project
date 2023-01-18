const PatientNew = require('../models/patient');


const getAppointment = (req,res) => {
    res.render('bookAppointment');
}



const postAppointment =  async (req, res)=>{
    if(req.body.name == '' || req.body.username=='' || req.body.phone==''){
      req.session.message = {
        type: 'danger',
        intro: 'Empty fields! ',
        message: 'Please insert the requested information.'
      }
      res.redirect('/bookAppointment')
    } else{
        const newPatient = req.body
        const name = newPatient.fname;
        const email = newPatient.username;
        const phone = newPatient.phone;
        try {
        const user = await PatientNew.findOne({name,email,phone})
        if (user){
          req.session.message = {
            type: 'danger',
            intro: 'user already Exists! ',
            message: 'Please Register with new information'
          }
        }
        const newPatientCreated = await PatientNew.create(req.body)
        req.session.message = {
            type: 'success',
            intro: 'Appointment Booked! ',
            message: 'Thanks visit again'
        }
        res.redirect('/bookAppointment')
    }   catch (error) {
        console.log(error)
        req.session.message = {
            type: 'danger',
            intro: 'Empty fields! ',
            message: 'Error while creating user'
          }
          res.redirect('/bookAppointment')
    }
    }
  }



module.exports = {
    getAppointment,
    postAppointment
}