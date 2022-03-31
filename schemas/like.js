const mongoose = require('mongoose');

const likesSchema = mongoose.Schema({
    postsId: {
        type: Number,
    },
    userId: {
        type: String,
    },
});

module.exports = mongoose.model('Likes', likesSchema);
