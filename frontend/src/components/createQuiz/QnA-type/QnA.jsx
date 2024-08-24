import React, { useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from './QnA.module.css';

const QnA = ({ quizName }) => {
  const [questions, setQuestions] = useState([
    { question: '', optionType: 'Text', options: ['', ''], correctAnswerIndex: null }
  ]);

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAddOption = (qIndex) => {
    const newQuestions = [...questions];
    if (newQuestions[qIndex].options.length < 4) {
      newQuestions[qIndex].options.push('');
    }
    setQuestions(newQuestions);
  };

  const handleDeleteOption = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options = newQuestions[qIndex].options.filter((_, i) => i !== oIndex);
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    if (questions.length < 5) {
      setQuestions([...questions, { question: '', optionType: 'Text', options: ['', ''], correctAnswerIndex: null }]);
      setSelectedQuestionIndex(questions.length); // Set to the newly added question
    }
  };

  const handleCorrectAnswer = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswerIndex = oIndex; // Set the selected option as correct
    setQuestions(newQuestions);
  };

  const handleCreateQuiz = () => {
    console.log(questions);
  };

  return (
    <div className={styles.qnaContainer}>
      <div className={styles.questionNumberContainer}>
        <div className={styles.questionNumber}>
          {questions.map((_, index) => (
            <span
              key={index}
              onClick={() => setSelectedQuestionIndex(index)}
              className={selectedQuestionIndex === index ? styles.selectedQuestion : ''}
            >
              {index + 1}
            </span>
          ))}
          {questions.length < 5 && (
            <button onClick={handleAddQuestion}>+</button>
          )}
        </div>
        <span className={styles.maxQuestions}>Max 5 questions</span>
      </div>

      <div className={styles.questionWrapper}>
        <div className={styles.questionContainer}>
          <input
            type="text"
            placeholder="Poll Question"
            value={questions[selectedQuestionIndex].question}
            onChange={(e) => handleQuestionChange(selectedQuestionIndex, 'question', e.target.value)}
            className={styles.questionInput}
          />
        </div>
        <div className={styles.optionType}>
          <span>Option Type</span>
          <label>
            <input
              type="radio"
              value="Text"
              checked={questions[selectedQuestionIndex].optionType === 'Text'}
              onChange={(e) => handleQuestionChange(selectedQuestionIndex, 'optionType', e.target.value)}
            />
            Text
          </label>
          <label>
            <input
              type="radio"
              value="Image URL"
              checked={questions[selectedQuestionIndex].optionType === 'Image URL'}
              onChange={(e) => handleQuestionChange(selectedQuestionIndex, 'optionType', e.target.value)}
            />
            Image URL
          </label>
          <label>
            <input
              type="radio"
              value="Text & Image URL"
              checked={questions[selectedQuestionIndex].optionType === 'Text & Image URL'}
              onChange={(e) => handleQuestionChange(selectedQuestionIndex, 'optionType', e.target.value)}
            />
            Text & Image URL
          </label>
        </div>
        <div className={styles.optionsContainer}>
          {questions[selectedQuestionIndex].options.map((option, oIndex) => (
            <div key={oIndex} className={styles.option}>
              <div
                className={styles.radio}
                onClick={() => handleCorrectAnswer(selectedQuestionIndex, oIndex)}
              >
                <span className={questions[selectedQuestionIndex].correctAnswerIndex === oIndex ? styles.selectedRadio : ''}></span>
              </div>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(selectedQuestionIndex, oIndex, e.target.value)}
                placeholder="Text"
                className={questions[selectedQuestionIndex].correctAnswerIndex === oIndex ? styles.selectedInput : ''}
              />
              {questions[selectedQuestionIndex].options.length > 2 && (
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteOption(selectedQuestionIndex, oIndex)}
                >
                  <RiDeleteBin6Line className={styles.deleteAction} />
                </button>
              )}
            </div>
          ))}
          {questions[selectedQuestionIndex].options.length < 4 && (
            <button className={styles.addOptionButton} onClick={() => handleAddOption(selectedQuestionIndex)}>
              Add option
            </button>
          )}
        </div>
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.cancelButton}>Cancel</button>
        <button className={styles.createButton} onClick={handleCreateQuiz}>
          Create Quiz
        </button>
      </div>
    </div>
  );
};

export default QnA;
