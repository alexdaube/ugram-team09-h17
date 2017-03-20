var jwtSimple = require('jwt-simple');
var request = require('request');
var User = require('../models/user');

function generateJsonWebToken(profile) {
    const timestamp = new Date().getTime();
    return jwtSimple.encode({sub: profile, iat: timestamp},
        global.configs.auth.jwt.secret);
}

function validateUserName(userName) {
    var validation = {};
    if (userName === "" || userName === null) {
        validation.isValid = false;
        validation.message = "User name cannot be empty!";
        return validation;
    }
    if(userName.length >= 30) {
        validation.isValid = false;
        validation.message = "User name must be shorter than 30 characters!";
        return validation;
    }
    if(!(/^[a-zA-Z0-9_-]*$/.test(userName))) {
        validation.isValid = false;
        validation.message = "User name cannot contain anything other than numbers, letters, underscores or dashes. It must not have any spaces either!";
        return validation;
    }
    validation.isValid = true;
    return validation;
}

var providers = {
    facebook: {
        url: global.configs.auth.facebook.profileURL
    }
};

function validateWithProvider(network, socialToken) {
    return new Promise(function (resolve, reject) {
        request({
                url: providers[network].url,
                qs: {access_token: socialToken}
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(JSON.parse(body));
                } else {
                    reject(JSON.parse(body));
                }
            }
        );
    });
}

exports.signup = function (req, res, next) {
    var network = req.body.network;
    var socialToken = req.body.socialToken;
    var userName = req.body.userName;

    var userNameValidation = validateUserName(userName);
    if (!userNameValidation.isValid) {
        return res.status(400).send({signupError: userNameValidation.message});
    }

    validateWithProvider(network, socialToken)
        .then(function (profile) {
            profile.userName = userName;
            var date = new Date().getTime();
            new User({
                firstName: profile.first_name,
                lastName: profile.last_name,
                facebookId: profile.id,
                email: profile.email,
                userName: userName,
                pictureUrl: profile.picture.data.url,
                registrationDate: date
            }).save(null, {method: 'insert'}).then(function (user) {
                return res.send({token: generateJsonWebToken(profile)});
            }).catch(function (err) {
                return res.status(400).send({signupError: "User name already exists. Choose another one!"});
            });
        })
        .catch(function (err) {
            return res.status(400).send({
                providerValidationError: true
            });
        });
};

exports.login = function (req, res, next) {
    var network = req.body.network;
    var socialToken = req.body.socialToken;

    validateWithProvider(network, socialToken).then(function (profile) {
        new User({facebookId: profile.id}).fetch().then(function (user) {
            if (user) {
                profile.userName = user.attributes.userName;
                return res.send({token: generateJsonWebToken(profile)});
            } else {
                return res.send({signupNeeded: true});
            }
        });

    }).catch(function (err) {
        return res.status(400).send({
            providerValidationError: true
        });
    });
};