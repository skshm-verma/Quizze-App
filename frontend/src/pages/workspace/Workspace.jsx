import React, { useState } from 'react';
import CreateQuiz from '../../components/createQuiz/CreateQuiz';
import Dashboard from '../../components/dashboard/Dashboard';
import Analytics from '../../components/analytics/Analytics';
import styles from './Workspace.module.css';

const Workspace = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');
  const [analyticsKey, setAnalyticsKey] = useState(Date.now()); // forcing a re-render

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Analytics':
        return <Analytics key={analyticsKey} reset={null} />;
      case 'CreateQuiz':
        return <CreateQuiz />;
      default:
        return <Dashboard />;
    }
  };

  const handleNavClick = (component) => {
    if (component === 'Analytics') {
      setAnalyticsKey(Date.now()); // Updating key to force re-render
    }
    setActiveComponent(component);
  };

  return (
    <div className={styles.workspaceContainer}>
      <nav className={styles.navContainer}>
        <div className={styles.navContent}>
          <h1>QUIZZIE</h1>
          <div className={styles.buttonGroup}>
            <button
              onClick={() => handleNavClick('Dashboard')}
              className={activeComponent === 'Dashboard' ? styles.activeButton : ''}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavClick('Analytics')}
              className={activeComponent === 'Analytics' ? styles.activeButton : ''}
            >
              Analytics
            </button>
            <button
              onClick={() => handleNavClick('CreateQuiz')}
              className={activeComponent === 'CreateQuiz' ? styles.activeButton : ''}
            >
              Create Quiz
            </button>
          </div>
          <div className={styles.logoutContainer}>
            <hr />
            <button className={styles.logoutButton}>LOGOUT</button>
          </div>
        </div>
      </nav>
      <div className={styles.componentContainer}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default Workspace;
