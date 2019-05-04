const express = require('express');
const router = express.Router();
//db model
const User = require('../models/users');


router.get('/', (req, res, next) => {
    User.find().deleteMany()
        .then(() => {
            res.send("all removed");
        });
});

module.exports = router;