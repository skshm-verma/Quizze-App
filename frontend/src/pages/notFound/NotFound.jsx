import React from 'react';
import styles from './NotFound.module.css';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <p className={styles.message}>Page Not Found</p>
        <span onClick={() => navigate('/')} className={styles.homeLink}>Go Back Home</span>
      </div>
    </div>
  );
};

export default NotFoundPage;