const express = require('express');
const { getContact,postContact } = require('../controller/contactController');
const router = express.Router();

router.get('/contact', getContact);
router.post('/contact', postContact);


module.exports = router