const mongoose = require('mongoose');

const optionValueSchema = new mongoose.Schema({
    text: {
        type: String,
        default: ''
    },
    imageUrl: {
        type: String,
        default: ''
    },
    attempts: {
        type: Number,
        default: 0
    }
})

const quizQuestionSchema = new mongoose.Schema({
    correctAnswerIndex: {
        type: Number,
        required: [true, 'Please provide rightAnswer'],
    },
    optionType: {
        type: String,
        required: [true, 'Please provide optionType'],
    },
    question: {
        type: String,
        required: [true, 'Please provide question'],
        trim: true,
    },
    options: {
        type: [optionValueSchema],
        default: []
    },
    timer: {
        type: String,
        default: '0 sec'
    },
    attempts: {
        type: Number,
        default: 0
    }
})
module.exports = mongoose.model("QuizQuestion", quizQuestionSchema);