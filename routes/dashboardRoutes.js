const express = require('express');
const { getDashBoard} = require('../controller/dashboardController');
const { isAuthenticated } = require('../passportConfig');
const router = express.Router();


router.get('/dashboard', isAuthenticated, getDashBoard);





module.exports = router;