const fs = require('fs');
// const logFile = require('../loggs/info.txt');

//file
const infoStream = fs.createWriteStream('loggs/info.txt');

//date format
let today = new Date();

let timeNow = (hours, mins, secs) => {
    hours = hours >= 10 ? hours : "0" + hours;
    mins = mins >= 10 ? mins : "0" + mins;
    secs = secs >= 10 ? secs : "0" + secs;

    return (hours + ":" + mins + ":" + secs);
};

let dateFormat = today.getDate() + "." + (parseInt(today.getMonth()) + 1) + "." + today.getFullYear() + ". (" + timeNow(today.getHours(), today.getMinutes(), today.getSeconds()) + ")";

//logger
const Logger = msg => {
    let message = dateFormat + " : " + msg + "\n";
    infoStream.write(message);
};

module.exports = Logger;
