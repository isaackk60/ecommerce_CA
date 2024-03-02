// const mongoose = require(`mongoose`)

// let salesSchema = new mongoose.Schema(
//    {
//         paypalPaymentID: {type: String, required:true},
//         carID: {type: String, required:true},
//         price: {type: Number, required:true}
//    },
//    {
//        collection: `sales`
//    })

// module.exports = mongoose.model(`sales`, salesSchema)

const mongoose = require(`mongoose`)

let differentItemsInCart = new mongoose.Schema({
    shirtID: { type: String, required: true },
    quantity: { type: Number, required: true }
})

let salesSchema = new mongoose.Schema(
    {
        paypalPaymentID: { type: String, required: true },
        // shirtID: {type: String, required:true},

        price: { type: Number, required: true },
        items: [differentItemsInCart],
        customerName: { type: String, required: true },
        customerEmail: { type: String, required: true },
        phone: { type: Number, required: true },
        address: { type: String, required: true },
        refunded: { type: Number, default: 0 }
    },
    {
        collection: `sales`
    })

module.exports = mongoose.model(`sales`, salesSchema)

