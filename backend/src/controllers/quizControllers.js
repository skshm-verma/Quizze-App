const Quiz = require('../models/Quiz');
const User = require('../models/User');
const QuizQuestion = require('../models/QuizQuestion');

const statusCodes = require('../utils/constants');
const { BadRequestError, NotFoundError } = require('../errors/error');

const createQuiz = async (req, res) => {
    const { userId, quizName, quizType, questions, impressions } = req.body;

    // Validate required fields
    if (!quizName || !quizType || !questions) {
        throw new BadRequestError('quizName, quizType, and questions are required');
    }

    // Create a new quiz document
    const newQuiz = new Quiz({
        quizName,
        quizType,
        questions,
        impressions: impressions || 0,
    });

    // Save the new quiz document to the database
    await newQuiz.save();
    await User.findByIdAndUpdate(userId, {
        $push: { quizzes: newQuiz._id }
    });

    // Send the created quiz as a response
    res.status(statusCodes.CREATED).json(newQuiz);
};

const getDashboardDetails = async (req, res) => {
    const { userId } = req.query;

    // Find the user and populate the quizzes array
    const user = await User.findById(userId).populate('quizzes');
    if (!user) {
        throw new NotFoundError('User not found');
    }

    // Get the quizzes associated with the user
    const quizzes = user.quizzes;

    // Calculate the number of quizzes
    const numberOfQuizzes = quizzes.length;

    // Calculate the total number of questions
    const numberOfQuestions = quizzes.reduce((acc, quiz) => acc + quiz.questions.length, 0);

    // Calculate the total number of impressions
    const totalImpressions = quizzes.reduce((acc, quiz) => acc + quiz.impressions, 0);

    // Get quiz IDs with impressions greater than 10
    const quizzesWithImpressionsGreaterThan10 = quizzes
        .filter(quiz => quiz.impressions >= 10)
        .map(quiz => ({
            id: quiz._id,
            name: quiz.quizName,
            impressions: quiz.impressions,
            createdAt: quiz.createdAt
        }));

    // Respond with the aggregated data
    res.status(statusCodes.OK).json({
        numberOfQuizzes,
        numberOfQuestions,
        totalImpressions,
        quizzesWithImpressionsGreaterThan10,
    });
}

const getAnalyticsDetails = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        throw new BadRequestError('UserId parameter is required');
    }

    const user = await User.findById(userId).populate('quizzes');
    if (!user) {
        throw new NotFoundError('User not found');
    }

    res.status(statusCodes.OK).json(user.quizzes);
}

const getQuizAnalytics = async (req, res) => {
    const { quizId } = req.query;

    if (!quizId) {
        throw new BadRequestError('Quiz ID is required.');
    }

    // Find the quiz by ID
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
        throw new NotFoundError('Quiz not found');
    }

    let result;

    // Check the quiz type
    if (quiz.quizType === 'QnA') {
        // If quiz type is 'QnA', prepare result with attempt stats
        result = quiz.questions.map(question => {
            const totalAttempts = question.attempts;
            const correctAttempts = question.options[question.correctAnswerIndex].attempts;
            const incorrectAttempts = totalAttempts - correctAttempts;

            return {
                question: question.question,
                options: [
                    { value: totalAttempts, message: "people Attempted the question" },
                    { value: correctAttempts, message: "people Answered Correctly" },
                    { value: incorrectAttempts, message: "people Answered Incorrectly" }
                ]
            };
        });
    } else {
        // If quiz type is not 'QnA', prepare result with option stats
        result = quiz.questions.map(question => {
            return {
                question: question.question,
                options: question.options.map((option, index) => {
                    return {
                        value: option.attempts,
                        message: `option ${index + 1}`
                    };
                })
            };
        });
    }

    // Send the result and quizType as response
    res.status(statusCodes.OK).json({
        quizName: quiz.quizName,
        quizType: quiz.quizType,
        analytics: result
    });
};

const getQuizDetails = async (req, res) => {
    const { quizId } = req.query; // Extract quizId from the request parameters

    // Validate the quizId
    if (!quizId) {
        throw new BadRequestError('Quiz ID is required.');
    }

    // Find the quiz by ID
    const quiz = await Quiz.findById(quizId);

    // Check if the quiz exists
    if (!quiz) {
        throw new NotFoundError('Quiz not found.');
    }

    // Respond with the quiz data
    res.status(statusCodes.OK).json(quiz);
}

const questionUpdate = async (req, res) => {
    const { quizId, questionId, selectedOptionIndex, timerExpired } = req.body;
    // Find the quiz by quizId
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
    }

    // Find the question within the quiz by questionId
    const question = quiz.questions.id(questionId);
    if (!question) {
        return res.status(404).json({ message: 'Question not found' });
    }

    // Increment question attempts
    question.attempts += 1;

    // Increment option attempts if an option is selected
    if (selectedOptionIndex !== null) {
        const selectedOption = question.options[selectedOptionIndex];
        if (selectedOption) {
            selectedOption.attempts += 1;
        }
    }

    await quiz.save();
    res.status(200).json({ message: 'Attempts updated successfully' });

};

const quizDelete = async (req, res) => {
    const { quizId } = req.query;
    const quiz = await Quiz.findByIdAndDelete(quizId);
    if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz deleted successfully' });
};


const quizUpdate = async (req, res) => {
    const { quizId, questions } = req.body;
    console.log(quizId, questions);

    if (!quizId || !questions) {
        return res.status(400).json({ message: 'Quiz ID and questions are required.' });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found.' });
    }

    quiz.questions = questions.map((question) => {
        const updatedQuestion = {
            ...question,
            _id: question._id,
            question: question.question || '', // Default to empty string if undefined
            timer: question.timer || '0 sec', // Default timer value
            attempts: 0,
            options: question.options.map(option => ({
                ...option,
                text: option.text || '', // Default to empty string if undefined
                attempts: 0
            }))
        };
        return updatedQuestion;
    });

    // Save the updated quiz
    await quiz.save();
    return res.status(200).json({ message: 'Quiz updated successfully.', quiz });
}


const updateQuizImpression = async (req, res) => {
    const { quizId, newImpressions} = req.body;

    // Check if quizId is provided
    if (!quizId) {
        return res.status(400).json({ message: 'Quiz ID is required' });
    }

    // Find the quiz by quizId and update the impressions field
    const quiz = await Quiz.findById(quizId);

    // Check if quiz was found and updated
    if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
    }
    
    quiz.impressions = newImpressions;
    await quiz.save();
    // Send success response
    res.status(200).json({ message: 'Impression count updated successfully', quiz });
}

module.exports = {
    createQuiz,
    getDashboardDetails,
    getAnalyticsDetails,
    getQuizAnalytics,
    getQuizDetails,
    questionUpdate,
    quizDelete,
    quizUpdate,
    updateQuizImpression
};


// // Handle timer expiry
// if (timerExpired && selectedOptionIndex !== null) {
//     // Increment question and option attempts if the timer expired and an option was selected
//     question.attempts += 1;
//     question.options[selectedOptionIndex] += 1;
// }