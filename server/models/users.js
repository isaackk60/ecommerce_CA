const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        accessLevel: { type: Number, default: parseInt(process.env.ACCESS_LEVEL_NORMAL_USER) },
        profilePhotoFilename: { type: String, default: '' },
        phone: { type: String, default: '' }, // Optional phone field
        address: { type: String, default: '' }, // Optional address field
    },
    {
        collection: 'users',
    }
);

module.exports = mongoose.model('users', usersSchema);
