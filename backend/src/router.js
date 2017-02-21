const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// To propect certain url -- Will need to authenticate token to access
const requireAuth = passport.authenticate('jwt', {session: false});

// To sign in with ugram credentials
const requireLocalSignIn = passport.authenticate('local', { session: false });

// To sign in with Facebook credentials
const requireFacebookSignIn = passport.authenticate('facebook', { session: false });

module.exports = function(app) {
    app.get('/', requireAuth, (req, res) => {
        res.send({message: 'Super secret code is ABC'});
    });
    app.post('/facebook-signin', requireLocalSignIn, Authentication.signIn);
    app.post('/local-signin', requireFacebookSignIn, Authentication.signIn);
    app.post('/signup', Authentication.signup);
};
