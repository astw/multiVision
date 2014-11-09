var express = require("express"),
    stylus = require("stylus"),
    logger = require("morgan"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
    return stylus(str).set("filename", path);
}

app.set("views", __dirname + "/server/views");
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(stylus.middleware({
    src: __dirname + "/public",
    compile: compile
}));

app.use(express.static(__dirname + "/public"));

if (env == 'development') {
    mongoose.connect("mongodb://localhost/MultiVision")
} else {
    mongoose.connect("mongodb://nodedev:multivision@ds051720.mongolab.com:51720/multivision");
}


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error.'));
db.open('open', function callback() {
    console.log("MultiVision db is opened");
});

// var messageSchema = mongoose.Schema({
//     message: String
// });
// var Message = mongoose.model("Message", messageSchema);
// var mongoMessage;
// Message.findOne().exec(function(err, messageDoc) {
//     mongoMessage = messageDoc.message;
// });


app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params[0]);
});


app.get("*", function(req, res) {
    res.render("index");
    //res.render("index", {
    //    mongoMessage: mongoMessage
    //});
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log("Listening on port " + port + "....");
