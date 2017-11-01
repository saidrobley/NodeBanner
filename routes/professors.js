var express    = require("express");
var router = express.Router();
var Professor = require("../models/professor");


// INDEX - show all professors page
router.get("/", function(req, res){
    // Get all professors from DB
    Professor.find({}, function(err, allProfessors){
        if(err){
            console.log(err);
        }else{
            res.render("professors/", {professors:allProfessors});
        }
    });

});

//CREATE - add new professor to DB
router.post("/professors", function(req, res){
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

//NEW - show form to create new professor
router.get("/new", function(req, res){
    res.render("professors/new") ;
});

// Show - shows more info about one professor
router.get("/:id", function (req, res) {
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







