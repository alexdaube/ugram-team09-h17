var passportService = require('../services/passport');
var passport = require('passport');
var UserService = require("../services/UserService");
var config = global.configs.repository;
var LocalUploadService = require("../services/LocalUploadService");

var isLoggedIn = passport.authenticate('jwt', {session: false});

module.exports = function (app) {

    app.get('/users', isLoggedIn, function (req, res) {
        var userService = new UserService(config);
        userService.getAllUsers(req, res);
    });

    app.get("/users/:userId", isLoggedIn, function (req, res) {
        var userService = new UserService(config);
        userService.getUser(req, res);
    });

    app.put("/users/:userId", isLoggedIn, function (req, res) {
        var userService = new UserService(config);
        userService.updateUser(req, res);
    });

    app.get("/users/:userId/pictures", isLoggedIn, function (req, res) {
        var userService = new UserService(config);
        userService.getUserPictures(req, res);
    });

    app.post("/users/:userId/pictures", isLoggedIn, LocalUploadService.upload.single("file"), function (req, res) {
        var userService = new UserService(config);
        userService.createUserPicture(req, res);
    });

    app.delete("/users/:userId/pictures/:pictureId", isLoggedIn, function (req, res) {
        var userService = new UserService(config);
        userService.deleteUserPicture(req, res);
    });

    app.delete("/users/:userId", isLoggedIn, function (req,res){
        var userService = new UserService(config);
        userService.deleteUser(req,res);
    });

    app.get("/users/:userId/pictures/:pictureId", isLoggedIn, function (req, res) {
        var userService = new UserService(config);
        userService.getUserPicture(req, res);
    });

    app.put("/users/:userId/pictures/:pictureId", isLoggedIn, function (req, res) {
        var userService = new UserService(config);
        userService.updateUserPicture(req, res);
    });

};
