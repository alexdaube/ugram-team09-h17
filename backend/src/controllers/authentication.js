const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

exports.signIn = (req, res, next) => {
    // User has already had their ugramId and password auth'd
    // We just need to give them a token
    res.send({ token: tokenForUser(req.user) });
};

exports.signup = (req, res, next) => {
    const {id, email, password, firstName, lastName, phoneNumber, pictureUrl} = req.body;

    if (!email || !password || !id) {
        return res.status(422).send({error: 'You must provide Ugram Id, email and password'});
    }

    // See if a user with the given Ugram id exists
    User.findOne({ ugramId: id }, (err, existingUser) => {
        if (err) { return next(err);}

        // If a user with this id does exists, return an error
        if (existingUser) {
            return res.status(422).send({error: 'Ugram id is in use'});
        }

        // If a user with a certain id does NOT exists, create and save user record
        const user = new User({
            ugramId: id,
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            pictureUrl,
            registrationDate: new Date()
        });

        user.save((err) => {
            if (err) {
                return next(err);
            }

            // Respond to request indicating the user was created
            res.json({ token: tokenForUser(user) });
        });

    });
};
