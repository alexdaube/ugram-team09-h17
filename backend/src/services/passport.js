var User = require('../models/user');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: global.configs.auth.jwt.secret
};

// Create JWT strategy
var jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    new User({facebookId: payload.sub.id}).fetch().then(function (user) {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});

// Tell passport to use this strategy
passport.use(jwtLogin);