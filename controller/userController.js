const RegisterModel = require('../models/user')
const passport = require('passport');






const home = (req,res) => {
    res.render('home');
}

const getRegistered = (req,res) => {
    res.render('signup')
}

const postRegistered =  async (req, res)=>{
    if(req.body.fname == '' || req.body.username=='' || req.body.password=='' || req.body.confirmPassword == ''){
      req.session.message = {
        type: 'danger',
        intro: 'Empty fields! ',
        message: 'Please insert the requested information.'
      }
      res.redirect('/register')
    }
    else if(req.body.password != req.body.confirmPassword){
      req.session.message = {
        type: 'danger',
        intro: 'Password do not match! ',
        message: 'Please make sure to insert the same password.'
      }
      res.redirect('/register')
    }
    else{
        const newUser = req.body
        console.log(newUser)
        const fname = newUser.fname;
        const email = newUser.username;
        const phone = newUser.phone;
        try {
        const user = await RegisterModel.findOne({fname,email,phone})
        if (user)  return res.send('User already exist')
        const userCreated = await RegisterModel.create(req.body)
        req.session.message = {
            type: 'success',
            intro: 'You are now registered! ',
            message: 'Please log in.'
        }
        res.redirect('/register')
        // res.status(200).send({status:'success',msg:'user added successfully'})
    }   catch (error) {
        // res.status(400).send({status:'error',msg:'user added failed'})
        console.log(error)
        req.session.message = {
            type: 'danger',
            intro: 'Empty fields! ',
            message: 'Error while creating user'
          }
          res.redirect('/register')
    }
    }
  }


const getLogin = (req,res) => {
    res.render('login')
}

const postLogin = async (req,res) => {
    if(req.body.username=='' || req.body.password==''){
        req.session.message = {
          type: 'danger',
          intro: 'Empty fields! ',
          message: 'Please insert the requested information.'
        }
        res.redirect('/login')
      }else{
        const user = await RegisterModel.findOne(req.body);
        if(!user){
            req.session.message = {
                type: 'danger',
                intro: 'User Not Found! ',
                message: 'Please Register First !'
              }
              res.redirect('/login')
        }else {
            res.redirect('/dashboard')
        }
        
      }
    
}

const logout =  (req,res) => {
  req.logout();
  res.redirect('/')
}


module.exports = {
    getRegistered,
    postRegistered,
    getLogin,
    postLogin,
    logout,
    home
}