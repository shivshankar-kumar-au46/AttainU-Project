const express = require('express')

const getDashBoard =  (req,res) => {
    // res.send(req.user)
    res.render('dashboard')
}



module.exports = {
    getDashBoard
}