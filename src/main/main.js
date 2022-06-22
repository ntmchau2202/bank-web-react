import React from 'react';
import { useIntl } from 'react-intl';
import reactLogo from '../assets/logo.svg';

const Dashboard = () => {
  const intl = useIntl();
  return (
    <main>
      <header>
        <h1>
          <img width={80} src={reactLogo} alt="react logo" /> {intl.formatMessage({ id: 'title' })}
        </h1>
        <p>{intl.formatMessage({ id: 'description' })}</p>
    
      </header>
    </main>
  );
};

export default Dashboard;