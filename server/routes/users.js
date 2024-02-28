const router = require(`express`).Router()
var createError = require('http-errors')

const usersModel = require(`../models/users`)

const bcrypt = require('bcryptjs')  // needed for password encryption

const jwt = require('jsonwebtoken')
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

const multer  = require('multer')
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})

const emptyFolder = require('empty-folder')

const verifyUsersJWTPassword = (req, res, next) => {
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, { algorithm: "HS256" }, (err, decodedToken) => {
        if (err) {
            return next(err)
        }

        req.decodedToken = decodedToken
        return next()
    })
}



const checkThatUserExistsInUsersCollection = (req, res, next) =>
{
    usersModel.findOne({email:req.params.email}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }        

        req.data = data            
        return next()        
    })    
}


const checkThatJWTPasswordIsValid = (req, res, next) =>
{    
    bcrypt.compare(req.params.password, req.data.password, (err, result) =>
    {        
        if(err)
        {
            return next(err)
        }
        
        if(!result)
        {  
          return next(createError(401))
        }        
        
        return next()        
    })
}


const checkThatFileIsUploaded = (req, res, next) =>
{
    if(!req.file)
    {
        return next(createError(400, `No file was selected to be uploaded`))
    }
    
    return next()
}


const checkThatFileIsAnImageFile = (req, res, next) =>
{
    if(req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg")
    {
        fs.unlink(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, (err) => {return next(err)})                
    }
    
    return next()
}


const checkThatUserIsNotAlreadyInUsersCollection = (req, res, next) =>
{
    // If a user with this email does not already exist, then create new user
    usersModel.findOne({email:req.params.email}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }
        
        if(data)
        {
            return next(createError(401))
        }
    })
    
    return next()
}


const addNewUserToUsersCollection = (req, res, next) =>
{
    bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) =>  
    {
        if(err)
        {
            return next(err)
        }
        
        usersModel.create({name:req.params.name, email:req.params.email, password:hash, profilePhotoFilename:req.file.filename}, (err, data) => 
        {
            if(err)
            {
                return next(err)
            }
            
            const token = jwt.sign({email: data.email, accessLevel:data.accessLevel}, JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn:process.env.JWT_EXPIRY})     
                           
            fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, 'base64', (err, fileData) => 
            {
                if(err)
                {
                    return next(err)
                }
                    
                return res.json({name: data.name, accessLevel:data.accessLevel, profilePhoto:fileData, token:token})
            })
        }) 
    })     
}


const emptyUsersCollection = (req, res, next) =>
{
    usersModel.deleteMany({}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }
        
        if(!data)
        {
            return next(createError(409,`Failed to empty users collection`))
        }
    })
    
    return next()
}


const addAdminUserToUsersCollection = (req, res, next) =>
{
    const adminPassword = `123!"£qweQWE`
    bcrypt.hash(adminPassword, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) =>  
    {
        if(err)
        {
            return next(err)
        }
        
        usersModel.create({name:"Administrator",email:"admin@admin.com",password:hash,accessLevel:parseInt(process.env.ACCESS_LEVEL_ADMIN)}, (err, data) => 
        {
            if(err)
            {
                return next(err)
            }
            
            if(!data)
            {    
                return next(createError(409,`Failed to create Admin user for testing purposes`))
            }
            
            emptyFolder(process.env.UPLOADED_FILES_FOLDER, false, (result) =>
            {
                return res.json(data)
            })               
        })
    })
}


const returnUsersDetailsAsJSON = (req, res, next) =>
{
    const token = jwt.sign({email: req.data.email, accessLevel:req.data.accessLevel}, JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn:process.env.JWT_EXPIRY})     

    if(req.data.profilePhotoFilename)
    {
        fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.data.profilePhotoFilename}`, 'base64', (err, data) => 
        {        
            if(err)
            {
                return next(err)
            }
        
            if(data)
            {  
                return res.json({name: req.data.name, accessLevel:req.data.accessLevel, profilePhoto:data, token:token})                           
            }   
            else
            {
                return res.json({name: req.data.name, accessLevel:req.data.accessLevel, profilePhoto:null, token:token})  
            }
        })     
    }
    else
    {
        return res.json({name: req.data.name, accessLevel:req.data.accessLevel, profilePhoto:null, token:token})  
    }    
}


const logout = (req, res, next) => 
{       
    return res.json({})
}

// const getUserById = (req, res, next) => {
//     const token = jwt.sign({email: req.data.email, accessLevel:req.data.accessLevel}, JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn:process.env.JWT_EXPIRY})     

//     if(req.data.profilePhotoFilename)
//     {
//         fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.data.profilePhotoFilename}`, 'base64', (err, data) => 
//         {        
//             if(err)
//             {
//                 return next(err)
//             }
        
//             if(data)
//             {  
//                 return res.json({_id:req.data._id,name: req.data.name, accessLevel:req.data.accessLevel, profilePhoto:data, token:token})                           
//             }   
//             else
//             {
//                 return res.json({_id:req.data._id,name: req.data.name, accessLevel:req.data.accessLevel, profilePhoto:null, token:token})  
//             }
//         })     
//     }
//     else
//     {
//         return res.json({_id:req.data._id,name: req.data.name, accessLevel:req.data.accessLevel, profilePhoto:null, token:token})  
//     }  
// }
// const getUserDocument = (req, res, next) => {
//     usersModel.findById(req.params.id, (err, data) => {
//         if (err) {
//             return next(err)
//         }

//         return res.json(data)
//     })
// }


// IMPORTANT
// Obviously, in a production release, you should never have the code below, as it allows a user to delete a database collection
// The code below is for development testing purposes only 
router.post(`/users/reset_user_collection`, emptyUsersCollection, addAdminUserToUsersCollection)

router.post(`/users/register/:name/:email/:password`, upload.single("profilePhoto"), checkThatFileIsUploaded, checkThatFileIsAnImageFile, checkThatUserIsNotAlreadyInUsersCollection, addNewUserToUsersCollection)

router.post(`/users/login/:email/:password`, checkThatUserExistsInUsersCollection, checkThatJWTPasswordIsValid, returnUsersDetailsAsJSON)

router.post(`/users/logout`, logout)

router.get(`/users/:email`,verifyUsersJWTPassword)

// router.get('/users', getUserById);
// router.get('/users/:id', getUserDocument,verifyUsersJWTPassword);
// router.get('/users/current', (req, res) => {
//     // Assuming the JWT token is sent in the Authorization header as a Bearer token
//     const token = req.headers.authorization.split(' ')[1]; // Extract the token from the header
    
//     // Verify the JWT token to ensure it's valid and retrieve the payload (which includes the user ID)
//     jwt.verify(token, JWT_PRIVATE_KEY, (err, decoded) => {
//         if (err) {
//             // Handle token verification error
//             return res.status(401).json({ message: 'Unauthorized' });
//         }
        
//         // Extract the user ID from the decoded payload
//         const userId = decoded._id; // Assuming the user ID is stored as 'userId' in the JWT payload
        
//         // Now you have the user ID, you can use it as needed (e.g., to fetch user data from the database)
//         // For demonstration purposes, let's just send the user ID back in the response
//         res.json({ userId });
//     });
// });


module.exports = router