import axios from 'axios'


const signUpUser = async (name, email, password) => {
    try {
        const response = await axios.post('/user/signUp', { name, email, password });
        return response;
    } catch (error) {
        return error.response?.data;
    }
}

const signInUser = async (email, password) => {
    try {
        const response = await axios.post('/user/signIn', { email, password });
        return response;
    } catch (error) {
        return error.response?.data;
    }
}

const verifyUser = async () => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.get('/user/verify', config);
        return response.data;
    } catch (error) {
        return error.response;
    }
}


const createNewQuiz = async (userId, quizName, quizType, questions) => {
    try {
        const response = await axios.post('/quiz/createQuiz', { userId, quizName, quizType, questions });
        return response;
    } catch (error) {
        return error.response?.data;
    }
}

const dashboardDetails = async (userId) => {
    try {
        const response = await axios.get('/quiz/dashboardDetails', { params: { userId } })
        return response.data;
    } catch (error) {
        return error.response;
    }
}

const analyticsDetails = async (userId) => {
    try {
        const response = await axios.get('/quiz/analyticsDetails', { params: { userId } })
        return response.data;
    } catch (error) {
        return error.response;
    }
}

const quizAnalytics = async (quizId) => {
    try {
        const response = await axios.get('/quiz/quizAnalytics', { params: { quizId } })
        return response.data;
    } catch (error) {
        return error.response;
    }
}

const fetchQuizDetails = async (quizId) => {
    try {
        const response = await axios.get('/quiz/quizDetails', { params: { quizId } })
        return response;
    } catch (error) {
        return error.response;
    }
}

const questionUpdate = async (quizId, questionId, selectedOptionIndex, timerExpired) => {
    try {
        const response = await axios.patch('/quiz/quizUpadte', {
            quizId,
            questionId,
            selectedOptionIndex,
            timerExpired
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

const quizDelete = async (quizId) => {
    try {
        const response = await axios.delete('/quiz/quizDelete', { params: { quizId } })
        return response;
    } catch (error) {
        return error.response;
    }
}

const updateQuiz = async (quizId, questions) => {
    try {
        const response = await axios.patch('/quiz/quizUpdate', { quizId, questions })
        return response;
    } catch (error) {
        return error.response;
    }
}

const updateImpression = async (quizId, newImpressions) => {
    try {
        const response = await axios.patch('/quiz/quizImpressionUpdate', { quizId, newImpressions })
        return response;
    } catch (error) {
        return error.response;
    }
}



export {
    signUpUser,
    signInUser,
    verifyUser,
    createNewQuiz,
    dashboardDetails,
    analyticsDetails,
    quizAnalytics,
    questionUpdate,
    quizDelete,
    fetchQuizDetails,
    updateQuiz,
    updateImpression
};