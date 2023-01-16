const express = require('express')
const passport = require('passport')
const { home, getLogin, postLogin, getRegistered, postRegistered, logout } = require('../controller/userController')
const router = express.Router()


router.get('/',home)

router.get('/login',getLogin)
router.post('/login', passport.authenticate("local",{failureRedirect:"/register", successRedirect:"/dashboard"}) ,postLogin)

router.get('/register',getRegistered)
router.post('/register',postRegistered)

router.get('/logout', logout);


module.exports =  router
