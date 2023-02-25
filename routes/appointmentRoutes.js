
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../passportConfig');
const { getAppointment, postAppointment, showAppointment, appointmentPage } = require('../controller/appointmentController')


/** HTTP Request */ 
router.get('/bookAppointment',isAuthenticated, getAppointment);
router.post('/bookAppointment',isAuthenticated, postAppointment);
router.get('/showAppointment',isAuthenticated, appointmentPage);
router.get('/allAppointment',isAuthenticated, showAppointment);









module.exports = router