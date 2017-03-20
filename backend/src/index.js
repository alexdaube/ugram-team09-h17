
if (process.argv.length !== 3){
    throw new Error('missing config file argument');
} else {
    global.configs = require(process.argv[2]);
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Database = require("./infra/database/Database");

const authentificationRouter = require("./routers/authentification-router");
const globalPicturesApiRouter = require("./routers/global-pictures-api-router");
const userApiRouter = require("./routers/users-api-router");

const app = express();
const flash    = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errors = require('./common/errors');
const passport = require('passport');
const session = require('express-session');


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
const port = process.env.PORT || global.configs.server.port;

app.use(require('morgan')('combined'));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: global.configs.session.secret, // session secret
    resave: true,
    saveUninitialized: true
}));

app.use(flash()); // use connect-flash for flash messages stored in session
app.use(cors(corsOptions));

// routes ======================================================================
authentificationRouter(app); // load our routes and pass in our app and fully configured passport
globalPicturesApiRouter(app);// load our routes and pass in our app and fully configured passport
userApiRouter(app);

// launch ======================================================================
app.listen(port);

console.log(`App started on port ${port}`);
