const express = require('express');
const router = express.Router();
//logg
const Logger = require('../logger/logger');

/* Home page */
router.get('/', (req, res, next) => {
    //logg
    let additionalLoggInfo = ' - visits Home page';
    Logger((req.cookies.user || 'Unsigned user') + additionalLoggInfo);

    res.render('home', {
        title: 'Home',
        css: ['main.css', 'home.css'],
        js: ["main.js", "home.js"]
    });
});

module.exports = router;