const express = require('express')

const getDashBoard =  (req,res) => {
    res.render('dashboard')
}


// exporting all above handlers/controllers function
module.exports = {
    getDashBoard
}