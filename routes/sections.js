var express = require("express");
var router = express.Router({mergeParams: true});
var Professor = require("../models/professor");
var Section = require("../models/section");


//Sections New
router.get("/new", function (req, res) {
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
router.post("/", function (req, res) {
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



