
const DocModel = require('../models/employee_and_doc_models') // importing doctor model form db
const EmpModel = require('../models/employee_and_doc_models') // importing employee model fromm db


// [GET req] Render new doctor form page
const getDoctors =  (req,res) => {
    res.render('addDoctors')
}


// POST req for adding new doctor
const addDoctor = async (req,res) => {
    const newDoc = req.body;
    
        if(req.body.name == '' || req.body.username=='' || req.body.phone==''){
            req.session.message = {
              type: 'danger',
              intro: 'Empty fields! ',
              message: 'Please insert the requested information.'
            }
            res.redirect('/getAllDoctors')
          } else {
            const name = newDoc.name;
            const username = newDoc.username;
            const phone = newDoc.phone;
            try {
            const user = await DocModel.findOne({name,username,phone})
        if (user)  return res.send('User already exist')
        const userCreated = await DocModel.create(newDoc)
                if(userCreated) return res.send('Registered Successfully !')
        res.redirect('/dashboard')
           }catch (error) {
        req.session.message = {
            type: 'danger',
            intro: 'Empty fields! ',
            message: 'Error while creating user'
          }
          res.redirect('/getAllDoctors')
    }
}
}


// [GET req] Render new employee form page
const getEmployees = (req,res) => {
    res.render('addEmployee')
}


// POST req for adding new employee
const addEmployees = async (req,res) => {
    const newEmp = req.body;
    console.log(newEmp)
        if(req.body.name == '' || req.body.username=='' || req.body.phone==''){
            req.session.message = {
              type: 'danger',
              intro: 'Empty fields! ',
              message: 'Please insert the requested information.'
            }
            res.redirect('/getEmployees')
          } else {
            const name = newEmp.name;
            const username = newEmp.username;
            const phone = newEmp.phone;
            try {
            const user = await EmpModel.findOne({name,username,phone})
        if (user)  return res.send('User already exist')
        const userCreated = await EmpModel.create(req.body)
        req.session.message = {
          type: 'success',
          intro: 'You are now registered! ',
      }
        res.redirect('/getEmployees')
           }catch (error) {
        req.session.message = {
            type: 'danger',
            intro: 'Empty fields! ',
            message: 'Error while creating user'
          }
          res.send(error)
          res.redirect('/getEmployees')
    }
}
}


// exporting all above handlers/controllers function
module.exports = {
    getEmployees,
    addEmployees,
    getDoctors,
    addDoctor
}