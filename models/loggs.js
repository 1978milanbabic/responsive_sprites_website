const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Logg schema and model
const LogSchema = new Schema({
    ip: {
        type: String
    },
    day: {
        type: String
    },
    month: {
        type: String
    },
    year: {
        type: String
    },
    hour: {
        type: String
    },
    min: {
        type: String
    },
    sec: {
        type: String
    },
    username: {
        type: String,
        default: 'Not logged'
    },
    action: {
        type: String
    },
    priority: {
        type: String,
        default: 'Low'
    },
    fullTime: {
        type: String
    }
});

const Logg = mongoose.model('logg', LogSchema);


module.exports = Logg;
