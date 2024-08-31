const express = require('express')
const quizRouter = express.Router();
const { createQuiz, getDashboardDetails, getAnalyticsDetails, getQuizAnalytics, getQuizDetails, questionUpdate,  quizDelete, quizUpdate, updateQuizImpression } = require('../controllers/quizControllers');

quizRouter.post('/createQuiz', createQuiz);
quizRouter.get('/dashboardDetails', getDashboardDetails);
quizRouter.get('/analyticsDetails', getAnalyticsDetails)
quizRouter.get('/quizAnalytics', getQuizAnalytics);
quizRouter.get('/quizDetails', getQuizDetails);
quizRouter.patch('/quizUpadte', questionUpdate);
quizRouter.delete('/quizDelete', quizDelete);
quizRouter.patch('/quizUpdate', quizUpdate);
quizRouter.patch('/quizImpressionUpdate', updateQuizImpression);


module.exports = quizRouter;