var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var campgrounds =[
        {name: "Site 1", image: "https://images.unsplash.com/photo-1495685288924-ce05d1036b24?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9c18e42f88d973bbdf030b7ec3544e39&auto=format&fit=crop&w=1050&q=80"},
        {name: "Site 2", image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6354eedc19ac4f3d9080c74963489da4&auto=format&fit=crop&w=1052&q=80"},
        {name: "Site 3", image: "https://images.unsplash.com/photo-1515876305430-f06edab8282a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=eeb21c7f2a9cc2ca52a818ddd12944fe&auto=format&fit=crop&w=1050&q=80"},
        {name: "Site 1", image: "https://images.unsplash.com/photo-1495685288924-ce05d1036b24?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9c18e42f88d973bbdf030b7ec3544e39&auto=format&fit=crop&w=1050&q=80"},
        {name: "Site 2", image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6354eedc19ac4f3d9080c74963489da4&auto=format&fit=crop&w=1052&q=80"},
        {name: "Site 3", image: "https://images.unsplash.com/photo-1515876305430-f06edab8282a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=eeb21c7f2a9cc2ca52a818ddd12944fe&auto=format&fit=crop&w=1050&q=80"},
        {name: "Site 1", image: "https://images.unsplash.com/photo-1495685288924-ce05d1036b24?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9c18e42f88d973bbdf030b7ec3544e39&auto=format&fit=crop&w=1050&q=80"},
        {name: "Site 2", image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6354eedc19ac4f3d9080c74963489da4&auto=format&fit=crop&w=1052&q=80"},
        {name: "Site 3", image: "https://images.unsplash.com/photo-1515876305430-f06edab8282a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=eeb21c7f2a9cc2ca52a818ddd12944fe&auto=format&fit=crop&w=1050&q=80"}
    ];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    //get data from form and add to array
    var name = req.body.name;
    var image= req.body.image;
    //push data to array
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    //redirect back
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

//tell express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started!");
});