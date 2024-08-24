import React, { useState } from 'react';
import CreateQuiz from '../../components/createQuiz/CreateQuiz';
import Dashboard from '../../components/dashboard/Dashboard';
import Analytics from '../../components/analytics/Analytics';
import styles from './Workspace.module.css';

const Workspace = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');
  const [lastActiveComponent, setLastActiveComponent] = useState('');
  const [analyticsKey, setAnalyticsKey] = useState(Date.now());

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Analytics':
        return <Analytics key={analyticsKey} reset={null} />;
      case 'CreateQuiz':
        return <CreateQuiz setActiveComponent={setActiveComponent} lastActiveComponent={lastActiveComponent} />;
      default:
        return <Dashboard />;
    }
  };

  const handleNavClick = (component) => {
    if (component === 'Analytics') {
      setAnalyticsKey(Date.now());
    }
    if (component === 'CreateQuiz') {
      setLastActiveComponent(activeComponent);
      setActiveComponent(component);
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
              className={
                activeComponent === 'Dashboard' ? styles.activeButton :
                  activeComponent === 'CreateQuiz' ?
                    lastActiveComponent === 'Dashboard' ?
                      styles.activeButton : '' : ''}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavClick('Analytics')}
              className={activeComponent === 'Analytics' ? styles.activeButton :
                activeComponent === 'CreateQuiz' ?
                  lastActiveComponent === 'Analytics' ?
                    styles.activeButton : '' : ''}
            >
              Analytics
            </button>
            <button
              onClick={() => handleNavClick('CreateQuiz')}
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
