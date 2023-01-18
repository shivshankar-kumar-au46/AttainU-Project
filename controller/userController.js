require('dotenv').config();
const RegisterModel = require('../models/user');
const bcrypt = require('bcryptjs')

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
            intro: 'Register Successfully...! ',
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

// const postLogin = async (req,res) => {
//   console.log(req.body)
//   const email = req.body.username;
//   const password = req.body.password;
//   try {
//     if(req.body.username=='' || req.body.password==''){
//       req.session.message = {
//         type: 'danger',
//         intro: 'Empty fields! ',
//         message: 'Please insert the requested information.'
//       }
//       res.redirect('/login')
//     }else{
//       const user = await RegisterModel.findOne({email:email});
//       const isMatch = await bcrypt.compare(password, user.password);
//       if(!isMatch){
//           req.session.message = {
//               type: 'danger',
//               intro: 'User Not Found! ',
//               message: 'Please Register First !'
//             }
//             res.redirect('/login')
//       }else {
//           res.redirect('/dashboard')
//       }
      
//     }
//   } catch (error) {
//     req.session.message = {
//       type: 'danger',
//       intro: 'Something went wrong ',
//       message: error
//     }
//   }
   
    
// }

const postLogin = async (req, res) => {
  console.log(req.body)
  try {
    const email = req.body.username;
    const password = req.body.password;

    const useremail = await RegisterModel.findOne(req.body);
  console.log(useremail)

    const isMatch = bcrypt.compare(password, useremail.password);

    if(isMatch){
      res.status(201).render('dashboard')
    }else{
      res.send('Invalid Login Details');
    }
  } catch (error) {
    res.status(400).send(error);
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