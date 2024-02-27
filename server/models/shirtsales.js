// const mongoose = require(`mongoose`)

// let TshirtsaleSchema = new mongoose.Schema(
//    {
//         paypalPaymentID: {type: String, required:true},
//         shirtID:{type: String,required:true},
//         price: {type: Number, required:true}
//    },
//    {
//        collection: `Tshirtsales`
//    })

// module.exports = mongoose.model(`Tshirtsales`, TshirtsaleSchema)
const mongoose = require(`mongoose`)

let salesSchema = new mongoose.Schema(
   {
        paypalPaymentID: {type: String, required:true},
        shirtID: {type: String, required:true},
        price: {type: Number, required:true}
   },
   {
       collection: `shirtsales`
   })

module.exports = mongoose.model(`shirtsales`, salesSchema)