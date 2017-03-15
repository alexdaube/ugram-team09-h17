var AuthenticationController = require("../controllers/AuthenticationController");

module.exports = function (app, passport) {
    const User = require('../models/user');

    app.get('/', isLoggedIn, function (req, res) {
        res.status(200).send("Welcome to Ugram API");
    });

    app.get('/login', function (req, res) {
        console.log("login page should appear here. Go to /auth/facebook to login or signup");
        res.send({message: "login page should appear here. Go to /auth/facebook to login or signup"});
    });


    // PROFILE SECTION =========================
    // app.get('/profile', isLoggedIn, function (req, res) {
    //      console.log("Succes");
    //
    //     global.user = req.user;
    //     res.status(200).send({
    //         message: "You should see profile page here",
    //         user: req.user
    //     });
    // });

    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            scope: 'email',
            //successRedirect: '/profile',
            failureRedirect: '/login'
        }), AuthenticationController.facebookLogin);

    // route for logging out
    app.get('/logout', function (req, res) {
        req.logout();
        res.send({message: "You are now logged out."});
    });
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    return next();
    // if (req.isAuthenticated())
    //     return next();
    // res.status(401).send("Unauthorized");
}