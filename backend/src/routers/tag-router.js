var passportService = require('../services/passport');
var passport = require('passport');
var TagService = require("../services/TagService");
var GlobalPicturesService = require("../services/GlobalPicturesService");
var UserService = require("../services/UserService");

var isLoggedIn = passport.authenticate('jwt', { session: false });

module.exports = function (app) {

    app.get('/tags/popular', isLoggedIn, function (req, res) {
        var tagService = new TagService(global.configs.repository);
        tagService.getPopularHashtags(req, res);
    });

    app.get("/tags/:tag/pictures", isLoggedIn, function (req, res) {
        var pictureService = new GlobalPicturesService(global.configs.repository);
        pictureService.getWit(req, res);
    });
};