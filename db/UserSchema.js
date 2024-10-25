const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    MobileNo: {
        type: Number,
        required: true,
        unique: true
    },
    Sign: String
})

const User = mongoose.model('User', UserSchema)
module.exports = User