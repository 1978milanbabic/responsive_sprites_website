const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
//db model
const User = require('../models/users');
const fs = require('fs');

//random character generator
const makeid = (len) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//mailing
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'responsive.sprites@gmail.com',
        pass: 'respsprites1'
    }
});



/* mailer (sign up) controler */
router.post('/', (req, res, next) => {
    //destructuring post vars
    let { un, pass } = { ...req.body };
    //create confirmation data
    let randConf = makeid(70);

    //constructing DB model
    let user = new User();
    user.username = un;
    user.password = pass;
    user.confirmationData = randConf;

    //find in DB if already exists
    User.find({ username: un })
        .then(doc => {
            if (doc.length > 0) {  //if record already exists
                //render already exists err
                res.send("This email is already registered!");
            } else {    //not registered in DB
                //save new instance
                user.save()
                    .then(() => {
                        //development debug point
                        console.log('Instance Saved to mongoDB!', un);
                        // next step => send an email to confirm registration
                        const mailOptions = {
                            from: 'responsive.sprites@gmail.com',
                            to: un,
                            subject: 'RSF confirmation',
                            text: 'Please confirm your account verification by clicking on following link:\n http://responsive-sprites.com/confirm/' + randConf
                        };

                        //create folder for future user files storage
                        let userDir = 'public/uploads/' + un;
                        fs.stat(userDir, (err) => {
                            if (!err) {
                                console.log('file or directory exists');
                            }
                            else if (err.code === 'ENOENT') {
                                console.log('file or directory does not exist');
                                fs.mkdir(userDir);
                                fs.mkdir(userDir + "/uploads");
                                fs.mkdir(userDir + "/createdsprites")
                            }
                        });

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log(error);
                                res.send("Sending your confirmation mail failed!");
                            } else {
                                console.log('Email sent: ' + info.response);
                                res.send("Please check out your email to verify your account!");

                            }
                        });
                    })
                    .catch(next);   //calls error handler(page)
            }
        })
        .catch(next);   //calls error handler(page)
});

module.exports = router;