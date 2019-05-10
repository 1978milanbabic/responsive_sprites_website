const express = require('express');
const router = express.Router();
const del = require('del');
const fs = require('fs');

//gulp
const gulp = require('gulp');
const spritesmith = require('gulp.spritesmith');
const merge = require('merge-stream');

const getUser = request => request.cookies.user;


/* DISPLAY CREATESPRITES PAGE. */
router.get('/', (req, res, next) => {
    //user loged in
    let user = getUser(req);
    let spritesPath = "./public/uploads/" + user + "/createdsprites/**/*";
    let notSpritesPath = "!public/uploads/" + user + "/createdsprites";

    //first delete previous creations - problem sometimes!!! - (try/catch resolved this)
    try {
        //delete sprites - leave sprites folder
        del.sync([spritesPath, notSpritesPath]);
    }
    catch (err) {
        console.log(err);
    }

    //render page
    res.render('createsprites', {
        title: 'Create Your Sprites',
        css: ['main.css', 'createsprites.css'],
        js: ["main.js", "createsprites.js"]
    });
});

/* POST REQUEST FOR UPLOADING IMGS */
router.post('/upload', (req, res, next) => {
    //user loged in
    let user = getUser(req);
    let uploadPath = "./public/uploads/" + user + "/uploads/";

    if (req.files && user) {
        let file = req.files.file;
        let filename = file.name;
        file.mv(uploadPath + filename, (err) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send("ok");
            }
        });
    } else {
        next(err);
    }
});

/* POST REQUEST FOR REMOVING IMGS */
router.post('/removeimg', (req, res, next) => {
    //user loged in
    let user = getUser(req);
    let uploadPath = "./public/uploads/" + user + "/uploads/";
    let pic = req.body.removePic;

    try {
        //delete pic
        del.sync(uploadPath + pic);
        res.send("pic " + pic + " removed!");
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }

});

/* POST REQUEST FOR RENAMING IMGS */
router.post('/renameimg', (req, res, next) => {
    //user loged in
    let user = getUser(req);
    let uploadPath = "./public/uploads/" + user + "/uploads/";

    //post data destructured
    let { oldName, newName } = { ...req.body };

    try {
        //rename pic
        fs.rename(uploadPath + oldName, uploadPath + newName, (err) => {
            err ? next(err) : res.send("pic " + oldName + " renamed to " + newName);
        });
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }

});


/* POST DATA REQUEST for start creating sprite */

router.post('/create', (req, res, next) => {
    //user loged in
    let user = getUser(req);
    let uploadPath = "./public/uploads/" + user + "/uploads/";
    let spritesPath = "./public/uploads/" + user + "/createdsprites/";

    //post data destructuring!!!
    let { picType, padding, bgdColor, imgName, folder, className } = { ...req.body };

    //padding limmit
    padding = parseInt(padding);

    if (padding > 100) {
        padding = 100;
    }
    if (padding < 0) {
        padding = 0;
    }

    //picType change noms && backcol deff
    const hexToRgba = hex => {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
            let r = parseInt(result[1], 16);
            let g = parseInt(result[2], 16);
            let b = parseInt(result[3], 16);
            return [r, g, b, 1];
        } else {
            return [255, 255, 255, 1]
        }
    }

    if (picType === "jpeg") {
        picType = "jpg";
        bgdColor = hexToRgba(bgdColor);
    } else {
        bgdColor = [0, 0, 0, 0];
    }

    let dataCookie = JSON.stringify({ picType, imgName, folder, className });

    //gulp task create
    gulp.task('sprite', () => {
        const spriteData = gulp.src(uploadPath + '*.' + picType)
            .pipe(spritesmith({
                /* this whole image path is used in css background declarations */
                imgName: imgName + '.' + picType,
                cssName: 'sprite.json',
                padding: padding,
                imgOpts: {
                    background: bgdColor
                }
            }));
        const imgStream = spriteData.img
            .pipe(gulp.dest(spritesPath));
        const cssStream = spriteData.css
            .pipe(gulp.dest(spritesPath));

        return merge(imgStream, cssStream).on('end', () => {
            res.cookie("data", dataCookie).send('ok');
        });
    });

    gulp.start('sprite');

});

module.exports = router;
