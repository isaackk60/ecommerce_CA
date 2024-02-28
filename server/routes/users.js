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
// const getUserByEmail = (req, res, next) => {
//     // Extract email from request parameters
//     const email = req.params.email;

//     // Find user by email in the database
//     usersModel.findOne({ email: email }, (err, data) => {
//         if (err) {
//             return next(err);
//         }

//         // If user not found, return appropriate response
//         if (!data) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // If user found, return user details
//         const token = jwt.sign({ email: data.email, accessLevel: data.accessLevel }, JWT_PRIVATE_KEY, { algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY });

//         // Read profile photo from file and send as base64 string
//         if (data.profilePhotoFilename) {
//             fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${data.profilePhotoFilename}`, 'base64', (err, photoData) => {
//                 if (err) {
//                     return next(err);
//                 }

//                 return res.json({ name: data.name, accessLevel: data.accessLevel, profilePhoto: photoData, token: token });
//             });
//         } else {
//             // If no profile photo, return user details without photo
//             return res.json({ name: data.name, accessLevel: data.accessLevel, profilePhoto: null, token: token });
//         }
//     });
// };

const getUserByEmail = (req, res) => {
    const userEmail = req.query.email; // Extract email from query parameters

    // Find user by email in the database
    usersModel.findOne({ email: userEmail }, (err, userData) => {
        if (err) {
            // Handle database error
            console.error('Error fetching user data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (!userData) {
            // User not found
            return res.status(404).json({ error: 'User not found' });
        }

        // User found, send user data in response
        return res.json(userData);
    });
};


// IMPORTANT
// Obviously, in a production release, you should never have the code below, as it allows a user to delete a database collection
// The code below is for development testing purposes only 
router.post(`/users/reset_user_collection`, emptyUsersCollection, addAdminUserToUsersCollection)

router.post(`/users/register/:name/:email/:password`, upload.single("profilePhoto"), checkThatFileIsUploaded, checkThatFileIsAnImageFile, checkThatUserIsNotAlreadyInUsersCollection, addNewUserToUsersCollection)

router.post(`/users/login/:email/:password`, checkThatUserExistsInUsersCollection, checkThatJWTPasswordIsValid, returnUsersDetailsAsJSON)

router.post(`/users/logout`, logout)

// router.get(`/users/email/:email`,verifyUsersJWTPassword,checkThatUserExistsInUsersCollection, getUserByEmail)

router.get('/users/email', getUserByEmail)

router.put('/users/update', (req, res, next) => {
    const { email, newName, newPhone, newAddress } = req.body;

    usersModel.findOneAndUpdate(
        { email: email },
        { name: newName, phone: newPhone, address: newAddress },
        { new: true },
        (err, user) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json({ message: 'User updated successfully', user: user });
        }
    );
});

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