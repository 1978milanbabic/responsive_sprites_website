const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('spritescreated', {
        title: 'Sprites Created!',
        css: ['main.css', 'spritescreated.css'],
        js: ["jquery-2.2.4.min.js"],
        spritesrc: "./createdsprites/images/sprite.png",
        jsonsrc: "./createdsprites/stylesheets/sprite.json"
    });
});

module.exports = router;