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

//NEW - show form to create new professor
router.get("/professors/new", function(req, res){
    //res.render("professors/professors") ;
    res.render("professors/new")
});

// Show - shows more info about one professor
router.get("/professors/show/:id", function (req, res) {
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


//********************************************************************************************






//Sections New
router.get("/sections/new", function (req, res) {
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


//********************************************************************************************






router.listen(8000, function(){
    console.log("server is listening")
});
