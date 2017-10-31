var mongoose = require("mongoose");
// SCHEMA SETUP
var professorSchema = new mongoose.Schema({
    name: String,

});

module.exports = mongoose.model("Professor", professorSchema);