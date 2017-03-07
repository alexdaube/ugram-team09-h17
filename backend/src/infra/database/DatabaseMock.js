

var databaseMock = function(){

}

databaseMock.prototype.isUserSignedIn = function(token, callback){

    if(token != "24d6e087-51a0-465a-a19b-ce9570ad3169"){
        return callback(false, 401);
    }
    return callback(true, null);
}

module.exports = databaseMock;