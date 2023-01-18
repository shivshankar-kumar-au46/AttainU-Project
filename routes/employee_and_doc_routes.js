const express = require('express');
const { getEmployees, addEmployees, addDoctor, getDoctors} = require('../controller/employee_and_doc_controller');
const { isAuthenticated } = require('../passportConfig');
const router = express.Router();

/** HTTP Request */ 
router.get('/getAllDoctors', isAuthenticated, getDoctors);
router.post('/addDoctor', isAuthenticated, addDoctor);

router.get('/getEmployees', isAuthenticated, getEmployees);
router.post('/addEmployee', isAuthenticated, addEmployees);



module.exports = router;