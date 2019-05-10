const express = require('express');
const router = express.Router();
//logg
const Logger = require('../logger/logger');

/* Wrong login page */
router.get('/', (req, res, next) => {
    //logg
    let ip = req.connection.remoteAddress || "not detected";
    let uname = req.cookies.user || "Not logged";
    Logger(ip, uname, 'Page - errorLoging ');

    res.render('errlogin', {
        title: 'Please Login First',
        css: ['main.css', 'errlogin.css'],
        js: ["main.js"]
    });
});

module.exports = router;