import React, { useState } from 'react';
import styles from './CreateQuiz.module.css';
import SelectQuizType from '../modal/SelectQuizType';
import QnA from './QnA-type/QnA';
import Poll from './poll-type/Poll';
import Analytics from '../analytics/Analytics';
import Dashboard from '../dashboard/Dashboard';

const CreateQuiz = ({ setActiveComponent, lastActiveComponent }) => {
  const [quizType, setQuizType] = useState('');
  const [quizName, setQuizName] = useState('');
  const [toggleToType, setToggleToType] = useState(true);
  const [backgroundComponent] = useState(lastActiveComponent)

  const handleShowLastComponent = () => {
    setActiveComponent(lastActiveComponent);
  };

  return (
    <>
      <div className={styles.createQuizWrapper}>
        {toggleToType ? (
          <SelectQuizType
            setQuizType={setQuizType}
            setQuizName={setQuizName}
            setToggleToType={setToggleToType}
            showLastComponent={handleShowLastComponent}
          />
        ) : quizType === 'QnA' ? (
          <QnA quizName={quizName} showLastComponent={handleShowLastComponent} />
        ) : (
          <Poll quizName={quizName} showLastComponent={handleShowLastComponent} />
        )}
      </div>
      {backgroundComponent === 'Analytics' ? <Analytics /> : <Dashboard />}
    </>
  );
};

export default CreateQuiz;
