const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    // postsId: {
    //     type: Number,
    //     required: true,
    //     unique: true,
    // },
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

postsSchema.virtual('postsId').get(function () {
    return this._id.toHexString();
});

postsSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Posts', postsSchema);
