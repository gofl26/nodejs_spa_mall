const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    postsId: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    date: {
        type: String,
    },
    pw: {
        type: String,
    },
    like: {
        type: Number,
    },
});

module.exports = mongoose.model('Posts', postsSchema);
