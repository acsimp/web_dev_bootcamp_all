var express = require("express");
// with this we are swapping "app" for "router"
var router  = express.Router();
var Campground = require("../models/campground");

//INDEX - show all campgrounds
router.get("/", function(req, res){
    //get all campgrounds from the db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser: req.user});
        }
});
});

//CREATE - add new campground to DB
router.post("/", function(req, res){
    //get data from form and add to array
    var name  = req.body.name;
    var image = req.body.image;
    var desc  = req.body.description;

    //create new object
    var newCampground = {name: name, image: image, description: desc};
    //create a new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds
             res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID and populate with comment content not just id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//exporting "router"
module.exports = router;