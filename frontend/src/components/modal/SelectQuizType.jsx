import React, { useState } from 'react';
import styles from './SelectQuizType.module.css';

const SelectQuizType = ({ setQuizType, setQuizName, setToggleToType, showLastComponent }) => {
    const [name, setName] = useState('');
    const [selectedQuizType, setSelectedQuizType] = useState('');
    const handleContinue = () => {
        if (name && selectedQuizType) {
            setQuizName(name);
            setQuizType(selectedQuizType);
            setToggleToType(false);
        } else {
            alert("Provide quiz name and select a type");
        }
    };

    return (
        <div className={styles.modalContent}>
            <div className={styles.quizName}>
                <input
                    type="text"
                    placeholder='Quiz name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className={styles.quizType}>
                <span>Quiz Type</span>
                <button
                    className={`${styles.confirmButton} ${selectedQuizType === 'QnA' ? styles.active : ''}`}
                    onClick={() => {
                        setSelectedQuizType('QnA');
                        setQuizType('QnA');
                    }}
                >
                    Q & A
                </button>
                <button
                    className={`${styles.confirmButton} ${selectedQuizType === 'Poll' ? styles.active : ''}`}
                    onClick={() => {
                        setSelectedQuizType('Poll');
                        setQuizType('Poll');
                    }}
                >
                    Poll Type
                </button>
            </div>
            <div className={styles.modalAction}>
                <button
                    className={styles.cancelButton}
                    onClick={showLastComponent}
                >
                    Cancel
                </button>
                <button
                    className={styles.confirmButton}
                    onClick={handleContinue}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default SelectQuizType;
