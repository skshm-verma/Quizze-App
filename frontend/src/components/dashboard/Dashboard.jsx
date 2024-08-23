import React from 'react'
import styles from './Dashboard.module.css'
import TrendingQuizsChips from './dashboardChips/TrendingQuizsChips'

const userData = {
  data: ["quizId1", "quizId2", "quizId3", "quizId4"]
}

const quizData = {
  data: [
    { views: 100, createAt: "04 Sep, 2023" },
    { views: 400, createAt: "05 Sep, 2023" },
    { views: 300, createAt: "06 Sep, 2023" },
    { views: 800, createAt: "07 Sep, 2023" }
  ]
}

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardDetails}>
        <div className={`${styles.createChip} ${styles.textColor1}`}>
          <div> <span>{"40"}</span> {"Quiz Created"}</div>
        </div>
        <div className={`${styles.createChip} ${styles.textColor2}`}>
          <div> <span>{"110"}</span> {"questions Created"}</div>
        </div>
        <div className={`${styles.createChip} ${styles.textColor3}`}>
          <div> <span>{"1.4K"}</span> {"Total Impressions"}</div>
        </div>
      </div>
      <div className={styles.trendingQuizs}>
        <h1>Trending Quizs</h1>
        <div className={styles.trendingQuizChips}>
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
          <TrendingQuizsChips quizName={"Quiz 1"} impressions={660} createdAt={"07 Sep, 2023"} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
