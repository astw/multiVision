
var path = require("path");
var rootPath = path.normalize(__dirname + "/../../");

console.log(rootPath);

module.exports = {
    development :{
        db:"mongodb://localhost/MultiVision",
        rootPath: rootPath,
        port:process.env.PORT || 3030
    },

    production:{
        db:"mongodb://nodedev:multivision@ds051720.mongolab.com:51720/multivision",
        rootPath : rootPath,
        port:process.env.PORT || 80
    }
};