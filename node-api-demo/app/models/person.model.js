const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    name: String,
    role: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Person', NoteSchema);