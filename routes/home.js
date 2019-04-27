var express = require('express');
var router = express.Router();

/* Home page */
router.get('/', function (req, res, next) {
    res.render('home', {
        title: 'Home',
        css: ['main.css', 'home.css'],
        js: ["jquery-2.2.4.min.js"]
    });
});

module.exports = router;