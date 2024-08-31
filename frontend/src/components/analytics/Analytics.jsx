import React, { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoShareSocial } from "react-icons/io5";
import styles from './Analytics.module.css';
import QuestionAnalysis from './question-analysis/QuestionAnalysis';
import DeleteItem from '../modal/DeleteItem';
import QnA from '../createQuiz/QnA-type/QnA'; // Import QnA component
import Poll from '../createQuiz/poll-type/Poll'; // Import Poll component
import { analyticsDetails, quizDelete, fetchQuizDetails } from '../../helpers/api-communicator';
import toast from 'react-hot-toast'; // Import toast from react-hot-toast

const Analytics = ({ reset, userId, setActiveComponent}) => {
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [editQuiz, setEditQuiz] = useState(null); // State for holding quiz data to edit
  const [editQuizType, setEditQuizType] = useState(''); // State for holding quiz type (QnA or Poll)

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await analyticsDetails(userId);
        const quizzesData = response.map((quiz) => ({
          id: quiz._id,
          name: quiz.quizName,
          type: quiz.quizType,
          date: quiz.createdAt,
          impressions: quiz.impressions,
        }));
        setQuizzes(quizzesData);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    }
    if (userId) {
      fetchQuizzes();
    }
    setSelectedQuizId(reset);
  }, [reset, userId]);

  const handleShowLastComponent = () => {
    setEditQuiz(null); 
    setEditQuizType('');
    setSelectedQuizId(null);
    setActiveComponent('Analytics');
  };

  const handleEditQuiz = async (quizId, quizType) => {
    try {
      const response = await fetchQuizDetails(quizId);
      setEditQuiz(response.data);
      setEditQuizType(quizType);
    } catch (error) {
      console.error('Error fetching quiz details:', error);
      toast.error('Failed to fetch quiz details');
    }
  };

  const handleCopyLink = async (quizId) => {
    const url = `https://quizze-the-create-quiz-app.vercel.app/quiz/${quizId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleNavigateToAnalysis = (quizId) => {
    setSelectedQuizId(quizId);
  };

  const handleDelete = (quizId) => {
    setQuizToDelete(quizId);
    setIsModalOpen(true);
  };

  const confirmDelete = async (quizId) => {
    try {
      const response = await quizDelete(quizId);
      if (response.status === 200) {
        toast.success('Quiz deleted successfully');
        setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
      } else {
        toast.error('Failed to delete quiz');
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
      toast.error('An error occurred while deleting the quiz');
    }
    setIsModalOpen(false);
    setQuizToDelete(null);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setQuizToDelete(null);
  };

  return (
    <div className={styles.quizTableContainer}>
      {editQuiz ? (
        editQuizType === 'QnA' ? (
          <div className={styles.saveQuizWrapper}><QnA quizData={editQuiz} showLastComponent={handleShowLastComponent} /></div>
        ) : (
          <div className={styles.saveQuizWrapper}><Poll quizData={editQuiz} showLastComponent={handleShowLastComponent} /></div>
        )
      ) : selectedQuizId ? (
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
                      <FaRegEdit
                        className={styles.editAction}
                        onClick={() => handleEditQuiz(quiz.id, quiz.type)}
                      />
                      <RiDeleteBin6Line
                        className={styles.deleteAction}
                        onClick={() => handleDelete(quiz.id)}
                      />
                      <IoShareSocial
                        className={styles.shareAction}
                        onClick={() => handleCopyLink(quiz.id)}
                      />
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


// import React, { useState, useEffect } from 'react';
// import { FaRegEdit } from "react-icons/fa";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { IoShareSocial } from "react-icons/io5";
// import styles from './Analytics.module.css';
// import QuestionAnalysis from './question-analysis/QuestionAnalysis';
// import DeleteItem from '../modal/DeleteItem';
// import { analyticsDetails, quizDelete } from '../../helpers/api-communicator';
// import toast from 'react-hot-toast'; // Import toast from react-hot-toast

// const Analytics = ({ reset, userId }) => {
//   const [selectedQuizId, setSelectedQuizId] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [quizToDelete, setQuizToDelete] = useState(null);
//   const [quizzes, setQuizzes] = useState([]);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await analyticsDetails(userId);
//         console.log(response);
//         const quizzesData = response.map((quiz) => ({
//           id: quiz._id,
//           name: quiz.quizName,
//           type: quiz.quizType,
//           date: quiz.createdAt,
//           impressions: quiz.impressions,
//         }));
//         setQuizzes(quizzesData);
//       } catch (error) {
//         console.error('Error fetching quizzes:', error);
//       }
//     }
//     if (userId) {
//       fetchQuizzes();
//     }
//     setSelectedQuizId(reset);
//   }, [reset, userId]);

//   const handleEditQuiz = async (quizId, quizType) => {

//   }

//   const handleCopyLink = async (quizId) => {
//     const url = `https://quizze-the-create-quiz-app.vercel.app/quiz/${quizId}`;
//     try {
//       await navigator.clipboard.writeText(url);
//       toast.success('Link copied to clipboard!'); // Show success toast notification
//     } catch (error) {
//       toast.error('Failed to copy link'); // Show error toast notification if copying fails
//     }
//   }

//   const handleNavigateToAnalysis = (quizId) => {
//     setSelectedQuizId(quizId);
//   };

//   const handleDelete = (quizId) => {
//     setQuizToDelete(quizId);
//     setIsModalOpen(true);
//   };

//   const confirmDelete = async (quizId) => {
//     try {
//       const response = await quizDelete(quizId);
//       if (response.status === 200) {
//         toast.success('Quiz deleted successfully');
//         setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
//       } else {
//         toast.error('Failed to delete quiz');
//       }
//     } catch (error) {
//       console.error('Error deleting quiz:', error);
//       toast.error('An error occurred while deleting the quiz');
//     }
//     setIsModalOpen(false);
//     setQuizToDelete(null);
//   };

//   const cancelDelete = () => {
//     setIsModalOpen(false);
//     setQuizToDelete(null);
//   };

//   return (
//     <div className={styles.quizTableContainer}>
//       {selectedQuizId ? (
//         <QuestionAnalysis quizId={selectedQuizId} />
//       ) : (
//         <>
//           <h1>Quiz Analysis</h1>
//           <table className={styles.quizTable}>
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Quiz Name</th>
//                 <th>Created on</th>
//                 <th>Impression</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {quizzes.map((quiz, index) => (
//                 <tr key={`${quiz.id}-${index}`}>
//                   <td>{index + 1}</td>
//                   <td>{quiz.name}</td>
//                   <td>{quiz.date}</td>
//                   <td>{quiz.impressions}</td>
//                   <td>
//                     <div className={styles.actions}>
//                       <FaRegEdit
//                       className={styles.editAction}
//                       onClick={() => handleEditQuiz(quiz.id, quiz.type)}
//                       />
//                       <RiDeleteBin6Line
//                         className={styles.deleteAction}
//                         onClick={() => handleDelete(quiz.id)}
//                       />
//                       <IoShareSocial
//                         className={styles.shareAction}
//                         onClick={() => handleCopyLink(quiz.id)}
//                       />
//                       <div
//                         className={styles.analysisLink}
//                         onClick={() => handleNavigateToAnalysis(quiz.id)}
//                       >
//                         Question Wise Analysis
//                       </div>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}

//       {isModalOpen && (
//         <DeleteItem
//           quizId={quizToDelete}
//           onClose={cancelDelete}
//           onConfirm={confirmDelete}
//         />
//       )}
//     </div>
//   );
// };

// export default Analytics;
