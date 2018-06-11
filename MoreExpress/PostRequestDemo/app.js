var express = require("express");
var app = express();
//enables access to body properties passed by req.body.PROPERTY by turning it into javascript object
var bodyParser = require("body-parser");

//standard line to use body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//create array of friends
var friends = ["Andrew", "Emma", "Innes"];

app.get("/", function(req, res){
    res.render("home");
});

//our first post route!!!
app.post("/addfriend", function(req, res){
    var newFriend = req.body.newfriend;
    //push newfriend into (add to) friends array
    friends.push(newFriend);
    //redirects back to friends page
   res.redirect("/friends"); 
});

app.get("/friends", function(req, res){ 
    //pass in the friends object
    res.render("friends", {friends: friends}); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Sever has started");
});