const express = require('express');
const router = express.Router();
//logg
const Logger = require('../logger/logger');

/* Exampes page */
router.get('/', (req, res, next) => {
    //logg
    let ip = req.connection.remoteAddress || "not detected";
    let uname = req.cookies.user || "Not logged";
    Logger(ip, uname, 'Visits Examples Page');

    res.render('examples', {
        title: 'Examples',
        css: ['main.css', 'examples.css'],
        js: ["main.js"]
    });
});

module.exports = router;