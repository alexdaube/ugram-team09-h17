var passportService = require('../services/passport');
var passport = require('passport');
var TagService = require("../services/TagService");

var UserService = require("../services/UserService");

var isLoggedIn = passport.authenticate('jwt', { session: false });

module.exports = function (app) {

    app.get('/tag/popular', isLoggedIn, function (req, res) {
    //app.get('/tag/popular', function (req, res) {
        var tagService = new TagService(global.configs.repository);
        tagService.getPopularHashtags(req, res);
    });
};