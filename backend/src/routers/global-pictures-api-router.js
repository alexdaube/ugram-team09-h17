var passportService = require('../services/passport');
var passport = require('passport');
var GlobalPicturesService = require("../services/GlobalPicturesService");
var config = global.configs.repository;
var isLoggedIn = passport.authenticate('jwt', {session: false});

module.exports = function(app) {

    app.get('/pictures', isLoggedIn, function(req, res) {
        var globalPicturesService = new GlobalPicturesService(config);
        globalPicturesService.getAllPictures(req, res);
    });

    app.get('/pictures/:pictureId/likes', isLoggedIn, function(req, res) {
        console.log("app.get");
        var globalPicturesService = new GlobalPicturesService(config);
        globalPicturesService.getPictureLikes(req, res);
    });

    app.post("/pictures/:pictureId/likes", isLoggedIn, function (req, res) {
        var globalPicturesService = new GlobalPicturesService(config);
        globalPicturesService.addPictureLikes(req, res);
    });

    app.delete("/pictures/:pictureId/likes", isLoggedIn, function (req,res){
        var globalPicturesService = new GlobalPicturesService(config);
        globalPicturesService.deletePictureLikes(req,res);
    });

    app.get('/pictures/:pictureId/comments', isLoggedIn, function(req, res) {
        var globalPicturesService = new GlobalPicturesService(config);
        globalPicturesService.getPictureComments(req, res);
    });

    app.post('/pictures/:pictureId/comments', isLoggedIn, function(req, res) {
        var globalPicturesService = new GlobalPicturesService(config);
        globalPicturesService.addPictureComments(req, res);
    });
};