const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');
const nodemailer = require('nodemailer');


//*********************** PAGE ROUTES *************************
const home = require('./routes/home');
const create = require('./routes/createsprites');
const done = require('./routes/spritescreated');
const wronglog = require('./routes/errlogin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//paths, parsers
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload());

//******************* page routing CONTROLERS ******************
app.use('/', home);                     //also login and signup controler
app.use('/createsprites', create);
app.use('/spritescreated', done);
app.use('/errlogin', wronglog);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    res.render('error', {
        title: 'Error',
        css: ['main.css', "error.css"],
        js: ["main.js"]
    });
});


module.exports = app;
