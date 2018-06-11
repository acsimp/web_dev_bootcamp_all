var express = require("express");
var app = express();

// index page
app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});

// animal speak routes

app.get("/speak/:animal", function(req, res){
    //a javascript object of sounds
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof",
        cat: "Meow",
        goldfish: "..."
    }
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
   
    // if (animal === "pig"){
    //     sound = "Oink"; 
    // } else if(animal === "cow"){
    //     sound = "Moo";
    // } 
    
    //if we don't have sound for animal in our database
    if (!sound){
        res.send("Sorry, we do not have " + animal + " in our database.")
    } else {
    res.send("The " + animal + " says '" + sound + "'");
    }
});

// message repeat route //remember number starts a string
app.get("/repeat/:message/:times", function(req, res) {
    var message = req.params.message;
//remember times starts a string
    var times = Number(req.params.times);
    var result = "";
    
    for(var i = 0; i < times; i++){
        result += message  + " ";
    }
    res.send(result);
    //res.send("Message: " + message + " Times: " + times);
});

app.get("*", function(req, res){
    res.send("Sorry, page not found...What are you doing with your life?");
});

// listening for port - this is standard code, 
// a local envirnment might have a localhost of say 3000
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("now serving your app");
});