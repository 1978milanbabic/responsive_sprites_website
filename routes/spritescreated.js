var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('spritescreated', {spritesrc: "./createdsprites/images/sprite.png", jsonsrc: "./createdsprites/stylesheets/sprite.json"});
});





module.exports = router;