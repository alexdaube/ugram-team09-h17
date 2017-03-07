
var express = require('express');
var router = express.Router();
var config = require('getconfig');

var AccesService = require("../services/AccesService");
var RequestManager = require("../util/RequestManager").requestManager;

router.get("/", function(req, res) {
     var accesService = new AccesService(config);
     var token = RequestManager.prototype.getBearerToker(req);

     accesService.isUserSignedIn(token, function(result, err){
        if(result){
            res.status(200).send("Welcome to Ugram API");
        }
        else {
            res.status(err.statusCode).send(err.message);
        }
     });
});

module.exports = router;