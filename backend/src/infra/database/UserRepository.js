var ErrorHandler = require("../../common/errors")
var Request = require("./DatabaseMock");
const User = require('../../models/user');
const Picture = require("../../models/picture");
const Mention = require("../../models/mention");
const Tag = require("../../models/tag");
var DatabaseDTO = require("../../util/DatabaseDTO");


var userRepository = function (config) {
    this.host = config.repository.host;
    this.port = config.repository.port;
    this.databaseDTO = new DatabaseDTO();
}

// DONE
userRepository.prototype.getAll = function (page, perPage, callback) {

    var that = this;
    var numberOfPictureInTotal;
    var numberOfPages;
    if (typeof perPage === 'undefined') { perPage = 20 };

    new User().fetchAll().then(function (users) {
        numberOfPictureInTotal = users.length;
        numberOfPages = Math.ceil(numberOfPictureInTotal / perPage);
        users.query(function (qb) {
            qb.limit(perPage).offset(page * perPage)
        }).fetch()
            .then(function (newCollection) {
                var newCollectionJSON =
                    {
                        items: that.databaseDTO.getUserJSON(newCollection),
                        totalPages: numberOfPages,
                        totalEntries: numberOfPictureInTotal
                    }

                return callback(null, newCollectionJSON);
            })
    }).catch(function (err) {
        handleError(400, null, callback);
    });
}

// DONE
userRepository.prototype.get = function (userId, callback) {

    var that = this;
    new User({ userName: userId }).fetch().then(function (user) {
        var newUserJSON = that.databaseDTO.getUserJSON(user);
        return callback(null, newUserJSON);
    }).catch(function (err) {
        handleError(400, null, callback);
    });
}

// DONE
userRepository.prototype.update = function (userId, body, callback) {

    var newEmail = body.email;
    var newFirstName = body.firstName;
    var newLastName = body.lastName;
    var newPhoneNumber = body.phoneNumber;
    var that = this;

    new User({ userName: userId })
    .fetch()
    .then(function (user) {
        user.save({
            email: newEmail,
            firstName: newFirstName,
            lastName: newLastName,
            phoneNumber: newPhoneNumber
        }).then(function (newUser) {
            var newUserJSON = that.databaseDTO.getUserJSON(newUser);
            return callback(null, newUserJSON);
        }).catch(function (err) {
            if (err.message === 'No Rows Updated') {
                var formattedUserJSON = that.databaseDTO.getUserJSON(user);
                return callback(null, formattedUserJSON);
            }
            handleError(400, null, callback);
        });
    });
}

// DONE
userRepository.prototype.getUserPictures = function (userId, page, perPage, callback) {

    var that = this;
    var numberOfPictureInTotal;
    var numberOfPages;
    if (typeof perPage === 'undefined') { perPage = 20 };

    new Picture()
        .fetchAll({ withRelated: ["tags", "mentions"] })
        .then(function (pictures) {
            if (pictures) {
                numberOfPictureInTotal = pictures.length;
                numberOfPages = Math.ceil(numberOfPictureInTotal / perPage);
                pictures.query(function (qb) {
                    qb.limit(perPage)
                        .offset(page * perPage)
                        .where({ userId: userId })
                }).fetch()
                    .then(function (newCollection) {
                        numberOfPictureInTotal = newCollection.length;
                        numberOfPages = Math.ceil(numberOfPictureInTotal / perPage);
                        var newCollectionJSON =
                            {
                                items: that.databaseDTO.getPictureJSON(newCollection),
                                totalPages: numberOfPages,
                                totalEntries: numberOfPictureInTotal
                            }
                        return callback(null, newCollectionJSON);
                    })
            }
            else {
                return callback(null, {});
            }
        }).catch(function (err) {
            console.log(err);
            handleError(400, null, callback);
        });
}

userRepository.prototype.createPicture = function (userId, body, callback) {

    User.where({ userName: userId })
        .fetch()
        .then(function (user) {
            if (!user) {
                return callback({ statusCode: 400, message: "Missing parameter or unexisting user" });
            }

            new Picture({
                description: body.description,
                userId: userId
            })
                .save()
                .then(function (picture) {
                    body.mentions.forEach(function (mention) {
                        new Mention({ mention: mention, picture_id: picture.id })
                            .save();
                    })
                    body.tags.forEach(function (tag) {
                        new Tag({ tag: tag, picture_id: picture.id })
                            .save();
                    })
                    return callback(null, picture);
                })
        })
}

// DONE
userRepository.prototype.deletePicture = function (userId, pictureId, callback) {
    var that = this;
    var numberOfPictureInTotal;
    var numberOfPages;

    console.log(userId);
    console.log(pictureId);

    if (typeof perPage === 'undefined') { perPage = 20 };

    new Picture().where({ userId: userId, id: pictureId })
        .fetch({ withRelated: ["tags", "mentions"] }).then(function (picture) {
            if (picture) {
                //delete picture here
                picture.destroy().then(function () {
                    return callback(null, "No content");
                })
            }
            else {
                return callback({ statusCode: 400, message: "No such picture" }, null);
            }
        }).catch(function (err) {
            console.log(err);
            handleError(400, null, callback);
        });
}

// DONE
userRepository.prototype.getUserPicture = function (userId, pictureId, callback) {
    var that = this;
    var numberOfPictureInTotal;
    var numberOfPages;

    if (typeof perPage === 'undefined') { perPage = 20 };

    new Picture().where({ userId: userId, id: pictureId })
        .fetch({ withRelated: ["tags", "mentions"] }).then(function (picture) {
            if (picture) {
                var newCollectionJSON = that.databaseDTO.getPictureJSON(picture);
                return callback(null, newCollectionJSON);
            }
            else {
                return callback({ statusCode: 400, message: "No such picture" }, null);
            }
        }).catch(function (err) {
            console.log(err);
            handleError(400, null, callback);
        });
}

// NOT DONE; Problem. See below
userRepository.prototype.updateUserPicture = function (userId, pictureId, body, callback) {

    var that = this;
    var numberOfPictureInTotal;
    var numberOfPages;

    if (typeof perPage === 'undefined') { perPage = 20 };

    Picture
        .where({ userId: userId, id: pictureId })
        .fetch({ withRelated: ["tags", "mentions"] })
        .then(function (picture) {
            if (picture) {

                Mention.where({ picture_id: pictureId })
                    .fetchAll()
                    .then(function (mentions) {
                        mentions.forEach(function (mention) {
                            mention.destroy();
                        })
                    })
                    .then(function () {
                        body.mentions.forEach(function (mention) {
                            new Mention({ mention: mention, picture_id: pictureId })
                                .save()
                        })
                    })

                Tag.where({ picture_id: pictureId })
                    .fetchAll()
                    .then(function (tags) {
                        tags.forEach(function (tag) {
                            tag.destroy();
                        })
                    })
                    .then(function () {
                        body.tags.forEach(function (tag) {
                            new Tag({ tag: tag, picture_id: pictureId })
                                .save()
                        })
                    })


                // picture.save({ description: body.description })
                //     // .then(function (picture) {

                //     //     Picture
                //     //         .where({ userId: userId, id: pictureId })
                //     //         .fetch({ withRelated: ["tags", "mentions"] })
                //     //         .then(function (picture) {
                //     //             var formattedPictureJSON = that.databaseDTO.getPictureJSON(picture);
                //     //             return callback(null, formattedPictureJSON);
                //     //         })

                //     .catch(function (err) {
                //         console.log("ERROR: " + err);
                //         if (err.message === 'No Rows Updated') {
                //             // var formattedPictureJSON = that.databaseDTO.getPictureJSON(picture);
                //             // return callback(null, formattedPictureJSON);
                //             //return picture;
                //         }
                //     })

                return picture;
            }
            else {
                return callback({ statusCode: 400, message: "No such picture" }, null);
            }
        }).then(function (picture) {
            picture.save({ description: body.description })
                .then(function (picture) {
                    return;
                }).catch(function (err) {
                    //console.log("ERROR: " + err);
                    if (err.message === 'No Rows Updated') {
                        return;
                    }
                })
        }).then(function () {
            // TODO regler ça - Les tags et les mentions ont pas tout le temps de ce loader
            // avant que la picture soit réenvoyé au client. Le client recoit donc une partie
            // aléatoire des tags et des mentions
            Picture
                .where({ userId: userId, id: pictureId })
                .fetch({ withRelated: ["tags", "mentions"] })
                .then(function (picture) {
                    return that.databaseDTO.getPictureJSON(picture);
                })
                .then(function (formattedPictureJSON) {
                    return callback(null, formattedPictureJSON);
                })
        }).catch(function (err) {
            console.log(err);
            handleError(400, null, callback);
        });
}

var handleError = function (statusCode, body, callback) {
    var error = ErrorHandler.handleReturnCall(statusCode);
    return callback(error, JSON.parse(body));
};

module.exports = userRepository;