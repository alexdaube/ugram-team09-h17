

var databaseMock = function () {

}

databaseMock.prototype.isUserSignedIn = function (token, callback) {

    if (token != "24d6e087-51a0-465a-a19b-ce9570ad3169") {
        return callback(false, 401);
    }
    return callback(true, null);
}

databaseMock.prototype.getAllPictures = function (page, perPage, callback) {
    var respMock = {
        items: [
            {
                id: 938,
                createdDate: 1487876749000,
                description: "",
                mentions: [],
                tags: [],
                url: "http://images.ugram.net/ABC/938.jpg",
                userId: "ABC"
            },
            {
                id: 936,
                createdDate: 1487870491000,
                description: "",
                mentions: [],
                tags: [],
                url: "http://images.ugram.net/ABC/936.jpg",
                userId: "ABC"
            },
            {
                id: 935,
                createdDate: 1487870276000,
                description: "caca",
                mentions: [],
                tags: [],
                url: "http://images.ugram.net/vseguin/935.",
                userId: "vseguin"
            }
        ],
        totalPages: 111,
        totalEntries: 331
    }
    return callback(200, respMock);
}

databaseMock.prototype.getAllUsers = function (callback) {

    var respMock = JSON.stringify({
        "items": [
            {
                "id": "phildupuis1",
                "email": "bobine@couture.ca",
                "firstName": "Phil",
                "lastName": "En aiguille",
                "phoneNumber": 1234848594,
                "pictureUrl": null,
                "registrationDate": 1486355198000
            },
            {
                "id": "CODYX",
                "email": "aimeric.seguin@gmail.com",
                "firstName": "Aimeric",
                "lastName": "Sgn",
                "phoneNumber": 660764542,
                "pictureUrl": "https://graph.facebook.com/v2.5/1749553842027799/picture",
                "registrationDate": 1486352553000
            },
            {
                "id": "Mediavision",
                "email": "jeremy.mediavilla@gmail.com",
                "firstName": "Jérémy",
                "lastName": "Mediavilla",
                "phoneNumber": 0,
                "pictureUrl": "https://graph.facebook.com/v2.5/10212563961713943/picture",
                "registrationDate": 1486328996000
            }
        ],
        "totalPages": 20,
        "totalEntries": 59
    });
    return callback(200, respMock);
}

databaseMock.prototype.getUser = function (userId, callback) {

    var respMock = JSON.stringify({
        "id": "vseguin",
        "email": "vincent.seguin.2@gmail.com",
        "firstName": "Vincent",
        "lastName": "Séguin",
        "phoneNumber": 4189141099,
        "pictureUrl": "https://graph.facebook.com/v2.5/1253337201416858/picture",
        "registrationDate": 1483387698000
    });
    return callback(200, respMock);
}

databaseMock.prototype.updateUser = function(userId, body, callback) {
    return callback(201, null);
}

module.exports = databaseMock;