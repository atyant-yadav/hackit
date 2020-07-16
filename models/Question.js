const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    questionNo: {
        type: Number,
        required: true,
    },
    imageNo: {
        type: Number,
        required: true,
    },
    videoNo: {
        type: Number,
        required: true,
    },
    audioNo: {
        type: Number,
        required: true,
    },
    worldNumber: {
        type: Number,
        required: true,
    },
    worldName: {
        type: String,
        required: true
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

module.exports = mongoose.model('Question', QuestionSchema)