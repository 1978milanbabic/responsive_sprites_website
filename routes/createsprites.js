const express = require('express');
const router = express.Router();

const gulp = require('gulp');
const spritesmith = require('gulp.spritesmith');
const merge = require('merge-stream');

const del = require('del');


/* DISPLAY CREATESPRITES PAGE. */
router.get('/', (req, res, next) => {
    //first delete previous uploads and creations
    //del.sync(['public/uploads/**', '!public/uploads']);         //delete pics - leave upload folder

    //render page
    res.render('createsprites', {
        title: 'Create Your Sprites',
        css: ['main.css', 'createsprites.css'],
        js: ["main.js", "createsprites.js"]
    });
});

/* POST REQUEST FOR UPLOADING IMGS */
router.post('/upload', (req, res, next) => {
    if (req.files) {
        let file = req.files.file;
        let filename = file.name;
        file.mv("./public/uploads/" + filename, (err) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send("ok");
            }
        });
    }
});

/* POST DATA REQUEST for start creating sprite */
router.post('/create', (req, res, next) => {
    //posts!!!
    let posts = req.body;
    for (let key in posts) {
        console.log(key, posts[key]);
    }

    //gulp task create
    gulp.task('sprite', () => {
        const spriteData = gulp.src('./public/uploads/**/*.png')
            .pipe(spritesmith({
                /* this whole image path is used in css background declarations */
                imgName: '../images/sprite.png',
                cssName: 'sprite.json',
                padding: 10

            }));
        const imgStream = spriteData.img
            //        .pipe(buffer())
            //        .pipe(imagemin())
            .pipe(gulp.dest('./public/createdsprites/images/'));
        const cssStream = spriteData.css
            .pipe(gulp.dest('./public/createdsprites/stylesheets/'));

        return merge(imgStream, cssStream).on('end', () => { res.send('ok'); });
    });

    gulp.start('sprite');


});

module.exports = router;
