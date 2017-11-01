var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Section     = require("./models/section");
    Professor  = require("./models/professor"),

mongoose.connect("mongodb://localhost/banner");
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");

app.get("/", function (req, res) {
   res.render("home.ejs");
});


// INDEX - show all professors page
app.get("/professors", function(req, res){
    // Get all professors from DB
    Professor.find({}, function(err, allProfessors){
        if(err){
            console.log(err);
        }else{
            // render the location in the views.
            res.render("professors/professors", {professors:allProfessors});
        }
    });

});

//CREATE - add new professor to DB
app.post("/professors", function(req, res){
    // get data from form and add to the DB
    var name = req.body.name;
    var newProfessor = {name: name};
   // var newProfessor = name;
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

//NEW - show form to create new professor
app.get("/professors/new", function(req, res){
    //res.render("professors/professors") ;
    res.render("professors/new")
});

// Show - shows more info about one professor
app.get("/professors/:id", function (req, res) {
    //Professor.findById(req.params.id).populate("sections").exec( function (err, foundProfessor) {
    Professor.findById(req.params.id).populate("sections").exec(function(err, foundProfessor){
        if(err){
            console.log(err);
        } else{
            // render show template with that professor
            res.render("professors/show", {professor: foundProfessor});
        }
    });

});
//********************************************************************************************


//Sections New
app.get("/sections/new", function (req, res) {
    // find professor by id
    console.log(req.params.id);
    Professor.findById(req.params.id, function (err, professor) {
        if(err){
            console.log(err);
        }else{
            res.render("sections/new", {professor: professor});
        }
    })
});

//Sections Create
app.post("/", function (req, res) {
    //lookup professor using ID
    Professor.findById(req.params.id, function(err, professor){
        if(err){
            console.log(err)
            res.redirect("/professors")
        }else{
            Section.create(req.body.comment, function(err, section){
                if(err){
                    console.log(err);
                }else{
                    section.name.id = req.professor._id;
                    section.save();
                    console.log(section);

                }
            });
        }
    });
});


//********************************************************************************************






app.listen(8000, function(){
    console.log("server is listening")
});
