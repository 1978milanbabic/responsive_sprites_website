const express = require('express');
const router = express.Router();
//db model
const User = require('../models/users');

router.get('/:data', (req, res, next) => {
    //request params
    let reqData = req.params.data;

    res.send(reqData);
});