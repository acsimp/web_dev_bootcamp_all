var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
 
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

//adding methods to serialize and deserialize
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);