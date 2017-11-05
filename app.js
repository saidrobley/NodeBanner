var express                 = require("express"),
    router                  = express.Router(),
    router                  = express(),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    Section                 = require("./models/section"),
    Professor               = require("./models/professor"),
    Course                  = require("./models/course"),
    User                    = require("./models/user");

mongoose.connect("mongodb://localhost/banner");
router.use(require("express-session")({
    //secret will be use to encode and decode session
    secret: "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
    resave: false,
    saveUninitialized: false
}));
router.use(bodyParser.urlencoded({extended: true}))
router.set("view engine", "ejs");

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



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
            res.redirect("/professors/");
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
// ==============================
// COURSES ROUTES
// ==============================

router.get("/courses", function (req, res) {
   //get all courses from DB
    Course.find({}, function (err, allCourses) {
       if(err){
           console.log(err);
       }else{
           res.render("courses/index", {courses: allCourses});
       }

    });

});

router.get("/courses/new", function (req, res) {
    // render views courses/new
    res.render("courses/new");
});

// routes for POST
router.post("/courses", function (req, res) {
   // get data from the form and add to DB
    var name = req.body.name;
    var newCourse = {name: name};
    Course.create(newCourse, function (err, newlyCreated) {
       if(err){
           console.log(err);
       } else{
           res.redirect("/courses")
       }
    });
});

// DELETE - course
router.get("/courses/delete/:id", function (req, res) {
    Course.findByIdAndRemove(req.params.id, function (err) {
        if(err){
            res.redirect("/courses");
        }else{
            res.redirect("/courses");
        }
    });
});


//SHOW
router.get("/courses/show/:id", function(req, res){
    //find course with provided ID
    Course.findById(req.params.id).populate("sections").exec(function(err, foundCourse){
        if(err){
            console.log(err);
        } else {
            console.log(foundCourse);
            //render show template with that course
            res.render("courses/show", {course: foundCourse});
        }
    });
});
//SHOW






/*
router.get("/courses/show/:id", function(req, res){
    //find course with provided ID
    Course.findById(req.params.id, function(err, foundCourse){
        if(err){
            console.log(err);
        } else {
            console.log(foundCourse);
            //render show template with that course
            res.render("courses/show", {course: foundCourse});
        }
    });
}); */
/*/ INDEX - show all professors page
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

});*/
//********************************************************************************************

// ==================
// SECTIONS ROUTES
// ==================


router.get("/sections", function (req, res) {
    //get all courses from DB
    Professor.find({}, function (err, allProfessors) {
        if(err){
            console.log(err);
        }else{
            res.render("sections/index", {professors: allProfessors});
        }

    });

});


// NEW ROUTE
router.get("/sections/new", function (req, res) {
    Professor.find({}, function (err, allprofessors) {
       if(err){
           console.log(err);
       } else{
           Course.find({}, function (err, allcourses) {
              if(err){
                  console.log(err);
              } else{
                  res.render("sections/new", {professors: allprofessors, courses: allcourses})
              }
           });
       }
    });
});

router.post("/sections/new/submitted/:id", function (req, res) {
   var professor_id = req.body.professor_id;
   var course_id = req.body.course_id;
   var sectionName = req.body.section_name;
  // var sectionName = {sectionName: sectionName}
    console.log(professor_id);
    console.log(course_id);
    console.log(sectionName);
    Professor.findById(professor_id, function (err, foundProf) {
       if(err){
           console.log(err);
       } else{
           Course.findById(course_id, function (err, foundCourse) {
              if(err){
                  console.log(err);
              } else{
                  console.log("found prof " + foundProf);
                  // create new section
                  var section = {number: sectionName, professor: foundProf, course: foundCourse};
                  Section.create(section, function (err, section) {
                     if(err){
                         console.log(err);
                     } else{
                         // connect new section to professor
                         foundProf.sections.push(section);
                         foundProf.save();
                         // connect new section to course
                         foundCourse.sections.push(section);
                         foundCourse.save();
                         res.redirect("/sections/new");
                     }
                  });
              }
           });
       }
    });

});

router.get("/sections/show", function (req, res) {
   Section.find({}, function (err, sections) {
       if(err){
           console.log(err);
       }else {
            res.render("sections/show", {sections: sections});
       }
   });

});


















//NEW ROUTE
/*
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
