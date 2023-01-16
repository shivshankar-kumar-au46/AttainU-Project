const express = require('express');

const getContact = (req,res) => {
    res.render('contact')
}

const postContact = (req,res) => {
    
}



module.exports = {
    getContact,
    postContact
}