var  mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;

var User = mongoose.model("User");

module.exports = function() {

    passport.use(new LocalStrategy(
        function (username, password, done) {
            console.log("began to check in db");
            User.findOne({username: username}).exec(function (err, user) {
                if (user && user.authenticate(password)) {
                    console.log("found this user");
                    return done(null, user);
                }
                else {
                    console.log("user is not found");
                    return(done, false);
                }
            })
        }
    ));

    passport.serializeUser(function (user, done) {
        if (user) {
            console.log("serialize user");
            done(null, user._id);
        }
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({_id: id}).exec(function (err, user) {
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    });
}