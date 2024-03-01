const router = require(`express`).Router()

const salesModel = require(`../models/sales`)
const shirtsModel = require(`../models/shirts`)


const createNewSaleDocument = (req, res, next) => 
{           
    // Use the PayPal details to create a new sale document                
    let saleDetails = new Object()
           
    // saleDetails.paypalPaymentID = req.params.orderID
    // saleDetails.carID = req.params.carID
    // saleDetails.price = req.params.price

    // saleDetails.paypalPaymentID = req.params.paymentID
    // saleDetails.price = req.params.price
    // saleDetails.items=req.params.items
    // saleDetails.customerName = req.params.customerName
    // saleDetails.customerEmail = req.params.customerEmail
    saleDetails.paypalPaymentID = req.params.orderID
    saleDetails.price = req.params.price

    saleDetails.items=req.body.items
    saleDetails.customerName = req.body.customerName
    saleDetails.customerEmail = req.body.customerEmail
    saleDetails.address = req.body.address
    saleDetails.phone = req.body.phone


    // saleDetails.items=req.params.items
    // saleDetails.customerName = req.params.customerName
    // saleDetails.customerEmail = req.params.customerEmail
    // saleDetails.phone = req.params.phone
    // saleDetails.address = req.params.address
        
    // shirtsModel.findByIdAndUpdate({_id:req.params.shirtID}, {sold: true}, (err, data) => 
    // {
    //     if(err)
    //     {
    //         return next(err)
    //     }  
    // }) 
    
    salesModel.create(saleDetails, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }                        
    })   
    
    return res.json({success:true})
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

const updatetSalesDocument = (req, res, next) => 
{
    salesModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })        
}



// Save a record of each Paypal payment
// router.post('/sales/:orderID/:carID/:price', createNewSaleDocument)
// router.post('/sales/:paymentID/:shirtID/:price/:customerName/:customerEmail', createNewSaleDocument)
// router.post('/sales/:paymentID/:price', createNewSaleDocument)
// router.post('/sales/:orderID/:price/:items/:customerName/:customerEmail/:address/:phone', createNewSaleDocument)
router.post('/sales/:orderID/:price', createNewSaleDocument)
// router.get('/sales/email', getPurchaseHistoryByEmail);

router.put('/sales/:id',updatetSalesDocument)

router.get('/sales/email', getPurchaseHistoryByEmail);
module.exports = router