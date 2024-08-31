import React, { useState, useEffect } from 'react';
import { quizAnalytics } from '../../../helpers/api-communicator';
import styles from './QuestionAnalysis.module.css';

const QuestionAnalysis = ({ quizId }) => { // Accept quizId as a prop
    const [data, setData] = useState([]);
    const [type, setType] = useState('');
    const [quizName, setQuizName] = useState('');


    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await quizAnalytics(quizId);
                setData(response.analytics);
                setType(response.quizType);
                setQuizName(response.quizName);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        }
        if (quizId) {
            fetchQuizzes();
        }
    }, []);


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
                    <h1>{quizName} Question Analysis</h1>
                    <div className={styles.quizImpressions}>
                        <span>Created on: 04 Sep, 2023</span>
                        <span>Impressions: 667</span>
                    </div>
                </div>
                {data.map((item, index) => (
                    type === 'QnA' ? renderQnA(item, index) : renderPoll(item, index)
                ))}
            </div>
        </div>
    );
};

export default QuestionAnalysis;