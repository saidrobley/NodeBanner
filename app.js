var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Section    = require("./models/section"),
    Professor =  require("./models/professor");

mongoose.connect("mongodb://localhost/banner");

app.set("view engine", "ejs");


/* Professor.create(
    {
        name: "Steve Beaty",
    }, function(err, professor){
        if(err){
            console.log(err);
        }else{
            console.log("NEWLY CREATED PROFESSOR: ");
            console.log(professor);
        }

    });
*/









app.get("/", function(req, res){
   res.render("home.ejs");
});



// professor page
app.get("/professors", function(req, res){
    // Get all professors from DB
    Professor.find({}, function(err, allProfessors){
        if(err){
            console.log(err);
        }else{
            res.render("professors", {professors:allProfessors});
        }
    });

});

app.post("/professors", function(req, res){
    // get data from form and add to the DB
    var name = req.body.name;
    var newProfessor = {name};
    // Create a new professor and save it to DB
    Professor.create(newProfessor, function (err, newlyCreated) {
        if(err){
            console.log(err);
        }else{
            //redirect back to professors page
            res.redirect("/professors");
        }

    });

});

app.get("/professors/new", function(req, res){
   res.render("new") ;
});

// Show - shows more info about one professor
app.get("/professors/:id", function (req, res) {
    //Professor.findById(req.params.id).populate("sections").exec( function (err, foundProfessor) {
    Professor.findById(req.params.id, function(err, foundProfessor){
       if(err){
           console.log(err);
       } else{
           // render show template with that professor
           res.render("show", {professor: foundProfessor});
       }
    });

});












app.get("/courses", function(req, res){
    res.render("courses.ejs")
});

app.get("/sections", function(req, res){
    res.render("sections.ejs");
});

app.listen(5000, function(){
    console.log("server is listening")
});