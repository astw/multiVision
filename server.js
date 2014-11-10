var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log("environment:" + env);
var app = express();

var config = require("./server/config/config")[env];

require("./server/config/express")(app, config);
require("./server/config/mongoose")(config);

var User = mongoose.model("User");
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

app.use(function(req,res, next){
    console.log(req.user);
    next();
});

passport.serializeUser(function(user,done){
    if(user) {
        console.log("serialize user");
        done(null, user._id);
    }
});

passport.deserializeUser(function(id, done){
    User.findOne({_id : id}).exec(function(err,user){
        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    })
});

require("./server/config/routes")(app);

app.listen(config.port);
console.log("Listening on port " + config.port + "....");
console.log("RootPath " + config.rootPath);
