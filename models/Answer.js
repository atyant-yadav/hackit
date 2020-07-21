const mongoose = require('mongoose')

const AnswersSchema = new mongoose.Schema({
    worldNumber: {
        type: Number,
        required: true,
    },
    questionNo: {
        type: Number,
        required: true,
    },
    ans: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },
    ansCount: {
        type: Number,
        default: 1,
        required: true,
    },
    penalty: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Answer', AnswersSchema)