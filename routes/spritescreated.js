const express = require('express');
const router = express.Router();
const del = require('del');


const getUser = request => request.cookies.user;


router.get('/', (req, res, next) => {
    //user loged in
    let user = getUser(req);
    let uploadPath = "./public/uploads/" + user + "/uploads/**/*";
    let notUploadPath = "!public/uploads/" + user + "/uploads";

    let spritesPathFrontEnd = "./uploads/" + user + "/createdsprites/";

    //first delete previous uploads
    try {
        //delete uploads - leave upload folder
        del.sync([uploadPath, notUploadPath]);
    }
    catch (err) {
        console.log(err);
    }

    res.render('spritescreated', {
        title: 'Sprites Created!',
        css: ['main.css', 'spritescreated.css'],
        js: ["main.js"],
        spritesrc: spritesPathFrontEnd + "sprites.png",
        jsonsrc: spritesPathFrontEnd + "sprite.json"
    });
});

module.exports = router;