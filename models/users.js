const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//users schema and model
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required!"]
    },
    password: {
        type: String
    },
    confirmationData: {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('user', UserSchema);


module.exports = User;
