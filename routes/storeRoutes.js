const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../passportConfig')
const { getProduct, addProduct, getProductForm, showProduct, getProductByID, updateProduct, getCart,  } = require('../controller/storeController')


router.get('/showProduct', isAuthenticated, showProduct)
router.get('/getProduct', isAuthenticated, getProduct)
router.get('/getProductForm', isAuthenticated, getProductForm)
router.post('/addProduct', isAuthenticated, addProduct)
router.get('/getProduct/:id', getProductByID)
router.put('/getProduct/:id', updateProduct)
router.get('/getCart', getCart )




module.exports = router;