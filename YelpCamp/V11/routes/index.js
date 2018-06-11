var express = require("express");
// with this we are swapping "app" for "router"
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");


// ROOT ROUTE
router.get("/", function(req, res){
    res.render("landing");
});



//==============
// AUTH ROUTES
//==============

//show register form
router.get("/register", function(req, res){
    res.render("register");
});


//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp" + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//LOGIN FORM
router.get("/login", function(req, res){
    res.render("login");
});

//LOGIN logic (with middleware)
router.post("/login",passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login" 
    }), function(req, res){
        //this callback doesn't do anything, could be removed. Here to illustrate middleware.
});

//LOGOUT ROUTE
router.get("/logout", function(req, res){
    //comes from passport package
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});


module.exports = router;