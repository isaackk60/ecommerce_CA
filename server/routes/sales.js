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


// Save a record of each Paypal payment
// router.post('/sales/:orderID/:carID/:price', createNewSaleDocument)
// router.post('/sales/:paymentID/:shirtID/:price/:customerName/:customerEmail', createNewSaleDocument)
// router.post('/sales/:paymentID/:price', createNewSaleDocument)
// router.post('/sales/:orderID/:price/:items/:customerName/:customerEmail/:address/:phone', createNewSaleDocument)
router.post('/sales/:orderID/:price', createNewSaleDocument)
module.exports = router