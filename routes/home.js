const express = require('express');
const router = express.Router();
//logg
const Logger = require('../logger/logger');

/* Home page */
router.get('/', (req, res, next) => {
    //logg
    let ip = req.connection.remoteAddress || "not detected";
    let uname = req.cookies.user || "Not logged";
    Logger(ip, uname, 'Visits Home Page');

    res.render('home', {
        title: 'Home',
        css: ['main.css', 'home.css'],
        js: ["main.js", "home.js"]
    });
});

module.exports = router;