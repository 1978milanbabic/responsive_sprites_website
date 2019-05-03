const express = require('express');
const router = express.Router();
//db model
const User = require('../models/users');

/* Home page */
router.get('/', (req, res, next) => {
    res.render('home', {
        title: 'Home',
        css: ['main.css', 'home.css'],
        js: ["main.js", "home.js"]
    });
});

/* mailer (sign up) controler */
router.post('/mail', (req, res, next) => {
    let { un, pass } = { ...req.body };

    let user = new User();
    user.username = un;
    user.password = pass;
    user.confirmationData = "test";

    //find in db if already exists
    User.find({ username: "popo@yahoo.com" }).then((res) => {
        res.send(["found", res]);
    });
    // .then((users) => {
    //     if (users.username == user.username) {
    //         //record already exists
    //         res.send('Already there!');
    //     } else {


    //     }
    // });
    //create a new record
    // user.save()
    // .then(() => {
    //     console.log('Instance Saved to mongoDB!');
    // })
    // .catch(next);

    // //send confirmation mail

});

/* login controler */
router.post('/login', (req, res, next) => {
    let { un, pass } = { ...req.body };


    res.send([un, pass]);
});

module.exports = router;