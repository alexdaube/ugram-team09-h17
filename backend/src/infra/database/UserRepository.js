var ErrorHandler = require("../../common/errors")
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

    new User()
        .fetchAll()
        .then(function (users) {
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
    new User({ userName: userId })
        .fetch()
        .then(function (user) {
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
                        .where({ userId: userId})
                        .where("url", "!=", "null")
                        //.where("url", "!=", "null")
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
                userId: userId,
                createdDate: new Date().getTime()
            })
                .save()
                .then(function (picture) {
                    if (body.mentions != "null") {
                        var mentions = body.mentions.split(",");
                        mentions.forEach(function (mention) {
                            new Mention({ mention: mention, picture_id: picture.id })
                                .save();
                        })
                    }
                    if (body.tags != "null") {
                        var tags = body.tags.split(",");
                        tags.forEach(function (tag) {
                            new Tag({ tag: tag, picture_id: picture.id })
                                .save();
                        })
                    }
                    return callback(null, picture);
                })
        })
}

userRepository.prototype.updatePictureUrl = function (pictureName, callback) {
    
    if(pictureName == null){
        return callback("Error"); 
    }
    
    var pictureNameBuffer = pictureName.split(".");
    
    new Picture({ id: pictureNameBuffer[0] })
        .fetch()
        .then(function (picture) {
            if(picture){
                picture
                .save({ url: "https://s3.amazonaws.com/glo-3102-team09/img/uploadedImg/" + pictureName })
                .then(function () {
                    return callback(null)
                }).catch(function (err) {
                    return callback(err);
                })
            }
            else {
                return callback("Error");
            }
        })
}

// DONE
userRepository.prototype.deletePicture = function (userId, pictureId, callback) {
    var that = this;
    var numberOfPictureInTotal;
    var numberOfPages;

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

    new Picture()
        .where({ userId: userId, id: pictureId })
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
                Mention
                    .where({ picture_id: pictureId })
                    .fetchAll()
                    .then(function (mentions) {
                        if (mentions) {
                            mentions.forEach(function (mention) {
                                mention.destroy();
                            })
                        }
                    })
                    .then(function () {
                        if (body.mentions) {
                            body.mentions.forEach(function (mention) {
                                new Mention({ mention: mention, picture_id: pictureId })
                                    .save();
                            })
                        }
                    })

                Tag
                    .where({ picture_id: pictureId })
                    .fetchAll()
                    .then(function (tags) {
                        if (tags) {
                            tags.forEach(function (tag) {
                                tag.destroy();
                            })
                        }
                    })
                    .then(function () {
                        if (body.tags) {
                            body.tags.forEach(function (tag) {
                                new Tag({ tag: tag, picture_id: pictureId })
                                    .save()
                            })
                        }
                    })
                return picture;
            }
            else {
                return callback({ statusCode: 400, message: "No such picture" }, null);
            }
        }).then(function (picture) {
            picture.save({
                description: body.description
            })
                .then(function (picture) {
                    return;
                }).catch(function (err) {
                    if (err.message === 'No Rows Updated') {
                        return;
                    }
                })
        }).then(function () {
            // TODO regler ça - Les tags et les mentions ont pas tout le temps de ce loader
            // avant que la picture soit réenvoyé au client. Le client recoit donc une partie
            // aléatoire des tags et des mentions.

            // TODO Aussi, je comprend pas encore mais defois, le fetch des Mentions et de tags
            // ont pas le temps de bien se faire et ils retournent un array vide.
            // Les mentions/tags sont donc pas supprimer et les autres sont ajoutés en plus
            // Ça semble arriver genre 1 fois sur 5 donc c'est pas si grave mais c'est quand même dérangeant
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