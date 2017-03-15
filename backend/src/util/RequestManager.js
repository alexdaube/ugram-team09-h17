

var requestManager = function(){

}

requestManager.prototype.getBearerToker = function(request){
    return request.headers.bearer;
}

exports.requestManager = requestManager;