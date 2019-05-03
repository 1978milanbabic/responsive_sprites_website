const express = require('express');
const router = express.Router();
//db model
const mongoose = require('mongoose');
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
    mongoose.connect('mongodb://localhost/userlist', { useNewUrlParser: true }, (err, db) => {
        const dbo = db.db("userlist");
        let query = { username: username };
        dbo.collection("userlist").find(query).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
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