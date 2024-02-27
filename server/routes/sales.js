const router = require(`express`).Router()

const salesModel = require(`../models/sales`)
const carsModel = require(`../models/shirts`)


const createNewSaleDocument = (req, res, next) => 
{           
    // Use the PayPal details to create a new sale document                
    let saleDetails = new Object()
           
    // saleDetails.paypalPaymentID = req.params.orderID
    // saleDetails.carID = req.params.carID
    // saleDetails.price = req.params.price

    saleDetails.paypalPaymentID = req.params.paymentID
    saleDetails.shirtID = req.params.shirtID
    saleDetails.price = req.params.price
    saleDetails.customerName = req.params.customerName
    saleDetails.customerEmail = req.params.customerEmail
        
    shirtsModel.findByIdAndUpdate({_id:req.params.shirtID}, {sold: true}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
    }) 
    
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
router.post('/sales/:paymentID/:shirtID/:price/:customerName/:customerEmail', createNewSaleDocument)


module.exports = router