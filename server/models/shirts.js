const mongoose = require(`mongoose`)

let shirtPhotosSchema = new mongoose.Schema(
    {
       filename:{type:String}
    })


let shirtsSchema = new mongoose.Schema(
    {
        name: {type: String, require:true},
        // colour: {type: String, required:true},
        size: {type: String, required:true},
        price: {type: Number, required:true},
        // quantity: {type: Number, require:true},
        stock: {type: Number, require:true},
        description: {type: String, require: true},
        shirtPhotoFilename:[shirtPhotosSchema],
        sold: {type: Boolean, default:false},
        gender:{type: String, require:true}
    },
    {
       collection: `shirts`
    })

module.exports = mongoose.model(`shirts`, shirtsSchema)