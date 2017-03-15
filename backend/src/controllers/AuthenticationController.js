exports.facebookLogin = function (req, res) {
    req.session.newSignupUserName = null;
    if (req.signupNeeded) {
        var resData = {signupNeeded: true};
        if (req.signupError) {
            resData.signupError = req.signupError.message
        }
        res.status(200).send(resData);
    } else {
        console.log("Succes");
        global.user = req.user;
        res.status(200).send({
            message: "You should see profile page here",
            user: req.user
        });
    }
};