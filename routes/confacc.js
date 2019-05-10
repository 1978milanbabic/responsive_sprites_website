const express = require('express');
const router = express.Router();
//db model
const User = require('../models/users');
//logg
const Logger = require('../logger/logger');

//show TY for confirming acc page
const renderPage = response => response.render('confirmacc', {
    title: 'Thank you for confirming your account',
    css: ['main.css', 'confirm.css'],
    js: ["main.js"]
});


router.get('/:data', (req, res, next) => {
    //log
    Logger('Account verification vissited');

    //request params
    let reqData = req.params.data;

    if (reqData && reqData.length > 0) {
        User.findOne({ confirmationData: reqData })
            .then((result) => {
                let alreadyConfirmed = result.active;

                if (alreadyConfirmed) {
                    //already confirmed account / show TY
                    renderPage(res);
                } else {
                    result.active = true;
                    //save change to DB
                    result.save()
                        .then(() => {
                            //confirmation success / show TY
                            renderPage(res);
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