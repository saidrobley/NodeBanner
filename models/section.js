var mongoose = require("mongoose");

// SECTION -  Number
var sectionSchema = new mongoose.Schema({
   name: String,

});

module.exports = mongoose.model("Section", sectionSchema);