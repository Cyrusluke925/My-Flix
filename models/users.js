const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    const userSchema = new Schema ({
        userName: {
            type: String,
            required: true,
            unique: true },
        password: {
            type: String, 
            required: true
        }
    })


const User = mongoose.model('User', userSchema);

module.exports = User;