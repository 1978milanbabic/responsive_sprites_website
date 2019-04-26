const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('spritescreated', {
        spritesrc: "./createdsprites/images/sprite.png",
        jsonsrc: "./createdsprites/stylesheets/sprite.json"
    });
});

module.exports = router;