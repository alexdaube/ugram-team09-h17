const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook').Strategy;

// Create facebook strategy
const facebookOptions = {
    clientID: "CLIENT ID GOES HERE",
    clientSecret: "CLIENT SECRET GOES HERE",
    callbackURL: 'CALLBACK URL GOES HERE'
};

const facebookLogin = new FacebookStrategy(facebookOptions, (accessToken, refreshToken, profile, done) => {
    User.findOne({ ugramId: profile.id }, (err, user) => {
        if(err) {
            return done(err);
        }

        if (user) {
            return done(null, user);
        } else {
            const newUser = new User({
                ugramId: profile.id,
                email: profile.emails[0].value,
                //password,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                //phoneNumber,
                //pictureUrl,
                registrationDate: new Date()
            });

            newUser.save((err) => {
                if (err) {
                    return next(err);
                }

                // Respond to request indicating the user was created
                res.json({ token: tokenForUser(user) });
            });
        }
    });
});


// Create local strategy
const localOptions = {usernameField: 'ugramId'};
const localLogin = new LocalStrategy(localOptions, (id, password, done) => {
    // Verify this ugram id and password, call done with the user
    // if it is the correct ugram id and password
    // otherwise, call done with false
    User.findOne({ugramId: id}, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }

        // compare passwords - is `password` equal to user.password?
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false);
            }

            return done(null, user);
        });
    });
});

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    // See if the user ID in the payload exists in our database
    // If it does, call 'done' with that other
    // otherwise, call done without a user object
    User.findById(payload.sub, (err, user) => {
        if (err) {
            return done(err, false);
        }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
passport.use(facebookLogin);
