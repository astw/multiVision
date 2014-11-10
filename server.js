var express = require("express");

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log("environment:" + env);
var app = express();

var config = require("./server/config/config")[env];

require("./server/config/express")(app, config);
require("./server/config/mongoose")(config);
require("./server/config/passport")();
require("./server/config/routes")(app);

app.use(function (req, res, next) {
    console.log(req.user);
    next();
});

app.listen(config.port);
console.log("Listening on port " + config.port + "....");
console.log("RootPath " + config.rootPath);
