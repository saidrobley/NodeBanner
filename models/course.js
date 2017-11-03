var mongoose = require("mongoose");
// SCHEMA SETUP
var courseSchema = new mongoose.Schema({
    name: String,
    sections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }
    ]
});

module.exports = mongoose.model("Course", courseSchema);