const express = require('express');
const router = express.Router();
//db model
const User = require('../models/users');


router.get('/:data', (req, res, next) => {
    //request params
    let reqData = req.params.data;

    if (reqData && reqData.length > 0) {
        res.send(reqData);
    } else {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    }

});

module.exports = router;