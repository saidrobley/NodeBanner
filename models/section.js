var mongoose = require("mongoose");

// SECTION -  Number
var sectionSchema = new mongoose.Schema({
   number: String,
    professor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Professor"
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }

});

module.exports = mongoose.model("Section", sectionSchema);