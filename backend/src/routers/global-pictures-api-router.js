var passportService = require('../services/passport');
var passport = require('passport');
var GlobalPicturesService = require("../services/GlobalPicturesService");

var isLoggedIn = passport.authenticate('jwt', {session: false});

module.exports = function(app) {

app.get('/pictures', isLoggedIn, function(req, res) {
        var globalPicturesService = new GlobalPicturesService(global.configs.repository);
        globalPicturesService.getAllPictures(req, res);
    });
};
