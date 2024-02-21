const router = require(`express`).Router()
var createError = require('http-errors')

const cartModel = require(`../models/cart`)

const jwt = require('jsonwebtoken')
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

const multer = require('multer')
var upload = multer({ dest: `${process.env.UPLOADED_FILES_FOLDER}` })


const verifyUsersJWTPassword = (req, res, next) => {
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, { algorithm: "HS256" }, (err, decodedToken) => {
        if (err) {
            return next(err)
        }

        req.decodedToken = decodedToken
        return next()
    })
}


const checkThatUserIsAnAdministrator = (req, res, next) => {
    if (req.decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
        return next()
    }
    else {
        return next(createError(401))
    }
}


const createNewcartDocument = (req, res, next) => {
    // Use the new cart details to create a new cart document                
    let cartDetails = new Object()
    cartDetails.userId = req.body.userId
    cartDetails.name = req.body.name
    cartDetails.size = req.body.size
    cartDetails.price = req.body.price
    cartDetails.quantity = req.body.quantity

    // add the cart's photos to the cartDetails JSON object
    cartDetails.shirtPhotoFilename = []

    req.files.map((file, index) => {
        cartDetails.shirtPhotoFilename[index] = { filename: `${file.filename}` }
    })

    cartModel.create(cartDetails, (err, data) => {
        if (err) {
            return next(err)
        }

        return res.json(data)
    })
}


const getAllcartDocuments = (req, res, next) => {

    //user does not have to be logged in to see cart details
    cartModel.find((err, data) => {
        if (err) {
            return next(err)
        }
        return res.json(data)
    })
}


const getcartPhotoAsBase64 = (req, res, next) => {
    fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`, 'base64', (err, fileData) => {
        if (err) {
            return next(err)
        }

        if (fileData) {
            return res.json({ image: fileData })
        }
        else {
            return res.json({ image: null })
        }
    })
}


const getcartDocument = (req, res, next) => {
    cartModel.findById(req.params.id, (err, data) => {
        if (err) {
            return next(err)
        }

        return res.json(data)
    })
}


const updatecartDocument = (req, res, next) => {
    cartModel.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, data) => {
        if (err) {
            return next(err)
        }

        return res.json(data)
    })
}


const deletecartDocument = (req, res, next) => {
    cartModel.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return next(err)
        }

        return res.json(data)
    })
}


// read all records
router.get(`/cart`, getAllcartDocuments)

// get one cart photo
router.get(`/cart/photo/:filename`, getcartPhotoAsBase64)

// Read one record
router.get(`/cart/:id`, verifyUsersJWTPassword, getcartDocument)

// Add new record
router.post(`/cart`, verifyUsersJWTPassword, checkThatUserIsAnAdministrator, upload.array("cartPhotos", parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED)), createNewcartDocument)

// Update one record
router.put(`/cart/:id`, verifyUsersJWTPassword, updatecartDocument)

// Delete one record
router.delete(`/cart/:id`, verifyUsersJWTPassword, checkThatUserIsAnAdministrator, deletecartDocument)


module.exports = router