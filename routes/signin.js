const express = require('express');
const router = express.Router();
//db model
const User = require('../models/users');


/* login controler */
router.post('/', (req, res, next) => {
    //destructuring post vars
    let { un, pass } = { ...req.body };


    //find in DB
    User.find({ username: un, password: pass })
        .then(doc => {
            if (doc.length === 0) {
                res.send("Wrong username/password!");
            } else {
                //not mail confirmed!
                if (!doc[0].active) {
                    res.send("Your account is not confirmed!");
                } else {
                    //log in!!!!
                    res.cookie('user', un).send("signed");
                }
            }
        })
        .catch(next);   //calls error handler(page)
});

module.exports = router;