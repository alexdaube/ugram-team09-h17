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
        // Send a GET request to Facebook with the token as query string
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
            // if profile, try to create new user
            var date = new Date();
            new User({
                facebookId: profile.id,
                // To be checked => emails returned by profile obj
                email: profile.email,
                userName: userName,
                registrationDate: date.valueOf()
            }).save().then(function (user) {
                // if the user is created return the token
                // Make use of user later
                return res.send({token: generateJsonWebToken(profile)});
            }).catch(function (err) {
                // The user name is already being user
                // Return some error
                return res.status(400).send({signupError: "User name already exists"});
            });
        })
        .catch(function (err) {
            return res.status(400).send({
                providerValidationError: true
                // providerValidationErrorMessage: 'Failed! ' + err.error.message
            });
        });
};

exports.authenticate = function (req, res, next) {
    var network = req.body.network;
    var socialToken = req.body.socialToken;

    validateWithProvider(network, socialToken).then(function (profile) {
        // Return the user data we got from Facebook
        //res.send('Authenticated as: ' + profile.id);

        // user is valid with provider
        new User({facebookId: profile.id}).fetch().then(function (user) {
            // if the user exist in ugram
            if (user) {
                // Make use of user later
                return res.send({token: generateJsonWebToken(profile)});
            } else {
                // If the user does not exists tell ui to do register
                return res.send({signupNeeded: true});
            }
        });

    }).catch(function (err) {
        // Validating the provider failed
        // Tell ui redirect user to facebook signup page

        return res.status(400).send({
            providerValidationError: true
            // providerValidationErrorMessage: 'Failed! ' + err.error.message
        });
    });
};