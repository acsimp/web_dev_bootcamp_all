
var express = require("express");
var app = express();


// go to / (index) you get Hi there
app.get("/", function(req, res){
    res.send("Hi there!");
});

// go to /bye = goodbye
app.get("/bye", function(req, res){
    res.send("Goodbye!");
});

// go to /dog = meow
app.get("/dog", function(req, res){
    console.log("someone made a request");
    res.send("meow!");
});

// go to any route that is of the pattern /r/(something)
app.get("/r/:subredditName", function(req, res){
    var subreddit = req.params.subredditName;
    res.send("Welcome to the " + subreddit.toUpperCase() + " subreddit!");
});

// go to any route that is of the pattern /r/(something)/comments/(something)/(somthing)
app.get("/r/:subredditName/comments/:id/:title/", function(req, res){
    // console.log(req.params);
    // res.send("Welcome to the comments page!");
    var subreddit = req.params.subredditName;
    var id = req.params.id;
    var title = req.params.title;
    res.send("Welcome to the " + subreddit.toUpperCase() + "/COMMENTS/" + id.toUpperCase() + "/" + title.toUpperCase() + "/ subreddit!");
})

// star is for any webpage or route a user tries to access that isn't defined - kind of an error page
app.get("*", function(req, res){
    res.send("you are a star!");
});

//tell express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});