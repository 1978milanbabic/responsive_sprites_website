const express = require('express');
const router = express.Router();
//db model
const User = require('../models/users');


router.get('/:data', (req, res, next) => {
    //request params
    let reqData = req.params.data;

    if (reqData && reqData.length > 0) {
        User.findOne({ confirmationData: reqData })
            .then((result) => {
                let alreadyConfirmed = result.active;

                if (alreadyConfirmed) {
                    //render "you have already confirmed your acc" page
                    res.render('confirmacc', {
                        title: 'Thank you, but you have already confirmed your account',
                        css: ['main.css', 'confirm.css'],
                        js: ["main.js"],
                        heading: "Thank you, but you have already confirmed your account!"
                    });
                } else {
                    result.active = true;
                    result.save()   //save change to DB
                        .then(() => {
                            //render "confirmation success" page
                            res.render('confirmacc', {
                                title: 'Thank you for confirming your account',
                                css: ['main.css', 'confirm.css'],
                                js: ["main.js"],
                                heading: "Thank you for confirming your account!"
                            });
                        })
                        .catch(next);   //err handler
                }
            })
            .catch(next);   //err handler
    } else {
        //no data to be processed
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    }

});

module.exports = router;