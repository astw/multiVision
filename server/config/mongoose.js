var mongoose = require("mongoose"),
     crypto = require("crypto");

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
        hashed_pwd:String
    });
    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return hashPwd(this.salt,passwordToMatch) === this.hashed_pwd;
        }
    };
    var User = mongoose.model("User", userSchema);

    User.find({}).exec(function(err,collection){

        if(collection.length === 0){
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt,'shuhao');
            User.create({firstname:"Shuhao", lastname:"Wang", username :"shuhao", salt:salt, hashed_pwd:hash});

            salt = createSalt();
            hash = hashPwd(salt,'lily');
            User.create({firstname:"Lily", lastname:"Wang", username :"lily", salt:salt, hashed_pwd:hash});

            salt = createSalt();
            hash = hashPwd(salt,'kevin');
            User.create({firstname:"Kevin", lastname:"Wang", username :"kevin", salt:salt, hashed_pwd:hash});

            salt = createSalt();
            hash = hashPwd(salt,'shirley');
            User.create({firstname:"Shirley", lastname:"Wang", username :"shirley", salt:salt, hashed_pwd:hash});
        }
    });
}

function createSalt(){
    return crypto.randomBytes(128).toString("base64");
}

function hashPwd(salt, pwd){
    var hmac = crypto.createHmac("sha1", salt);
    return hmac.update(pwd).digest('hex');
}

// var messageSchema = mongoose.Schema({
//     message: String
// });
// var Message = mongoose.model("Message", messageSchema);
// var mongoMessage;
// Message.findOne().exec(function(err, messageDoc) {
//     mongoMessage = messageDoc.message;
// });

