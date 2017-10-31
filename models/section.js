var mongoose = require("mongoose");

// SECTION -  Number
var sectionSchema = new mongoose.Schema({
   name: Number
});

module.exports = mongoose.model("Section", sectionSchema);