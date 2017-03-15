var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');


module.exports = function (passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        new User({id: id}).fetch().then(function (user) {
            done(null, user);
        });
    });

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    var fbStrategy = global.configs.facebookAuth;

    fbStrategy.passReqToCallback = true;  // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    passport.use(new FacebookStrategy(fbStrategy,
        // facebook will send back the token and profile
        function (req, token, refreshToken, profile, done) {
            // asynchronous
            process.nextTick(function () {
                // check if the user is already logged in
                if (!req.user) {

                    // find the user in the database based on their facebook id
                    new User({facebookId: profile.id}).fetch().then(function (user) {
                        // if the user is found, then log them in
                        if (user) {
                            console.log("found user !");
                            return done(null, user); // user found, return that user
                        } else {
                            //if there is no user found with that facebook id, create them
                            console.log("You should be on signup page and asked for more info if needed");
                            console.log("creating new user");
                            if (req.cookies.newSignupUserName) {
                                new User({
                                    facebookId: profile.id,
                                    token: token,
                                    email: profile.emails[0].value,
                                    userName: req.cookies.newSignupUserName
                                }).save().then(function (savedUser) {
                                    return done(null, savedUser);
                                }).catch(function (err) {
                                    req.signupNeeded = true;
                                    req.signupError = new Error('User already exists');
                                    return done(null, new User({id: "nonExistentUser"}));
                                });

                            } else {
                                req.signupNeeded = true;
                                return done(null, new User({id: "nonExistentUser"}));
                            }
                        }
                    });
                }

                else {
                    console.log("user exists and logged in");
                    return done(null, req.user);
                }
            });
        }));

};