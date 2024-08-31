import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { createNewQuiz, updateQuiz } from '../../../helpers/api-communicator';
import ShareQuiz from '../../modal/ShareQuiz';
import { toast } from 'react-hot-toast';
import styles from './Poll.module.css'

const Poll = ({ userId, quizName, quizData, showLastComponent }) => {
  const [toggleShareQuiz, setToggleShareQuiz] = useState(false);
  const [quizId, setQuizId] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', optionType: 'Text', options: [{ text: '', imageUrl: '' }, { text: '', imageUrl: '' }], correctAnswerIndex: null, timer: 'OFF' }
  ]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  useEffect(() => {
    if (quizData) {
      setQuizId(quizData._id);
      setQuestions(quizData.questions);
    }
  }, [quizData]);

  const handleQuestionChange = (index, field, value) => {
    if (quizData && field === 'optionType') {
      // Prevent changing option type if editing an existing quiz
      toast.error('Cannot change option type');
      return;
    }
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, field, value) => {
    const newQuestions = [...questions];
    // Update the appropriate field based on optionType
    if (field === 'Text') {
      newQuestions[qIndex].options[oIndex].text = value;
    } else if (field === 'Image URL') {
      newQuestions[qIndex].options[oIndex].imageUrl = value;
    }
    setQuestions(newQuestions);
  };



  const handleAddOption = (qIndex) => {
    if (quizData) {
      // Prevent adding options if editing an existing quiz
      toast.error('Cannot add new options');
      return;
    }
    const newQuestions = [...questions];
    if (newQuestions[qIndex].options.length < 4) {
      newQuestions[qIndex].options.push({ text: '', imageUrl: '' });
    }
    setQuestions(newQuestions);
  };

  const handleDeleteOption = (qIndex, oIndex) => {
    if (quizData) {
      // Prevent deleting questions if editing an existing quiz
      toast.error('Cannot delete options');
      return;
    }
    const newQuestions = [...questions];
    newQuestions[qIndex].options = newQuestions[qIndex].options.filter((_, i) => i !== oIndex);
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    if (quizData) {
      // Prevent adding questions if editing an existing quiz
      toast.error('Cannot add new questions');
      return;
    }
    if (questions.length < 5) {
      setQuestions([...questions, { question: '', optionType: 'Text', options: [{ text: '', imageUrl: '' }, { text: '', imageUrl: '' }], correctAnswerIndex: null, timer: 'OFF' }]);
      setSelectedQuestionIndex(questions.length); // Set to the newly added question
    }
  };

  const handleCorrectAnswer = (qIndex, oIndex) => {
    if (quizData) {
      // Prevent changing correct answer index if editing an existing quiz
      toast.error('Cannot change correct answer choice');
      return;
    }
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswerIndex = oIndex; // Set the selected option as correct
    setQuestions(newQuestions);
  };

  const validateQuiz = () => {
    // Iterate through each question
    for (const question of questions) {
      if (!question.question.trim()) {
        toast.error('All question fields must be filled out.');
        return false; // Stop validation and return false if a question is empty
      }

      if (question.correctAnswerIndex === null) {
        toast.error('You must select a correct answer for each question.');
        return false; // Stop validation and return false if no correct answer is selected
      }

      // Iterate through each option for the current question
      for (const option of question.options) {
        // Check if both text and imageUrl fields are empty
        if (!option.text.trim() && !option.imageUrl.trim()) {
          toast.error('All options field must be filled out.');
          return false; // Stop validation and return false if an option is empty
        }
      }
    }

    // If all checks pass, return true
    return true;
  }


  const handleCreateQuiz = async () => {
    if (!validateQuiz()) return;

    const loadingToast = toast.loading('Creating quiz...');

    try {
      const response = await createNewQuiz(userId, quizName, 'Poll', questions);
      if (response.status === 201) {
        setQuizId(response.data._id);
        setToggleShareQuiz(true);
        toast.success('Quiz created successfully', { id: loadingToast });
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to create quiz', { id: loadingToast });
    }
  };

  const handleDeleteQuestion = (index) => {
    if (quizData) {
      toast.error('Cannot delete questions');
      return;
    }
    const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(newQuestions);

    // Update the selected question index
    if (index === selectedQuestionIndex && newQuestions.length > 0) {
      setSelectedQuestionIndex(0); // Select the first question if the current one is deleted
    } else if (index < selectedQuestionIndex) {
      setSelectedQuestionIndex(selectedQuestionIndex - 1); // Shift index if earlier question is deleted
    }
  };

 const handleSaveQuiz = async () => {
    if (quizData) {
      if (!validateQuiz()) return;

      const loadingToast = toast.loading('Saving quiz...');

      try {
        const response = await updateQuiz(quizId, questions);
        if (response.status === 200) {
          toast.success('Quiz updated successfully', { id: loadingToast });
          showLastComponent();
        }
      } catch (error) {
        toast.error('Failed to update quiz', { id: loadingToast });
      }
    } else {
      handleCreateQuiz();
    }
  };


  return (
    <div className={toggleShareQuiz ? `${styles.qnaContainer2}` : `${styles.qnaContainer}`}>
      {toggleShareQuiz ? <ShareQuiz quizId={quizId} showLastComponent={showLastComponent} /> :
        <>
          <div className={styles.questionNumberContainer}>
            <div className={styles.questionNumber}>
              {questions.map((_, index) => (
                <span
                  key={index}
                  onClick={() => setSelectedQuestionIndex(index)}
                  className={selectedQuestionIndex === index ? styles.selectedQuestion : ''}
                >
                  {index + 1}
                  {questions.length > 1 && selectedQuestionIndex === index &&
                    <RxCross1
                      className={styles.deleteQuestion}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent parent click event
                        handleDeleteQuestion(index);
                      }}
                    />
                  }
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

                  {questions[selectedQuestionIndex].optionType === 'Text & Image URL' ? (
                    <>
                      <input
                        type="text"
                        value={option.text}
                        onChange={(e) => handleOptionChange(selectedQuestionIndex, oIndex, 'Text', e.target.value)}
                        placeholder="Text"
                        className={`${styles.input} ${questions[selectedQuestionIndex].correctAnswerIndex === oIndex ? styles.selectedInput : ''}`}
                      />
                      <input
                        type="text"
                        value={option.imageUrl}
                        onChange={(e) => handleOptionChange(selectedQuestionIndex, oIndex, 'Image URL', e.target.value)}
                        placeholder="Image URL"
                        className={questions[selectedQuestionIndex].correctAnswerIndex === oIndex ? styles.selectedInput : ''}
                      />
                    </>
                  ) : (
                    <input
                      type="text"
                      value={questions[selectedQuestionIndex].optionType === 'Image URL' ? option.imageUrl : option.text}
                      onChange={(e) => handleOptionChange(selectedQuestionIndex, oIndex, questions[selectedQuestionIndex].optionType, e.target.value)}
                      placeholder={questions[selectedQuestionIndex].optionType === 'Image URL' ? "Image URL" : "Text"}
                      className={questions[selectedQuestionIndex].correctAnswerIndex === oIndex ? styles.selectedInput : ''}
                    />
                  )}

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
            <button className={styles.cancelButton} onClick={showLastComponent}>Cancel</button>
            <button className={styles.createButton} onClick={handleSaveQuiz}>
              {quizData ? 'Save Changes' : 'Create Quiz'}
            </button>
          </div>
        </>}
    </div>
  );
};

export default Poll




//
// 