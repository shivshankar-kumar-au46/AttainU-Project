// Importing storemodel from db
const StoreModel = require('../models/addProductModel')




// [GET req] Render to get Product page for user
const showProduct = (req,res) => {
    res.render('getProduct')
}

// [GET req] Render to get Product page and getting all product from DB
const getProduct = async (req,res) => {
    const allProducts = await StoreModel.find();
    res.send(allProducts)

}

// [GET req] Render to add Product page for admin
const getProductForm = (req,res) => {
    res.render('addProduct')
}

// POST req for adding product to store
const addProduct =  async (req,res)=>{
        const newProduct = req.body;
        console.log(newProduct)
        try {
            const addNewProduct = await StoreModel.create(newProduct)
            res.status(200).send({status:'success',product:addNewProduct})
        } catch (error) {
            res.status(400).send({status:'error',error,msg:'product adding failed'})    
        }
    }

 
// [GET req] search product by id    
const getProductByID = async (req,res) => {
    const ID = req.params.id;
    try {
        const searched_product = await StoreModel.findById(ID);
    if(!searched_product) return res.send('product not found');
    res.status(200).send({status:'success',searched_product});
    } catch (error) {
    res.status(400).send({status:'error',error,msg:'product not found'});
    }
}    


// [POST req] update product by id 
const updateProduct = async (req,res) => {

    const { productID } = req.params
    const updateProduct = req.body
 
    try {
     const updated_product = await StoreModel.findByIdAndUpdate(productID, updateProduct,{runValidators:true,new:true})
     res.status(201).send({status:'success',msg:'product updated successfully',product:updated_product})
    } catch (error) {
     console.log('Error updating product in DB');
     res.status(500).send({status :'Error updating product in DB',error})
    }
 }

// [GET req] Render cart page
 const getCart =  (req,res) => {
     res.render('cart')
 }


 // exporting all above handlers/controllers function
    module.exports = {
        showProduct,
        getProduct,
        getProductForm,
        addProduct,
        getProductByID,
        updateProduct,
        getCart
    }