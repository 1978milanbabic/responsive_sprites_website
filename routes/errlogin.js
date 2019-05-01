const express = require('express');
const router = express.Router();

/* Wrong login page */
router.get('/', (req, res, next) => {
    res.render('errlogin', {
        title: 'Please Login First',
        css: ['main.css', 'errlogin.css'],
        js: ["main.js"]
    });
});

module.exports = router;