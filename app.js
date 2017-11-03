var express     = require("express"),
    router      = express.Router();
    router         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Section     = require("./models/section");
    Professor  = require("./models/professor"),

mongoose.connect("mongodb://localhost/banner");
router.use(bodyParser.urlencoded({extended: true}))
router.set("view engine", "ejs");

router.get("/", function (req, res) {
   res.render("home.ejs");
});


// INDEX - show all professors page
router.get("/professors", function(req, res){
    // Get all professors from DB
    Professor.find({}, function(err, allProfessors){
        if(err){
            console.log(err);
        }else{
            // render the location in the views.
            res.render("professors/index", {professors:allProfessors});
        }
    });

});

//CREATE - add new professor to DB
router.post("/professors", function(req, res){
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

// Show - shows more info about one professor
router.get("/professors/show/:id", function (req, res) {
    //Professor.findById(req.params.id).populate("sections").exec( function (err, foundProfessor) {
    Professor.findById(req.params.id).populate("sections").exec(function(err, foundProfessor){
        if(err){
            console.log(err);
        } else{
            // render show template with that professor
            res.render("professors/show", {prof: foundProfessor});
        }
    });

});

// DESTROY - professor
router.get("/professors/delete/:id", function (req, res) {
   Professor.findByIdAndRemove(req.params.id, function (err) {
     if(err){
         res.redirect("/professors");
     }else{
         res.redirect("/professors");
     }
   });
});


//NEW - show form to create new professor
router.get("/professors/new", function(req, res){
    //res.render("professors/professors") ;
    res.render("professors/new")
});


//SHOW
router.get("/professors/:id", function(req, res){
    //find campground with provided ID
    Professor.findById(req.params.id).populate("sections").exec(function(err, foundProfessor){
        if(err){
            console.log(err);
        } else {
            console.log(foundProfessor);
            //render show template with that campground
            res.render("professors/show", {prof: foundProfessor});
        }
    });
});



//********************************************************************************************

// ==================
// SECTIONS ROUTES
// ==================

// NEW ROUTE
//NEW ROUTE
router.get("/professors/:id/sections/new", function(req, res){
    //find campground by id
    Professor.findById(req.params.id, function(err, professor){
        if(err){
            console.log(err);
        } else {
            res.render("sections/new", {prof: professor});
        }
    });
});

//POST ROUTE
router.post("/professors/:id/sections", function(req, res){
    //lookup campground using ID
    Professor.findById(req.params.id, function(err, professor){
        if(err){
            console.log(err);
            res.redirect("/professors");
        } else {
            //create new comment
            Section.create(req.body.section, function(err, section){
                if(err){
                    console.log(err);
                } else {
                    //connect new comment to campground
                    professor.sections.push(section);
                    professor.save();
                    //redirect to Campground SHOW page
                    res.redirect("/professors/" + professor._id);
                }
            });
        }
    });
});



/*

// INDEX - show all professors page
router.get("/sections", function(req, res){
    // Get all professors from DB
    Professor.find({}, function(err, allProfessors){
        if(err){
            console.log(err);
        }else{
            // render the location in the views.
            res.render("sections/new", {professors:allProfessors});
        }
    });

});

//
router.get("/sections/new/:id", function (req, res) {

});

/*
router.get("/sections/new", function (req, res) {
   res.render("sections/new");
});

//Sections New
router.get("/professors/:id/sections/new", function (req, res) {
    // find professor by id
    Professor.findById(req.params.id, function (err, professor) {
        if(err){
            console.log(err);
        }else{
            res.render("sections/new", {professor: professor});
        }
    })
});
*/

/*

//POST ROUTE
router.post("/sections/submitted", function (req, res) {
    //lookup professor using ID
   // var s = req.params.name;
    console.log(req.body.name);
    Professor.findById(req.body.profID, function(err, professor){
        if(err){
            console.log(err);
            res.redirect("/professors")
        }else{
            // create new section
            Section.create(req.params.name, function(err, section){
                if(err){
                    console.log(err);
                }else{
                    section.name = req.body.name;
                    professor.sections.push(section.name);
                    section.save();
                   // var name = req.body.name;
                   // var sectionName = {name};
                    console.log("section name " + section.name);
                  // section.save();
                   professor.sections.push(section);
                  //  professor.sections.push(section.name);
                  //  professor.sections.push(section._id.name);
                    console.log("save the data = " + section.name);
                   professor.save();
                   console.log(section);
                   // professor.save();
                    res.redirect("/professors/show/" + professor._id);
                }

            });
        }

    });
});
*/

//********************************************************************************************






router.listen(8000, function(){
    console.log("server is listening")
});
