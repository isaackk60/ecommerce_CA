const router = require(`express`).Router()
var createError = require('http-errors')

const tShirtsModel = require(`../models/shirts`)

const jwt = require('jsonwebtoken')
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

const multer  = require('multer')
var upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})


const verifyUsersJWTPassword = (req, res, next) =>
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => 
    {
        if (err) 
        { 
            return next(err)
        }

        req.decodedToken = decodedToken
        return next()
    })
}


const checkThatUserIsAnAdministrator = (req, res, next) =>
{
    if(req.decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
    {    
        return next()
    }
    else
    {
        return next(createError(401))
    }
}


const createNewtShirtDocument = (req, res, next) => 
{           
    // Use the new tShirt details to create a new tShirt document                
    let tShirtDetails = new Object()
                
    tShirtDetails.name = req.body.name
    tShirtDetails.colour = req.body.colour
    tShirtDetails.size = req.body.size
    tShirtDetails.price = req.body.price
    tShirtDetails.quantity = req.body.quantity
    tShirtDetails.description = req.body.description

    // add the tShirt's photos to the tShirtDetails JSON object
    tShirtDetails.shirtPhotoFilename = []
                
    req.files.map((file, index) =>
    {
        tShirtDetails.shirtPhotoFilename[index] = {filename:`${file.filename}`}
    })
        
    tShirtsModel.create(tShirtDetails, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }
        
        return res.json(data)        
    })
}


const getAlltShirtDocuments = (req, res, next) => 
{   
    
    //user does not have to be logged in to see tShirt details
    tShirtsModel.find((err, data) => 
    {       
        if(err)
        {
            return next(err)
        }     
        return res.json(data)
    })
}


const gettShirtPhotoAsBase64 = (req, res, next) => 
{   
    fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`, 'base64', (err, fileData) => 
    {     
        if(err)
        {
            return next(err)
        }  
        
        if(fileData)
        {  
            return res.json({image:fileData})                           
        }   
        else
        {
            return res.json({image:null})
        }
    })             
}


const gettShirtDocument = (req, res, next) => 
{
    tShirtsModel.findById(req.params.id, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })
}


const updatetShirtDocument = (req, res, next) => 
{
    tShirtsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })        
}


const deletetShirtDocument = (req, res, next) => 
{
    tShirtsModel.findByIdAndRemove(req.params.id, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })      
}


// read all records
router.get(`/shirts`, getAlltShirtDocuments)

// get one tShirt photo
router.get(`/shirts/photo/:filename`, gettShirtPhotoAsBase64)

// Read one record
router.get(`/shirts/:id`, verifyUsersJWTPassword, gettShirtDocument)

// Add new record
router.post(`/shirts`, verifyUsersJWTPassword, checkThatUserIsAnAdministrator, upload.array("shirtPhotos", parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED)), createNewtShirtDocument)

// Update one record
router.put(`/shirts/:id`, verifyUsersJWTPassword, updatetShirtDocument)

// Delete one record
router.delete(`/shirts/:id`, verifyUsersJWTPassword, checkThatUserIsAnAdministrator, deletetShirtDocument)


module.exports = router