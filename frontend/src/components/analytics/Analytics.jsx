import React, { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoShareSocial } from "react-icons/io5";
import styles from './Analytics.module.css';
import QuestionAnalysis from './question-analysis/QuestionAnalysis';
import DeleteItem from '../modal/DeleteItem';

const Analytics = ({ reset }) => {
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);

  useEffect(() => {
    setSelectedQuizId(reset);
  }, [reset]);

  const quizzes = [
    { id: 1, name: 'Quiz 2', date: '04 Sep, 2023', impressions: '667' },
    { id: 2, name: 'Quiz 4', date: '09 Sep, 2023', impressions: '789' },
    { id: 3, name: 'Quiz 6', date: '13 Sep, 2023', impressions: '2.5K' },
    { id: 4, name: 'Quiz 8', date: '17 Sep, 2023', impressions: '1.3K' },
    { id: 5, name: 'Quiz 2', date: '04 Sep, 2023', impressions: '667' },
    { id: 6, name: 'Quiz 4', date: '09 Sep, 2023', impressions: '789' },
    { id: 7, name: 'Quiz 6', date: '13 Sep, 2023', impressions: '2.5K' },
    { id: 8, name: 'Quiz 8', date: '17 Sep, 2023', impressions: '1.3K' },
    { id: 9, name: 'Quiz 2', date: '04 Sep, 2023', impressions: '667' },
    { id: 10, name: 'Quiz 4', date: '09 Sep, 2023', impressions: '789' },
    { id: 11, name: 'Quiz 6', date: '13 Sep, 2023', impressions: '2.5K' },
    { id: 12, name: 'Quiz 8', date: '17 Sep, 2023', impressions: '1.3K' },
  ];

  const handleNavigateToAnalysis = (quizId) => {
    setSelectedQuizId(quizId);
  };

  const handleDelete = (quizId) => {
    setQuizToDelete(quizId);
    setIsModalOpen(true);
  };

  const confirmDelete = (quizId) => {
    console.log(`Deleting quiz with id: ${quizId}`);
    setIsModalOpen(false);
    setQuizToDelete(null);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setQuizToDelete(null);
  };

  return (
    <div className={styles.quizTableContainer}>
      {selectedQuizId ? (
        <QuestionAnalysis quizId={selectedQuizId} />
      ) : (
        <>
          <h1>Quiz Analysis</h1>
          <table className={styles.quizTable}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Quiz Name</th>
                <th>Created on</th>
                <th>Impression</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz, index) => (
                <tr key={`${quiz.id}-${index}`}>
                  <td>{index + 1}</td>
                  <td>{quiz.name}</td>
                  <td>{quiz.date}</td>
                  <td>{quiz.impressions}</td>
                  <td>
                    <div className={styles.actions}>
                      <FaRegEdit className={styles.editAction} />
                      <RiDeleteBin6Line
                        className={styles.deleteAction}
                        onClick={() => handleDelete(quiz.id)}
                      />
                      <IoShareSocial className={styles.shareAction} />
                      <div
                        className={styles.analysisLink}
                        onClick={() => handleNavigateToAnalysis(quiz.id)}
                      >
                        Question Wise Analysis
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {isModalOpen && (
        <DeleteItem 
          quizId={quizToDelete}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default Analytics;
