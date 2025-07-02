import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import GetStartedComponent from '../../components/Quest/GetStartedComponent';

const { FiPlay, FiArrowLeft, FiInfo } = FiIcons;

const GetStarted = () => {
  const navigate = useNavigate();
  const [showQuest, setShowQuest] = useState(true);

  const handleCloseQuest = () => {
    setShowQuest(false);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <SafeIcon icon={FiPlay} className="w-8 h-8 mr-3" />
              Get Started with EYFS Tracker
            </h1>
            <p className="text-primary-100 mt-2">
              Complete your onboarding journey and discover key features
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={handleBackToDashboard}
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <SafeIcon icon={FiArrowLeft} className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Quest Component Container */}
      {showQuest ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden"
        >
          <GetStartedComponent onClose={handleCloseQuest} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-soft p-8 border border-gray-100 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiPlay} className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to EYFS Tracker!
            </h2>
            <p className="text-gray-600 mb-6">
              You've completed the getting started journey. You're now ready to explore all the features 
              and start tracking children's development effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowQuest(true)}
                className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
              >
                <SafeIcon icon={FiPlay} className="w-5 h-5 mr-2" />
                Restart Getting Started
              </button>
              <button
                onClick={handleBackToDashboard}
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <SafeIcon icon={FiArrowLeft} className="w-5 h-5 mr-2" />
                Go to Dashboard
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Information Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
      >
        <div className="flex items-start space-x-3">
          <SafeIcon icon={FiInfo} className="w-6 h-6 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900 mb-2">About the Getting Started Journey</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                This interactive onboarding experience will guide you through the key features of EYFS Tracker:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Setting up your first child profile</li>
                <li>Creating and managing observations</li>
                <li>Understanding EYFS assessments</li>
                <li>Exploring learning journeys</li>
                <li>Communicating with parents</li>
              </ul>
              <p className="mt-3">
                Complete all steps to unlock the full potential of the platform and become proficient 
                in early years tracking and development monitoring.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GetStarted;