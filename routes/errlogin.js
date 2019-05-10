const express = require('express');
const router = express.Router();
//logg
const Logger = require('../logger/logger');

/* Wrong login page */
router.get('/', (req, res, next) => {
    //logg
    req.cookies.user ? Logger(req.cookies.user + ' - illegal visit to ErrLogin page!!!') : Logger('Unsigned user - redirected to ErrLogin');

    res.render('errlogin', {
        title: 'Please Login First',
        css: ['main.css', 'errlogin.css'],
        js: ["main.js"]
    });
});

module.exports = router;