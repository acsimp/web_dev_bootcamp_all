var express = require("express");
// with this we are swapping "app" for "router"
//mergeParams from campgrounds and comments so that inside comment route we can access :id
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");


//NEW COMMENT
//isLoggedIn function (created at the bottom) prevents user for creating a comment without loggin in
router.get("/new", isLoggedIn, function(req, res){
    //find campground by ID 
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
});

// CREATE COMMENT
//isLoggedIn prevents comments from Postman for example without a login
router.post("/", isLoggedIn, function(req, res){
    //look up campground with id
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       }else{
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               }else{
                   //add username and id to comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   //save comment
                   comment.save();
                   campground.comments.push(comment._id);
                   campground.save();
                   res.redirect("/campgrounds/" + campground._id);
               }
           });
       }
   });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;