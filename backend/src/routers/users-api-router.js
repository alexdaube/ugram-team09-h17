var UserService = require("../services/UserService");
var config = require('getconfig');

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

    app.post("/users/:userId/pictures", isLoggedIn, function (req, res) {
        var userService = new UserService(config);
        userService.createUserPicture(req, res);
    });

    app.delete("/users/:userId/pictures/:pictureId", isLoggedIn, function (req, res) {
        var userService = new UserService(config);
        userService.deleteUserPicture(req, res);
    });

    app.get("/users/:userId/pictures/:pictureId", isLoggedIn, function (req, res) {
        var userService = new UserService(config);
        userService.getUserPicture(req, res);
    });

    app.put("/users/:userId/pictures/:pictureId", isLoggedIn, function (req, res) {
        var userService = new UserService(config);
        userService.updateUserPicture(req, res);
    });

}

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on

    return next();
    // TODO Uncomment the fuck ou't'his shit
    // if (req.isAuthenticated())
    //     return next();
    // if they aren't redirect them to the home page
    //res.redirect('/login');
}
