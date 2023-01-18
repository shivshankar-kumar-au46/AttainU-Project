
const express = require('express');
const router = express.Router();
const { getAppointment, postAppointment } = require('../controller/appointmentController')


/** HTTP Request */ 
router.get('/bookAppointment', getAppointment);
router.post('/bookAppointment', postAppointment);









module.exports = router