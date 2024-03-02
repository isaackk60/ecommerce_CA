const router = require(`express`).Router()

const salesModel = require(`../models/shirtsales`)
const shirtModel = require(`../models/shirts`)

const createNewSaleDocument = (req, res, next) => {
    // Use the PayPal details to create a new sale document                
    let saleDetails = new Object()

    saleDetails.paypalPaymentID = req.params.orderID
    saleDetails.shirtID = req.params.shirtID
    saleDetails.price = req.params.price

    shirtModel.findByIdAndUpdate({ _id: req.params.shirtID }, { sold: true }, (err, data) => {
        if (err) {
            return next(err)
        }
    })

    salesModel.create(saleDetails, /*  */(err, data) => {
        if (err) {
            return next(err)
        }
    })

    return res.json({ success: true })
}


// Save a record of each Paypal payment
router.post('/sales/:orderID/:shirtID/:price', createNewSaleDocument)


module.exports = router