const StoreModel = require('../models/addProductModel')
const { search } = require('../routes/storeRoutes')



const getProductForm = (req,res) => {
    res.render('addProduct')
}


const showProduct = (req,res) => {
    res.render('getProduct')
}

const getProduct = async (req,res) => {
    const allProducts = await StoreModel.find();
    res.send(allProducts)

}



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

// const updateProduct = async (req,res) => {
//     const updated = req.body;
//     try {
//         const updated_product = await StoreModel.findByIdAndUpdate(updated);
//         res.status(200).send({status:'success',updated_product,msg:'product updated successfully'})
//     } catch (error) {
//         res.status(400).send({status:'error',error,msg:'product updated successfully'})
        
//     }
// }


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


 const getCart =  (req,res) => {
     res.render('cart')
 }

    module.exports = {
        showProduct,
        getProduct,
        getProductForm,
        addProduct,
        getProductByID,
        updateProduct,
        getCart

    }