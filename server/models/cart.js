const mongoose = require(`mongoose`)

let cartPhotos = new mongoose.Schema(
    {
       filename:{type:String}
    })


let cartSchema = new mongoose.Schema(
    {
        userId: {type: String, require:true},
        name: {type: String, require:true},
        // colour: {type: String, required:true},
        size: {type: String, required:true},
        price: {type: Number, required:true},
        quantity: {type: Number, require:true},
        shirtPhotoFilename:[cartPhotos],
        sold: {type: Boolean, default:false}
    },
    {
       collection: `cart`
    })

module.exports = mongoose.model(`cart`, cartSchema)