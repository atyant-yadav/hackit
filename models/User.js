const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    worldNumber: {
        type: Number,
        default: 1,
    },
    questionNumber: {
        type: Number,
        default: 1,
    },
    questionSolved: {
        type: Number,
        default: 0,
    },
    worldSolved: {
        type: Number,
        default: 1,
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    score: {
        type: Number,
        default: 0,
    },
    penalty: {
        type: Number,
        default: 0,
    },
    timeQues:{
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)