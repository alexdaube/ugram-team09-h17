var GlobalPicturesService = require("../services/GlobalPicturesService");
var config = require('getconfig');

module.exports = function(app) {

app.get('/pictures', isLoggedIn, function(req, res) {
        var globalPicturesService = new GlobalPicturesService(config);
        globalPicturesService.getAllPictures(req, res);
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
