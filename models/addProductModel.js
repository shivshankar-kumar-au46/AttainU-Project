
const mongoose = require ('mongoose');



const storeSchema =  mongoose.Schema({
    product_name: {
        type:String,
        required:true,
        maxLength:100
    },
    description: {
        type:String,
        required:true,
        maxLength:500
    },
    price: {
        type:Number,
        required:true,
        maxLength:10
    },
	imgUrl: {
		type:String,
		required:true,
	}
})


const StoreModel = mongoose.model("store",storeSchema)

module.exports = StoreModel