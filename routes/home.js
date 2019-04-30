var express = require('express');
var router = express.Router();

/* Home page */
router.get('/', function (req, res, next) {
    sess = req.session;
    res.render('home', {
        title: 'Home',
        css: ['main.css', 'home.css'],
        js: ["main.js", "home.js"],
        sess: sess
    });
});

module.exports = router;