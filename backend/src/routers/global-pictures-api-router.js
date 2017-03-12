var GlobalPicturesService = require("../services/GlobalPicturesService");
var config = require('getconfig');

module.exports = function(app) {

app.get('/pictures', isLoggedIn, function(req, res) {
        var globalPicturesService = new GlobalPicturesService(config);
        globalPicturesService.getAllPictures(req, res);
    });
}

function isLoggedIn(req, res, next) {
    return next();
    // TODO Uncomment the fuck ou't'his shit
    // if (req.isAuthenticated())
    //     return next();
    //res.redirect('/login');
}
