var express = require('express');
var router = express.Router();

var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');

var del = require('del');

   
/* DISPLAY CREATESPRITES PAGE. */
router.get('/', function(req, res, next) {
    //first delete previous uploads and creations
    del.sync(['public/uploads/**', '!public/uploads']);         //delete pics - leave upload folder
    //del.sync(['public/createdsprites/images/**', '!public/createdsprites/images']);         //delete sprites - leave created sprites folder - zajebava delete slike ponekad
    //del.sync(['public/createdsprites/stylesheets/**', '!public/createdsprites/stylesheets']);         //delete jsons - leave created jsons folder
    
    //render page
    res.render('createsprites');
});

/* POST REQUEST FOR UPLOADING IMGS */
router.post('/upload', function(req, res, next) {
    if(req.files){          
        var file = req.files.file;
        var filename = file.name;                                   
        file.mv("./public/uploads/"+filename, function(err){
            if(err){
                console.log(err);
                res.send(err);
            }else{
                res.send("ok");
            }
        });
    }
});

/* POST DATA REQUEST for start creating sprite */
router.post('/create', function(req, res, next) {
    
    //posts!!!
    var posts = req.body;
    for(var key in posts){
        console.log(key, posts[key]);
    }
    
    //gulp task create
    gulp.task('sprite', function () {
        var spriteData = gulp.src('./public/uploads/**/*.png')
            .pipe(spritesmith({
                /* this whole image path is used in css background declarations */
                imgName: '../images/sprite.png',
                cssName: 'sprite.json',
                padding: 10

            }));
        var imgStream = spriteData.img
    //        .pipe(buffer())
    //        .pipe(imagemin())
            .pipe(gulp.dest('./public/createdsprites/images/'));
        var cssStream = spriteData.css
            .pipe(gulp.dest('./public/createdsprites/stylesheets/'));

        return merge(imgStream, cssStream).on('end', function(){res.send('ok');});
    });
    
    gulp.start('sprite');
    
    
});

module.exports = router;
