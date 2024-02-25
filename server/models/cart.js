const mongoose = require(`mongoose`)

let cartPhotosSchema = new mongoose.Schema(
    {
       filename:{type:String}
    })

let differentItemInCart = new mongoose.Schema({
    name: {type: String, require:true},
    // colour: {type: String, required:true},
    size: {type: String, required:true},
    price: {type: Number, required:true},
    quantity: {type: Number, require:true},
    shirtPhotoFilename:[cartPhotosSchema],
    sold: {type: Boolean, default:false}
})


let cartSchema = new mongoose.Schema(
    {
        // userId: {type: String, require:true},
        cartItems:[differentItemInCart]
    },
    {
       collection: `cart`
    })

module.exports = mongoose.model(`cart`, cartSchema)