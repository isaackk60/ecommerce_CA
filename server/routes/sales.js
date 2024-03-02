const router = require(`express`).Router()

const salesModel = require(`../models/sales`)
const shirtsModel = require(`../models/shirts`)


const createNewSaleDocument = (req, res, next) => {
    // Use the PayPal details to create a new sale document                
    let saleDetails = new Object()

    saleDetails.paypalPaymentID = req.params.orderID
    saleDetails.price = req.params.price

    saleDetails.items = req.body.items
    saleDetails.customerName = req.body.customerName
    saleDetails.customerEmail = req.body.customerEmail
    saleDetails.address = req.body.address
    saleDetails.phone = req.body.phone


    salesModel.create(saleDetails, (err, data) => {
        if (err) {
            return next(err)
        }
    })

    return res.json({ success: true })
}
const getPurchaseHistoryByEmail = (req, res, next) => {
    const userEmail = req.query.email; // Extract email from query parameters

    // Find purchase history by user email in the database
    salesModel.find({ customerEmail: userEmail }, (err, purchaseHistory) => {
        if (err) {
            // Handle database error
            console.error('Error fetching purchase history:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Send the retrieved purchase history as the response
        res.json(purchaseHistory);
    });
};

const updatetSalesDocument = (req, res, next) => {
    salesModel.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, data) => {
        if (err) {
            return next(err)
        }

        return res.json(data)
    })
}



router.post('/sales/:orderID/:price', createNewSaleDocument)

router.put('/sales/:id', updatetSalesDocument)

router.get('/sales/email', getPurchaseHistoryByEmail);
module.exports = router