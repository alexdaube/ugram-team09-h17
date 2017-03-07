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

    res.status(200).send("GET /pictures");
});

module.exports = router;