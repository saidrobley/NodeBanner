var mongoose = require("mongoose");

// SECTION -  Number
var sectionSchema = new mongoose.Schema({
   number: String

});

module.exports = mongoose.model("Section", sectionSchema);