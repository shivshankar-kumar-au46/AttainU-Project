const RegisterModel = require('../models/user'); //importing user collection from db
const bcrypt = require('bcryptjs')  //hashed the user password


// Render to home page
const home = (req,res) => {
    res.render('home');
}

// [GET req] Render to signup page
const getRegistered = (req,res) => {
    res.render('signup')
}

// POST req. for new user
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
        const fname = newUser.fname;
        const email = newUser.username;
        const phone = newUser.phone;
        try {
        const user = await RegisterModel.findOne({email})
        if (user)  return res.send('User already exist')

        
        const userCreated = await RegisterModel.create(newUser)
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

// [GET req] Render to Login page
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


// POST req for login user
const postLogin = async (req, res) => {

  try {
    const {email, password } = req.body

    const useremail = await RegisterModel.findOne(email);

  if(!useremail){
    res.status(404).json({
      success:false,
      message:"user not found in db please register first"
    })
  }

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

// redirect to home page after logout
const logout =  (req,res) => {
  req.logout();
  res.redirect('/')
}


// exporting all above handlers/controllers functions
module.exports = {
    getRegistered,
    postRegistered,
    getLogin,
    postLogin,
    logout,
    home
}