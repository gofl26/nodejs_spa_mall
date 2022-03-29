const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
    postsId: {
        type: Number,
        
    },
    commentss: {
        type: String,
        
    },
    userId: {
        type: String,
        
    },
    commentId: {
        type: String,
        
    },
});

module.exports = mongoose.model("Comments", commentsSchema);