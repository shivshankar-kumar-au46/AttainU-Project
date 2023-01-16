
const express = require('express');
const router = express.Router();
const { getAppointment } = require('../controller/appointmentController')

router.get('/bookAppointment', getAppointment);
// router.post('/bookAppointment', postAppointment);









module.exports = router