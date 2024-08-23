import React from 'react'
import EYE from '../../../assets/eye.png'
import styles from './TrendingQuizsChips.module.css'

const TrendingQuizsChips = ({ quizName, impressions, createdAt }) => {
  return (
    <div className={styles.quizChipContainer}>
      <div className={styles.aboutChip}>
        <span>{quizName}</span>
        <div className={styles.impressions}>
          <span>{impressions}</span>
          <img src={EYE} alt="eyeImage" />
        </div>
      </div>
      <h3>{`Created on : ${createdAt}`}</h3>
    </div>
  )
}

export default TrendingQuizsChips
