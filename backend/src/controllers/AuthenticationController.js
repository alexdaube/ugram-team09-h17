var jwtSimple = require('jwt-simple');
var request = require('request');
var User = require('../models/user');

function generateJsonWebToken(profile) {
    const timestamp = new Date().getTime();
    return jwtSimple.encode({sub: profile, iat: timestamp},
        global.configs.auth.jwt.secret);
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
    validateWithProvider(network, socialToken)
        .then(function (profile) {
            var date = new Date();
            new User({
                facebookId: profile.id,
                email: profile.email,
                userName: userName,
                registrationDate: date.valueOf()
            }).save().then(function (user) {
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