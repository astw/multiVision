var mongoose = require("mongoose"),
    encrypt = require("../utilities/encryption");

module.exports = function(config){
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console,'connection error ....'));
    db.once("open", function callback(){
        console.log('multivision db opened');
    });
    var userSchema = mongoose.Schema({
        firstname: String,
        lastname: String,
        username: String,
        salt:String,
        hashed_pwd:String,
        roles:[String]
    });
    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return encrypt.hashPwd(this.salt,passwordToMatch) === this.hashed_pwd;
        }
    };
    var User = mongoose.model("User", userSchema);

    User.find({}).exec(function(err,collection){

        if(collection.length === 0){
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt,'shuhao');
            User.create({firstname:"Shuhao", lastname:"Wang", username :"shuhao", salt:salt, hashed_pwd:hash, roles:["admin"]});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt,'lily');
            User.create({firstname:"Lily", lastname:"Wang", username :"lily", salt:salt, hashed_pwd:hash, roles:[]});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt,'kevin');
            User.create({firstname:"Kevin", lastname:"Wang", username :"kevin", salt:salt, hashed_pwd:hash});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt,'shirley');
            User.create({firstname:"Shirley", lastname:"Wang", username :"shirley", salt:salt, hashed_pwd:hash});
        }
    });
}

// var messageSchema = mongoose.Schema({
//     message: String
// });
// var Message = mongoose.model("Message", messageSchema);
// var mongoMessage;
// Message.findOne().exec(function(err, messageDoc) {
//     mongoMessage = messageDoc.message;
// });

