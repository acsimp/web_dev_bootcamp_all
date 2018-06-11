var mongoose = require("mongoose");

// POST - title, content
var postSchema = new mongoose.Schema({
   title: String,
   content: String
});
//this will export this model out to main js
module.exports = mongoose.model("Post", postSchema);