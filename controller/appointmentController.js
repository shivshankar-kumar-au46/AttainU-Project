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
      res.redirect('/appointment')
    } else{
        const newPatient = req.body
        const name = newUser.fname;
        const email = newUser.username;
        const phone = newUser.phone;
        try {
        const user = await PatientNew.findOne({name,email,phone})
        if (user)  return res.send('User already exist')
        const newPatientCreated = await PatientNew.create(req.body)
        req.session.message = {
            type: 'success',
            intro: 'Appointment Booked! ',
            message: 'Thanks visit again'
        }
        res.redirect('/appointment')
    }   catch (error) {
        console.log(error)
        req.session.message = {
            type: 'danger',
            intro: 'Empty fields! ',
            message: 'Error while creating user'
          }
          res.redirect('/appointment')
    }
    }
  }



module.exports = {
    getAppointment,
    postAppointment
}