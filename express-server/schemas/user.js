const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {type: String, required: true, unique: true},
    firstName: String,
    lastName: String,
    email: String,
    password: {type:String, required: true},
    salt: String
});

const User = mongoose.model('User', UserSchema);
module.exports = User;