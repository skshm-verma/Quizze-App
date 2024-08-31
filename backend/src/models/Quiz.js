const mongoose = require('mongoose');
const moment = require('moment');
const QuizQuestion = require('./QuizQuestion').schema;

const quizSchema = new mongoose.Schema({
    quizName: {
        type: String,
        required: [true, 'Please provide quizName'],
    },
    quizType: {
        type: String,
        required: [true, 'Please provide quizType'],
    },
    questions: {
        type: [QuizQuestion],
        default: []
    },
    impressions: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: String,
        default: moment().format('DD MMM, YYYY') // Format: "07 Sep, 2023"
    }
});

module.exports = mongoose.model("Quiz", quizSchema);
