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
    }
})

module.exports = mongoose.model('Answer', AnswersSchema)