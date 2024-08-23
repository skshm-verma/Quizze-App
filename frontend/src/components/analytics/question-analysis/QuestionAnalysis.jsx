import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './QuestionAnalysis.module.css';

const QuestionAnalysis = ({ quizId }) => { // Accept quizId as a prop
    const [data, setData] = useState([]);
    const [type, setType] = useState('QnA'); // State to track type

    // useEffect(() => {
    //     // Fetch data based on quizId
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`https://api.example.com/quizzes/${quizId}`); // Replace with your API URL
    //             setData(response.data.data);
    //             setType(response.data.type); // Set type based on response
    //         } catch (error) {
    //             console.error('Error fetching quiz data:', error);
    //         }
    //     };

    //     fetchData();
    // }, [quizId]);

    const dummyData = [
    {
        question: "Question place holder for analysis ?",
        options: [
            { value: 60, message: "people Attempted the question" },
            { value: 38, message: "people Answered Correctly" },
            { value: 22, message: "people Answered Incorrectly" }
        ]
    },
    {
        question: "Question place holder for analysis ?",
        options: [
            { value: 60, message: "people Attempted the question" },
            { value: 38, message: "people Answered Correctly" },
            { value: 22, message: "people Answered Incorrectly" }
        ]
    },
    {
        question: "Question place holder for analysis ?",
        options: [
            { value: 60, message: "people Attempted the question" },
            { value: 38, message: "people Answered Correctly" },
            { value: 22, message: "people Answered Incorrectly" }
        ]
    },
    {
        question: "Question place holder for analysis ?",
        options: [
            { value: 60, message: "people Attempted the question" },
            { value: 38, message: "people Answered Correctly" },
            { value: 22, message: "people Answered Incorrectly" }
        ]
    }
]


    const dummyData2 = [
            {
                question: "Question place holder for analysis ?",
                options: [
                    { value: 60, message: "option 1" },
                    { value: 38, message: "option 2" },
                    { value: 22, message: "option 2" },
                    { value: 82, message: "option 4" }
                ]
            },
            {
                question: "Question place holder for analysis ?",
                options: [
                    { value: 60, message: "option 1" },
                    { value: 38, message: "option 2" },
                    { value: 22, message: "option 2" },
                    { value: 82, message: "option 4" }
                ]
            },
            {
                question: "Question place holder for analysis ?",
                options: [
                    { value: 60, message: "option 1" },
                    { value: 38, message: "option 2" },
                    { value: 22, message: "option 2" },
                    { value: 82, message: "option 4" }
                ]
            },
            {
                question: "Question place holder for analysis ?",
                options: [
                    { value: 60, message: "option 1" },
                    { value: 38, message: "option 2" },
                    { value: 22, message: "option 2" },
                    { value: 82, message: "option 4" }
                ]
            }
        ]

    // Render for QnA type
    const renderQnA = (item, index) => (
        <div key={index} className={styles.analysisChips}>
            <h2>{`Q.${index + 1}`}&nbsp;{item.question}</h2>
            <div className={styles.option}>
                {item.options.map((option, idx) => (
                    <div key={idx} className={styles.optionValue}>
                        <span className={styles.value}>{option.value}</span>
                        <span className={styles.message}>{option.message}</span>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    );

    // Render for Poll type
    const renderPoll = (item, index) => (
        <div key={index} className={styles.analysisChips}>
            <h2>{`Q.${index + 1}`}&nbsp;{item.question}</h2>
            <div className={styles.optionAnalysis}>
                {item.options.map((option, idx) => (
                    <div key={idx} className={styles.optionValuePoll}>
                        <span className={styles.value}>{option.value}</span>
                        <span className={styles.message}>{option.message}</span>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    );

    return (
        <div className={styles.wrapperAnalysis}>
            <div className={styles.containerAnalysis}>
                <div className={styles.analysisHeading}>
                    <h1>Quiz {quizId} Question Analysis</h1>
                    <div className={styles.quizImpressions}>
                        <span>Created on: 04 Sep, 2023</span>
                        <span>Impressions: 667</span>
                    </div>
                </div>
                {dummyData.map((item, index) => (
                    type === 'QnA' ? renderQnA(item, index) : renderPoll(item, index)
                ))}
            </div>
        </div>
    );
};

export default QuestionAnalysis;




// const dummyData = [
//     {
//         question: "Question place holder for analysis ?",
//         options: [
//             { value: 60, message: "people Attempted the question" },
//             { value: 38, message: "people Answered Correctly" },
//             { value: 22, message: "people Answered Incorrectly" }
//         ]
//     },
//     {
//         question: "Question place holder for analysis ?",
//         options: [
//             { value: 60, message: "people Attempted the question" },
//             { value: 38, message: "people Answered Correctly" },
//             { value: 22, message: "people Answered Incorrectly" }
//         ]
//     },
//     {
//         question: "Question place holder for analysis ?",
//         options: [
//             { value: 60, message: "people Attempted the question" },
//             { value: 38, message: "people Answered Correctly" },
//             { value: 22, message: "people Answered Incorrectly" }
//         ]
//     },
//     {
//         question: "Question place holder for analysis ?",
//         options: [
//             { value: 60, message: "people Attempted the question" },
//             { value: 38, message: "people Answered Correctly" },
//             { value: 22, message: "people Answered Incorrectly" }
//         ]
//     }
// ]

// const dummyData2 = [
//     {
//         question: "Question place holder for analysis ?",
//         options: [
//             { value: 60, message: "option 1" },
//             { value: 38, message: "option 2" },
//             { value: 22, message: "option 2" },
//             { value: 82, message: "option 4" }
//         ]
//     },
//     {
//         question: "Question place holder for analysis ?",
//         options: [
//             { value: 60, message: "option 1" },
//             { value: 38, message: "option 2" },
//             { value: 22, message: "option 2" },
//             { value: 82, message: "option 4" }
//         ]
//     },
//     {
//         question: "Question place holder for analysis ?",
//         options: [
//             { value: 60, message: "option 1" },
//             { value: 38, message: "option 2" },
//             { value: 22, message: "option 2" },
//             { value: 82, message: "option 4" }
//         ]
//     },
//     {
//         question: "Question place holder for analysis ?",
//         options: [
//             { value: 60, message: "option 1" },
//             { value: 38, message: "option 2" },
//             { value: 22, message: "option 2" },
//             { value: 82, message: "option 4" }
//         ]
//     }
// ]