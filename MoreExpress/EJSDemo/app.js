//standard require to include express
var express = require("express");
var app = express();

//serve this public directory o that we can use/find sytle sheet
app.use(express.static("public"));
//so that we don't have to call up home.ejs, we can just call home - applies to all unless stated
app.set("view engine", "ejs");

//homepage route
app.get("/", function(req, res){
    res.render("home");
});

// fall in love route
app.get("/love/:thing", function(req, res){
   var thing = req.params.thing; 
   
   res.render("love", {thingVar: thing});
});

//posts route
app.get("/posts", function(req, res){
   var posts = [
      {title: "Post1", author: "Susy"},
      {title: "Post2", author: "Brad"},
      {title: "Post3", author: "Iain"}
      ];
      
      res.render("posts", {posts: posts});
      
});
//standard listening for cloud 9 port and IP
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("server is listening");
});