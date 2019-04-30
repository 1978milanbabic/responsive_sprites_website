var express = require('express');
var router = express.Router();

/* Wrong login page */
router.get('/', function (req, res, next) {
    res.render('errlogin', {
        title: 'Please Login First',
        css: ['main.css', 'errlogin.css'],
        js: ["main.js"]
    });
});

module.exports = router;