var mongoose = require("mongoose"),
    encrypt = require("../utilities/encryption");

var userSchema = mongoose.Schema({
    firstname: {type:String,required:"{PATH} is required!"},
    lastname: {type:String,required:"{PATH} is required!"},
    username: {type:String,required:"{PATH} is required!", unique:true},
    salt:{type:String,required:"{PATH} is required!"},
    hashed_pwd:{type:String,required:"{PATH} is required!"},
    roles:[String]
});
userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return encrypt.hashPwd(this.salt,passwordToMatch) === this.hashed_pwd;
    }
};
var User = mongoose.model("User", userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'shuhao');
            User.create({firstname: "Shuhao", lastname: "Wang", username: "shuhao", salt: salt, hashed_pwd: hash, roles: ["admin"]});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'lily');
            User.create({firstname: "Lily", lastname: "Wang", username: "lily", salt: salt, hashed_pwd: hash, roles: []});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'kevin');
            User.create({firstname: "Kevin", lastname: "Wang", username: "kevin", salt: salt, hashed_pwd: hash});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'shirley');
            User.create({firstname: "Shirley", lastname: "Wang", username: "shirley", salt: salt, hashed_pwd: hash});
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;