const express = require('express');
const bodyParser = require('body-parser');
const flash    = require('connect-flash');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Promise = require('bluebird');
const errors = require('./common/errors');
// const logger = require('./common/logger');
const passport = require('passport');
const router = require('./router');
const session = require('express-session');

const app = express();

const corsOptions = {
    origin: '*',
    methods: [
        'GET',
        'PUT',
        'POST',
        'PATCH',
        'DELETE',
        'UPDATE'
    ],
    credentials: true
};

// configuration ===============================================================
// const winston = require('winston');
// const winstonCloudWatch = require('winston-cloudwatch');

// winston.add(winstonCloudWatch, {
//     logGroupName: 'glo3012',
//     logStreamName: 'sample'
// });

require('./services/passport')(passport); // pass passport for configuration

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));


// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(errors.genericErrorHandler);
// Enables access-logs on each calls
app.use(cors(corsOptions));

// routes ======================================================================
router(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
const port = process.env.PORT || 3000;
app.listen(port);

console.log(`App started on port ${port}`);

// logger.info(`App started on port ${port}`);
