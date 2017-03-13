var GlobalPicturesService = require("../services/GlobalPicturesService");

module.exports = function(app) {

app.get('/pictures', isLoggedIn, function(req, res) {
        var globalPicturesService = new GlobalPicturesService(global.configs.repository);
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
