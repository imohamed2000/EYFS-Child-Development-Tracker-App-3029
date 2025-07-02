import React, { useEffect } from 'react';
import { GetStarted } from '@questlabs/react-sdk';
import { questConfig } from '../../config/questConfig';

const GetStartedComponent = ({ onClose }) => {
  // Store userId in localStorage if not already present
  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      localStorage.setItem('userId', questConfig.USER_ID);
    }
  }, []);

  return (
    <div className="quest-getstarted-container">
      <GetStarted
        questId={questConfig.GET_STARTED_QUESTID}
        uniqueUserId={localStorage.getItem('userId') || questConfig.USER_ID}
        accent={questConfig.PRIMARY_COLOR}
        autoHide={false}
        onClose={onClose}
      >
        <GetStarted.Header />
        <GetStarted.Progress />
        <GetStarted.Content />
        <GetStarted.Footer />
      </GetStarted>
    </div>
  );
};

export default GetStartedComponent;