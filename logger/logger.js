//db model
const Logg = require('../models/loggs');

//logger
const Logger = (ip, uname, action) => {

    //date format
    let today = new Date();

    let day = today.getDate();
    let month = parseInt(today.getMonth()) + 1;
    let year = today.getFullYear();

    let hours = today.getHours();
    let mins = today.getMinutes();
    let secs = today.getSeconds();

    let timeNow = (hours, mins, secs) => {
        hours = hours >= 10 ? hours : "0" + hours;
        mins = mins >= 10 ? mins : "0" + mins;
        secs = secs >= 10 ? secs : "0" + secs;

        return (hours + ":" + mins + ":" + secs);
    };

    let logg = new Logg();

    logg.ip = ip;
    logg.day = day;
    logg.month = month;
    logg.year = year;
    logg.hour = hours;
    logg.min = mins;
    logg.sec = secs;
    logg.username = uname;
    logg.action = action;

    logg.save()
        .then(() => {
            // console.log('saved logg');
        })
        .catch(() => {
            console.log('Error logging');
        });
};

module.exports = Logger;
