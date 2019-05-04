const express = require('express');
const router = express.Router();


/* Home page */
router.get('/', (req, res, next) => {
    res.render('home', {
        title: 'Home',
        css: ['main.css', 'home.css'],
        js: ["main.js", "home.js"]
    });
});

module.exports = router;