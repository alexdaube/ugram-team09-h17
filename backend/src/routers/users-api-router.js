/**
 * Created by Leandre Noel on 2/21/2017.
 */


var express = require('express');
var router = express.Router();

router.get("/", function(req, res) {

     var query = req.query; //query in url ?param1=1&param2=2

    if(false) { //Unauthorized
        res.status(401).send("Unauthorized");
    }
    else if(false) { //Forbidden
        res.status(403).send("Forbidden");           
    }
    else if(false) { //Not Found
        res.status(404).send("Not Found");
    }

    res.status(200).send("GET /users");
});

router.get("/:userId", function(req, res) {

    var userId = req.path;

    if(false) { //Missing parameter or unexisting user
        res.status(400).send("Missing parameter or unexisting user");
    }
    else if(false) { //Unauthorized
        res.status(401).send("Unauthorized");
    }
    else if(false) { //Forbidden
        res.status(403).send("Forbidden");           
    }
    else if(false) { //Not Found
        res.status(404).send("Not Found");
    }

    res.status(200).send("GET /users" + req.path);
});

router.put("/:userId", function(req, res) {

    if(false) { //Missing parameter or unexisting user
        res.status(400).send("Missing parameter or unexisting user");
    }
    else if(false) { //Unauthorized
        res.status(401).send("Unauthorized");
    }
    else if(false) { //Forbidden
        res.status(403).send("Editing on forbidden user account for current authentification");           
    }
    else if(false) { //Not Found
        res.status(404).send("Not Found");
    }

    return res.status(201).send("PUT user-api");
});

router.get("/:userId/pictures", function(req, res) {

    var userId = req.path;
    var query = req.query;

    if(false) { //Missing parameter or unexisting user
        res.status(400).send("Missing parameter or unexisting user");
    }
    else if(false) { //Unauthorized
        res.status(401).send("Unauthorized");
    }
    else if(false) { //Forbidden
        res.status(403).send("Editing on forbidden user account for current authentification");           
    }
    else if(false) { //Not Found
        res.status(404).send("Not Found");
    }

    return res.status(200).send("GET user-pictures" + userId + " " + query);
});

router.post("/:userId/pictures", function(req, res) {

    var userId = req.path;
    var pictureModel = req.body;

    if(false) { //Missing parameter or unexisting user
        res.status(400).send("Missing parameter or unexisting user");
    }
    else if(false) { //Unauthorized
        res.status(401).send("Unauthorized");
    }
    else if(false) { //Forbidden
        res.status(403).send("Editing on forbidden user account for current authentification");           
    }
    else if(false) { //Not Found
        res.status(404).send("Not Found");
    }
    else if(false) { //Unexpected error when saving picture
        res.status(500).send("Unexpected error when saving picture");
    }

    return res.status(201).send("POST user-pictures");
});

router.get("/:userId/pictures/:pictureId", function(req, res) {
    var userId = req.path;
    var pictureId = req.path;

    if(false) { //Missing parameter or unexisting user
        res.status(400).send("Missing parameter or unexisting user");
    }
    else if(false) { //Unauthorized
        res.status(401).send("Unauthorized");
    }
    else if(false) { //Forbidden
        res.status(403).send("Editing on forbidden user account for current authentification");           
    }
    else if(false) { //Not Found
        res.status(404).send("Not Found");
    }

    return res.status(200).send("GET user-pictures");
});

router.put("/:userId/pictures/:pictureId", function(req, res) {

    var userId = req.path;
    var pictureId = req.path;
    var editPictureModel = req.body;

    if(false) { //Missing parameter or unexisting user
        res.status(400).send("Missing parameter or unexisting user");
    }
    else if(false) { //Unauthorized
        res.status(401).send("Unauthorized");
    }
    else if(false) { //Forbidden
        res.status(403).send("Editing on forbidden user account for current authentification");           
    }
    else if(false) { //Unexpected error when saving picture
        res.status(500).send("Unexpected error when saving picture");
    }

    return res.status(201).send("PUT user-pictures");
});

router.delete("/:userId/pictures/:pictureId", function(req, res) {

    var userId = req.path;
    var pictureId = req.path;

    if(false) { //No content
         res.status(204).send("No content");
    }
    else if(false) { //Missing parameter or unexisting user
        res.status(400).send("Missing parameter or unexisting user");
    }
    else if(false) { //Unauthorized
        res.status(401).send("Unauthorized");
    }
    else if(false) { //Forbidden
        res.status(403).send("Editing on forbidden user account for current authentification");           
    }
    else if(false) { //Not Found
        res.status(404).send("Not Found");
    }

    return res.status(200).send("GET user-pictures");
});

module.exports = router;

