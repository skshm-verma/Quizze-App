import React, { useState, useEffect } from 'react';
import styles from './EngageQuiz.module.css';

const EngageQuiz = () => {
    const data = [
        {
            quizType: 'QnA',
            questions: [
                {
                    correctAnswerIndex: 2,
                    optionType: 'Text & Image URL',
                    question: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt cupiditate quae sunt harum ea minima illo. Aliquid, quo commodi. Quod.Incidunt cupiditate quae sunt harum ea minima illo. Aliquid, quo commodi. Quod.',
                    options: [
                        { text: 'option 1 option 1', imageUrl: 'https://fastly.picsum.photos/id/254/536/354.jpg?hmac=HI8J-HWbYztb20pxIW36rKEkg4wqIbYPmayDvAk3ehA' },
                        { text: 'option 11', imageUrl: 'https://fastly.picsum.photos/id/254/536/354.jpg?hmac=HI8J-HWbYztb20pxIW36rKEkg4wqIbYPmayDvAk3ehA' },
                        { text: 'option 2', imageUrl: 'https://fastly.picsum.photos/id/254/536/354.jpg?hmac=HI8J-HWbYztb20pxIW36rKEkg4wqIbYPmayDvAk3ehA' },
                        { text: 'option 101', imageUrl: 'https://fastly.picsum.photos/id/254/536/354.jpg?hmac=HI8J-HWbYztb20pxIW36rKEkg4wqIbYPmayDvAk3ehA' }
                    ],
                    timer: "5 sec"
                },
                // {
                //     correctAnswerIndex: 0,
                //     optionType: 'Text',
                //     question: '2 + 1 = ?',
                //     options: [
                //         { text: '3', imageUrl: '' },
                //         { text: '11', imageUrl: '' },
                //         { text: '2', imageUrl: '' }
                //     ],
                //     timer: "10 sec"
                // },
                // {
                //     correctAnswerIndex: 1,
                //     optionType: 'Text',
                //     question: '5 + 1 = ?',
                //     options: [
                //         { text: '1', imageUrl: '' },
                //         { text: '6', imageUrl: '' },
                //         { text: '2', imageUrl: '' }
                //     ],
                //     timer: "0 sec"
                // },
                // {
                //     correctAnswerIndex: 1,
                //     optionType: 'Text',
                //     question: '10 + 1 = ?',
                //     options: [
                //         { text: '1', imageUrl: '' },
                //         { text: '11', imageUrl: '' },
                //         { text: '2', imageUrl: '' },
                //         { text: '6', imageUrl: '' }
                //     ],
                //     timer: "0 sec"
                // }
            ]
        }
    ];


    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    // Parse the timer value from the string
    const parseTimer = (timerString) => {
        const parsed = parseInt(timerString, 10); // Parse out the number
        return isNaN(parsed) ? 0 : parsed; // Return 0 if parsing fails
    };

    const [timer, setTimer] = useState(parseTimer(data[0].questions[0].timer));

    const currentQuestion = data[0].questions[currentQuestionIndex];

    // Function to format the timer as MM:SSs
    const formatTimer = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}s`;
    };

    // Handle option selection
    const handleOptionClick = (index) => {
        setSelectedOption(index);
    };

    // Handle moving to the next question
    const handleNextClick = () => {
        if (currentQuestionIndex < data[0].questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null); // Reset selected option
            const nextTimerValue = parseTimer(data[0].questions[currentQuestionIndex + 1].timer);
            setTimer(nextTimerValue);
        } else {
            // If it's the last question, you can handle quiz completion here
            console.log('Quiz completed!');
        }
    };

    // Effect to handle the timer logic
    useEffect(() => {
        if (timer > 0) {
            const timerId = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 1) {
                        handleNextClick(); // Move to the next question when the timer reaches 1
                    }
                    return prevTimer - 1;
                });
            }, 1000);

            // Cleanup the interval on component unmount or when timer changes
            return () => clearInterval(timerId);
        }
    }, [timer]);

    const isLastQuestion = currentQuestionIndex === data[0].questions.length - 1;

    return (
        <div className={styles.quizWrapper}>
            <div className={styles.quizContainer}>
                <div className={styles.quizHeader}>
                    <div className={styles.questionNumber}>
                        {`0${currentQuestionIndex + 1}/0${data[0].questions.length}`}
                    </div>
                    <div className={styles.timer}>{timer > 0 ? formatTimer(timer) : ''}</div>
                </div>
                <div className={styles.questionText}>{currentQuestion.question}</div>
                <div className={styles.optionsContainer}>
                    {currentQuestion.options.map((option, index) => (
                        <div
                            key={index}
                            className={`${styles.option} ${selectedOption === index ? styles.selected : ''}`}
                            onClick={() => handleOptionClick(index)}
                        >
                            {currentQuestion.optionType === 'Text & Image URL' ? 
                            <div className={styles.optionBoth}>
                                <div><span>{option.text}</span></div>
                                <div><img src={option.imageUrl} alt="Option" /> </div>
                            </div>
                             : currentQuestion.optionType === 'Image URL' ? (
                                <img src={option.imageUrl} alt="Option" className={styles.optionImage} />
                            ) : (
                                <div className={styles.optionText}><span>{option.text}</span></div>
                            )}
                        </div>
                    ))}
                </div>
                {isLastQuestion ? (
                    <button className={styles.submitButton} onClick={handleNextClick}>Submit</button>
                ) : (
                    <button className={styles.nextButton} onClick={handleNextClick}>NEXT</button>
                )}
            </div>
        </div>
    );
};

export default EngageQuiz;






// const data = [
//     {
//         quizType: 'QnA',
//         questions: [
//             {
//                 correctAnswerIndex: 2,
//                 optionType: 'Text',
//                 question: '1 + 1 = ?',
//                 options: [
//                     { text: '1', imageUrl: '' },
//                     { text: '11', imageUrl: '' },
//                     { text: '2', imageUrl: '' },
//                     { text: '101', imageUrl: '' }
//                 ],
//                 timer: "15 sec"
//             },
// {
//     correctAnswerIndex: 0,
//     optionType: 'Text',
//     question: '2 + 1 = ?',
//     options: [
//         { text: '3', imageUrl: '' },
//         { text: '11', imageUrl: '' },
//         { text: '2', imageUrl: '' }
//     ],
//     timer: "10 sec"
// },
// {
//     correctAnswerIndex: 1,
//     optionType: 'Text',
//     question: '5 + 1 = ?',
//     options: [
//         { text: '1', imageUrl: '' },
//         { text: '6', imageUrl: '' },
//         { text: '2', imageUrl: '' }
//     ],
//     timer: "0 sec"
// },
// {
//     correctAnswerIndex: 1,
//     optionType: 'Text',
//     question: '10 + 1 = ?',
//     options: [
//         { text: '1', imageUrl: '' },
//         { text: '11', imageUrl: '' },
//         { text: '2', imageUrl: '' },
//         { text: '6', imageUrl: '' }
//     ],
//     timer: "0 sec"
// }
//         ]
//     }
// ];