var passportService = require('../services/passport');
var passport = require('passport');
var AuthenticationController = require("../controllers/AuthenticationController");


var isLoggedIn = passport.authenticate('jwt', {session: false});

module.exports = function (app) {

    app.post('/signup', AuthenticationController.signup);

    app.post('/login', AuthenticationController.login);
};