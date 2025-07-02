import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import { useApp } from '../../context/AppContext';
import { format } from 'date-fns';

const { FiClipboard, FiPlus, FiEye, FiTrendingUp, FiCalendar, FiUser, FiCheckCircle, FiAlertCircle, FiClock } = FiIcons;

const Assessments = () => {
  const { children, observations } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedChild, setSelectedChild] = useState('all');

  const assessmentTypes = [
    { id: 'baseline', name: 'Baseline Assessment', color: 'bg-blue-100 text-blue-800' },
    { id: 'progress', name: 'Progress Check', color: 'bg-green-100 text-green-800' },
    { id: 'summative', name: 'Summative Assessment', color: 'bg-purple-100 text-purple-800' },
    { id: 'eyfs-profile', name: 'EYFS Profile', color: 'bg-orange-100 text-orange-800' }
  ];

  const eyfsAreas = [
    'Communication and Language',
    'Physical Development',
    'Personal, Social and Emotional Development',
    'Literacy',
    'Mathematics',
    'Understanding the World',
    'Expressive Arts and Design'
  ];

  const getChildAssessments = (childId) => {
    const child = children.find(c => c.id === childId);
    const childObservations = observations.filter(obs => obs.childId === childId);
    
    const assessmentData = eyfsAreas.map(area => {
      const areaObservations = childObservations.filter(obs => obs.eyfsAreas.includes(area));
      const levels = areaObservations.flatMap(obs => 
        obs.eyfsAssessments?.filter(assessment => assessment.area === area)
          ?.flatMap(assessment => 
            assessment.subcategories?.map(sub => sub.level).filter(Boolean)
          ) || []
      );
      
      // Calculate average level
      const levelValues = { emerging: 1, developing: 2, secure: 3, exceeding: 4 };
      const avgLevel = levels.length > 0 
        ? levels.reduce((sum, level) => sum + (levelValues[level] || 0), 0) / levels.length
        : 0;
      
      let status = 'Not Assessed';
      let color = 'bg-gray-100 text-gray-800';
      
      if (avgLevel >= 3.5) {
        status = 'Exceeding';
        color = 'bg-blue-100 text-blue-800';
      } else if (avgLevel >= 2.5) {
        status = 'Secure';
        color = 'bg-green-100 text-green-800';
      } else if (avgLevel >= 1.5) {
        status = 'Developing';
        color = 'bg-yellow-100 text-yellow-800';
      } else if (avgLevel > 0) {
        status = 'Emerging';
        color = 'bg-red-100 text-red-800';
      }
      
      return {
        area,
        status,
        color,
        observationCount: areaObservations.length,
        lastAssessed: areaObservations.length > 0 
          ? format(new Date(Math.max(...areaObservations.map(obs => new Date(obs.date)))), 'MMM dd, yyyy')
          : 'Never'
      };
    });

    return { child, assessments: assessmentData };
  };

  const filteredChildren = selectedChild === 'all' 
    ? children.map(child => getChildAssessments(child.id))
    : [getChildAssessments(selectedChild)];

  const tabs = [
    { id: 'overview', label: 'Assessment Overview', icon: FiClipboard },
    { id: 'tracking', label: 'Progress Tracking', icon: FiTrendingUp },
    { id: 'reports', label: 'Assessment Reports', icon: FiEye }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <SafeIcon icon={FiClipboard} className="w-8 h-8 mr-3" />
              EYFS Assessments
            </h1>
            <p className="text-green-100 mt-2">Track progress against Early Years Foundation Stage goals</p>
            <div className="flex items-center space-x-6 mt-4 text-green-100">
              <span>👥 {children.length} Children</span>
              <span>📊 7 EYFS Areas</span>
              <span>📝 {observations.length} Observations</span>
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              to="/observations/create"
              className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <SafeIcon icon={FiPlus} className="w-5 h-5 mr-2" />
              Add Assessment
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-soft">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Child</label>
                  <select
                    value={selectedChild}
                    onChange={(e) => setSelectedChild(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="all">All Children</option>
                    {children.map(child => (
                      <option key={child.id} value={child.id}>
                        {child.firstName} {child.lastName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Assessment Grid */}
              {filteredChildren.map(({ child, assessments }, childIndex) => (
                <motion.div
                  key={child.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: childIndex * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={child.photo}
                      alt={`${child.firstName} ${child.lastName}`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {child.firstName} {child.lastName}
                      </h3>
                      <p className="text-gray-600">{child.room} • Key Worker: {child.keyWorker}</p>
                    </div>
                    <div className="ml-auto">
                      <Link
                        to={`/assessments/${child.id}`}
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <SafeIcon icon={FiEye} className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                    </div>
                  </div>

                  {/* EYFS Areas Assessment Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {assessments.map((assessment, index) => (
                      <motion.div
                        key={assessment.area}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (childIndex * 0.1) + (index * 0.05) }}
                        className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <h4 className="font-medium text-gray-900 mb-2 text-sm leading-tight">
                          {assessment.area}
                        </h4>
                        
                        <div className="space-y-2">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${assessment.color}`}>
                            {assessment.status}
                          </span>
                          
                          <div className="text-xs text-gray-600">
                            <div className="flex items-center space-x-1 mb-1">
                              <SafeIcon icon={FiEye} className="w-3 h-3" />
                              <span>{assessment.observationCount} observations</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <SafeIcon icon={FiCalendar} className="w-3 h-3" />
                              <span>Last: {assessment.lastAssessed}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Overall Progress Summary */}
                  <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Overall Progress Summary</h4>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-blue-600">
                          {assessments.filter(a => a.status === 'Exceeding').length}
                        </p>
                        <p className="text-xs text-gray-600">Exceeding</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-green-600">
                          {assessments.filter(a => a.status === 'Secure').length}
                        </p>
                        <p className="text-xs text-gray-600">Secure</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-yellow-600">
                          {assessments.filter(a => a.status === 'Developing').length}
                        </p>
                        <p className="text-xs text-gray-600">Developing</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-red-600">
                          {assessments.filter(a => a.status === 'Emerging').length}
                        </p>
                        <p className="text-xs text-gray-600">Emerging</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'tracking' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <SafeIcon icon={FiTrendingUp} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Progress Tracking</h3>
                <p className="text-gray-600">Track individual and cohort progress over time</p>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assessmentTypes.map((type, index) => (
                  <motion.div
                    key={type.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <SafeIcon icon={FiClipboard} className="w-6 h-6 text-gray-600" />
                      <h3 className="font-semibold text-gray-900">{type.name}</h3>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      Generate comprehensive {type.name.toLowerCase()} reports for individual children or cohorts.
                    </p>
                    
                    <div className="space-y-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${type.color}`}>
                        Available
                      </span>
                      
                      <div className="pt-2">
                        <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                          Generate Report
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Empty State */}
      {children.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiClipboard} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Children Found</h3>
          <p className="text-gray-600 mb-6">Add children to start tracking their assessments</p>
          <Link
            to="/children"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5 mr-2" />
            Add Children
          </Link>
        </div>
      )}
    </div>
  );
};

export default Assessments;