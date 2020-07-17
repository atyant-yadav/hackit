const mongoose = require('mongoose')

const WorldsSchema = new mongoose.Schema({
    worldName: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    worldNumber: {
        type: Number,
        required: true,
    },
    maxQues: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('World', WorldsSchema)