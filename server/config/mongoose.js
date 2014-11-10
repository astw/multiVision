var mongoose = require("mongoose");

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
        username: String
    });

    var User = mongoose.model("User", userSchema);

    User.find({}).exec(function(err,collection){

        if(collection.length === 0){
            User.create({firstname:"Shuhao", lastname:"Wang", username :"shuhao"});
            User.create({firstname:"Lily", lastname:"Wang", username :"lily"});
            User.create({firstname:"Kevin", lastname:"Wang", username :"kevin"});
            User.create({firstname:"Shirley", lastname:"Wang", username :"shireley"});
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

