var express = require("express");
// with this we are swapping "app" for "router"
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

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
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
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
    res.redirect("/campgrounds");
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;