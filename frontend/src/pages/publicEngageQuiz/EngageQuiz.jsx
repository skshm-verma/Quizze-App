import React, { useState, useEffect, useRef } from 'react';
import { fetchQuizDetails, questionUpdate, updateImpression } from '../../helpers/api-communicator';
import CupImage from '../../assets/cupImage.png';
import styles from './EngageQuiz.module.css';

const EngageQuiz = () => {
    const [toggleSubmit, setToggleSubmit] = useState(false);
    const [quizId, setQuizId] = useState('');
    const [quizType, setQuizType] = useState('');
    const [data, setData] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timer, setTimer] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [evaluatedAnswers, setEvaluatedAnswers] = useState(new Set());
    const isSubmitting = useRef(false);
    const timerId = useRef(null);
    const isNextClicked = useRef(false);

    // Function to parse quizId from the URL
    const getQuizIdFromUrl = () => {
        const url = window.location.href;
        const parts = url.split('/');
        return parts[parts.length - 1];
    };

    useEffect(() => {
        const fetchQuizData = async () => {
            const quizId = getQuizIdFromUrl();
            const result = await fetchQuizDetails(quizId);
            setQuizId(quizId);
            if (result && result.data) {
                setData(result.data);
                setQuizType(result.data.quizType);
                const initialTimer = parseTimer(result.data.questions[0].timer);
                setTimer(initialTimer);
                const newImpressions = result.data.impressions + 1;
                await updateImpression(quizId, newImpressions);
            }
        };

        fetchQuizData();

        return () => clearInterval(timerId.current);
    }, []);

    const parseTimer = (timerString) => {
        if (timerString === 'OFF') return 0;
        const parsed = parseInt(timerString, 10);
        return isNaN(parsed) ? 0 : parsed;
    };

    const currentQuestion = data?.questions[currentQuestionIndex];

    const formatTimer = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}s`;
    };

    const handleOptionClick = (index) => {
        setSelectedOption(index);
    };

    const handleNextClick = async () => {
        if (!data || !currentQuestion || toggleSubmit || isNextClicked.current) return;

        isNextClicked.current = true;

        if (selectedOption !== null && !evaluatedAnswers.has(currentQuestion._id)) {
            const questionId = currentQuestion._id;
            const isCorrect = currentQuestion.correctAnswerIndex === selectedOption;

            const response = await questionUpdate(quizId, questionId, selectedOption, true);
            console.log(response);

            if (isCorrect) {
                setCorrectAnswers(prev => prev + 1);
            }

            setEvaluatedAnswers(prev => new Set(prev).add(questionId));
        }

        if (currentQuestionIndex < data.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            const nextTimerValue = parseTimer(data.questions[currentQuestionIndex + 1].timer);
            setTimer(nextTimerValue);
        }

        isNextClicked.current = false;
    };

    const handleSubmitClick = async () => {
        if (!data || isSubmitting.current || toggleSubmit) return;

        isSubmitting.current = true;

        for (const question of data.questions) {
            const questionId = question._id;
            if (!evaluatedAnswers.has(questionId)) {
                const selected = selectedOption !== null ? selectedOption : null;
                const isCorrect = selected !== null && question.correctAnswerIndex === selected;

                if (selected !== null) {
                    const response = await questionUpdate(quizId, questionId, selected, true);
                    console.log(response);
                    if (isCorrect) {
                        setCorrectAnswers(prev => prev + 1);
                    }
                }
            }
        }

        setToggleSubmit(true);
        isSubmitting.current = false;
        clearInterval(timerId.current);
    };

    useEffect(() => {
        if (timer > 0 && !toggleSubmit) {
            timerId.current = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer === 1) {
                        if (currentQuestionIndex === data.questions.length - 1) {
                            handleSubmitClick();
                        } else {
                            handleNextClick();
                        }
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);

            return () => clearInterval(timerId.current);
        }
    }, [timer, currentQuestionIndex, data, toggleSubmit]);

    if (!data) {
        return <div>Loading...</div>;
    }

    const isLastQuestion = currentQuestionIndex === data.questions.length - 1;

    return (
        <div className={styles.quizWrapper}>
            {toggleSubmit
                ? quizType === 'QnA'
                    ? (
                        <div className={styles.congratsContainer}>
                            <div>
                                <h1>Congrats Quiz is completed</h1>
                                <img src={CupImage} alt="cupImage" />
                                <h2>Your Score is <span>{`${correctAnswers}/${data.questions.length}`}</span></h2>
                            </div>
                        </div>
                    )
                    : (
                        <div className={styles.congratsContainer}>
                            <div>
                                <p>Thank you<br /> for participating in<br /> the Poll</p>
                            </div>
                        </div>
                    )
                : (
                    <div className={styles.quizContainer}>
                        <div className={styles.quizHeader}>
                            <div className={styles.questionNumber}>
                                {`0${currentQuestionIndex + 1}/0${data.questions.length}`}
                            </div>
                            <div className={styles.timer}>{timer > 0 ? formatTimer(timer) : ''}</div>
                        </div>
                        <div className={styles.questionText}>{currentQuestion?.question}</div>
                        <div className={styles.optionsContainer}>
                            {currentQuestion?.options.map((option, index) => (
                                <div
                                    key={index}
                                    className={`${styles.option} ${selectedOption === index ? styles.selected : ''}`}
                                    onClick={() => handleOptionClick(index)}
                                >
                                    {currentQuestion?.optionType === 'Text & Image URL'
                                        ? (
                                            <div className={styles.optionBoth}>
                                                <div><span>{option.text}</span></div>
                                                <div><img src={option.imageUrl} alt="Option" /></div>
                                            </div>
                                        )
                                        : currentQuestion?.optionType === 'Image URL'
                                            ? <img src={option.imageUrl} alt="Option" className={styles.optionImage} />
                                            : <div className={styles.optionText}><span>{option.text}</span></div>
                                    }
                                </div>
                            ))}
                        </div>
                        {isLastQuestion
                            ? <button className={styles.submitButton} onClick={handleSubmitClick}>Submit</button>
                            : <button className={styles.nextButton} onClick={handleNextClick}>NEXT</button>
                        }
                    </div>
                )}
        </div>
    );
};


export default EngageQuiz;
