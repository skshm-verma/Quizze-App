import React, { useEffect, useState } from 'react';
import { dashboardDetails } from '../../helpers/api-communicator';
import styles from './Dashboard.module.css';
import TrendingQuizsChips from './dashboardChips/TrendingQuizsChips';

const Dashboard = ({ userId }) => {
  const [quizCount, setQuizCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [totalImpressions, setTotalImpressions] = useState(0);
  const [trendingQuizzes, setTrendingQuizzes] = useState([]);

  useEffect(() => {
    const fetchDashboardDetails = async () => {
      if (!userId) return;
      const data = await dashboardDetails(userId);
      if (data) {
        setQuizCount(data.numberOfQuizzes || 0);
        setQuestionCount(data.numberOfQuestions || 0);
        setTotalImpressions(data.totalImpressions || 0);
        
        // Sort quizzes based on impressions in descending order
        const sortedQuizzes = (data.quizzesWithImpressionsGreaterThan10 || []).sort((a, b) => b.impressions - a.impressions);
        
        setTrendingQuizzes(sortedQuizzes);
      }
    };

    fetchDashboardDetails();
  }, [userId]);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardDetails}>
        <div className={`${styles.createChip} ${styles.textColor1}`}>
          <div>
            <span>{quizCount}</span> Quiz Created
          </div>
        </div>
        <div className={`${styles.createChip} ${styles.textColor2}`}>
          <div>
            <span>{questionCount}</span> Questions Created
          </div>
        </div>
        <div className={`${styles.createChip} ${styles.textColor3}`}>
          <div>
            <span>{totalImpressions.toLocaleString()}</span> Total Impressions
          </div>
        </div>
      </div>
      <div className={styles.trendingQuizs}>
        <h1>Trending Quizzes</h1>
        <div className={styles.trendingQuizChips}>
          {trendingQuizzes.length > 0 ? (
            trendingQuizzes.map((quiz, index) => (
              <TrendingQuizsChips
                key={index}
                quizName={quiz.name}
                impressions={quiz.impressions}
                createdAt={new Date(quiz.createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })} // Format date as "07 Sep, 2023"
              />
            ))
          ) : (
            <p>No trending quizzes available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
