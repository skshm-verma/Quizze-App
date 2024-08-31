import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateQuiz from '../../components/createQuiz/CreateQuiz';
import Dashboard from '../../components/dashboard/Dashboard';
import Analytics from '../../components/analytics/Analytics';
import { verifyUser } from '../../helpers/api-communicator';
import { toast } from 'react-hot-toast';
import styles from './Workspace.module.css';

const Workspace = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');
  const [lastActiveComponent, setLastActiveComponent] = useState('');
  const [analyticsKey, setAnalyticsKey] = useState(Date.now());
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return userId ? <Dashboard userId={userId} /> : null;
      case 'Analytics':
        return userId ? <Analytics 
        setActiveComponent={setActiveComponent}
        key={analyticsKey} 
        reset={null} userId={userId} 
        /> : null;
      case 'CreateQuiz':
        return userId ? <CreateQuiz
          setActiveComponent={setActiveComponent}
          lastActiveComponent={lastActiveComponent}
          userId={userId}
        /> : null;
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

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    toast.success('Logged out successfully!');
    navigate('/');
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const response = await verifyUser();
      if (response.status === 401) {
        navigate('/');
      } else {
        setUserId(response.userId);
      }
    };
    checkLoginStatus();
  }, [navigate]);

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
            <button className={styles.logoutButton} onClick={handleLogout}>LOGOUT</button>
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
