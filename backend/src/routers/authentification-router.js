var passportService = require('../services/passport');
var passport = require('passport');
var AuthenticationController = require("../controllers/AuthenticationController");


var isLoggedIn = passport.authenticate('jwt', {session: false});

module.exports = function (app) {

    /**
    app.get('/', isLoggedIn, function (req, res) {
        res.status(200).send("Welcome to Ugram API");
    });

    app.get('/login', isLoggedIn, function (req, res) {
        console.log("login page should appear here. Go to /auth/facebook to login or signup");
        res.send({message: "login page should appear here. Go to /auth/facebook to login or signup"});
    });
    **/
    app.post('/signup', AuthenticationController.signup);

    app.post('/login', AuthenticationController.login);

    /**
    // route for logging out
    app.get('/logout', function (req, res) {
        req.logout();
        res.send({message: "You are now logged out."});
    });
     **/
};