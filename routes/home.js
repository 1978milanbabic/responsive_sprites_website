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
    let query = un;
    User.find({})
        .then((users) => {
            res.send(users);
        });

    // user.save()
    //     .then(() => {
    //         console.log('Instance Saved to mongoDB!');
    //     })
    //     .catch(next);

    //send confirmation mail

    // res.send([un, pass]);
});

/* login controler */
router.post('/login', (req, res, next) => {
    let { un, pass } = { ...req.body };


    res.send([un, pass]);
});

module.exports = router;