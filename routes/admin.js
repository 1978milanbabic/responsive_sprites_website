const express = require('express');
const router = express.Router();
//logg
const Logger = require('../logger/logger');
//admin pass
const secrets = require('../secrets/secrets');
//db model
const User = require('../models/users');
const Logg = require('../models/loggs');

/* admin login page */
router.get('/', (req, res, next) => {
    res.render('adminLogin', {
        title: 'Login as Admin',
        css: ['main.css', 'adminlogin.css'],
        js: ["main.js"]
    });
});

//admin logged page
router.post('/', (req, res, next) => {
    // password
    let adminPass = secrets.adminPass;
    let pass = req.body.password;
    let usersData, loggsData;

    if (pass !== adminPass) {
        let ip = req.connection.remoteAddress || "not detected";
        let uname = req.cookies.user || "Not logged";
        Logger(ip, uname, 'Wrong Admin Log!!!', 'High');
    } else {

        User.find()
            .then((doc) => {
                usersData = doc;

                Logg.find()
                    .then((doc2) => {
                        loggsData = doc2;

                        res.render('adminPage', {
                            title: 'Welcome Admin',
                            css: ['main.css', 'adminpage.css'],
                            js: ["main.js"],
                            loggsData,
                            usersData
                        });
                    })
                    .catch(next);
            })
            .catch(next);
    }
});

module.exports = router;
