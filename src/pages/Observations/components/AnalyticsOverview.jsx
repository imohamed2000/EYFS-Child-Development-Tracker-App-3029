import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../../components/common/SafeIcon';
import { useApp } from '../../../context/AppContext';
import { format, subDays, isAfter } from 'date-fns';

const { FiBarChart3, FiTrendingUp, FiUsers, FiEye, FiShare2, FiCalendar, FiTarget, FiAward } = FiIcons;

const AnalyticsOverview = () => {
  const { observations, children } = useApp();
  const [timeRange, setTimeRange] = useState('30');

  const getFilteredObservations = () => {
    const cutoffDate = subDays(new Date(), parseInt(timeRange));
    return observations.filter(obs => isAfter(new Date(obs.date), cutoffDate));
  };

  const filteredObservations = getFilteredObservations();

  // Calculate metrics
  const metrics = {
    totalObservations: filteredObservations.length,
    sharedObservations: filteredObservations.filter(obs => obs.sharedWithParents).length,
    activeChildren: new Set(filteredObservations.map(obs => obs.childId)).size,
    averagePerChild: filteredObservations.length / children.length || 0,
    observationTypes: {},
    eyfsAreasCoverage: {},
    dailyActivity: {}
  };

  // Calculate observation types distribution
  filteredObservations.forEach(obs => {
    metrics.observationTypes[obs.type] = (metrics.observationTypes[obs.type] || 0) + 1;
  });

  // Calculate EYFS areas coverage
  filteredObservations.forEach(obs => {
    (obs.eyfsAreas || []).forEach(area => {
      metrics.eyfsAreasCoverage[area] = (metrics.eyfsAreasCoverage[area] || 0) + 1;
    });
  });

  // Calculate daily activity for the last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    metrics.dailyActivity[date] = filteredObservations.filter(obs => obs.date === date).length;
  }

  const topPerformers = children
    .map(child => ({
      ...child,
      observationCount: filteredObservations.filter(obs => obs.childId === child.id).length
    }))
    .sort((a, b) => b.observationCount - a.observationCount)
    .slice(0, 5);

  const eyfsAreasArray = Object.entries(metrics.eyfsAreasCoverage)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 7);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Overview</h2>
          <p className="text-gray-600 mt-1">
            Insights and metrics for the observation system
          </p>
        </div>
        <div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Observations</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{metrics.totalObservations}</p>
              <p className="text-sm text-green-600 mt-1">
                +{Math.round((metrics.totalObservations / observations.length) * 100)}% of all time
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiEye} className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Shared with Parents</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{metrics.sharedObservations}</p>
              <p className="text-sm text-blue-600 mt-1">
                {Math.round((metrics.sharedObservations / metrics.totalObservations) * 100)}% share rate
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiShare2} className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Children</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{metrics.activeChildren}</p>
              <p className="text-sm text-purple-600 mt-1">
                {Math.round((metrics.activeChildren / children.length) * 100)}% of all children
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiUsers} className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg per Child</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{metrics.averagePerChild.toFixed(1)}</p>
              <p className="text-sm text-orange-600 mt-1">
                observations per child
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <SafeIcon icon={FiBarChart3} className="w-5 h-5 mr-2 text-blue-600" />
            Daily Activity (Last 7 Days)
          </h3>
          
          <div className="space-y-3">
            {Object.entries(metrics.dailyActivity).map(([date, count]) => {
              const maxCount = Math.max(...Object.values(metrics.dailyActivity));
              const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
              
              return (
                <div key={date} className="flex items-center space-x-3">
                  <div className="w-20 text-sm text-gray-600">
                    {format(new Date(date), 'MMM dd')}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-8 text-sm text-gray-900 font-medium">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Observation Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <SafeIcon icon={FiTarget} className="w-5 h-5 mr-2 text-green-600" />
            Observation Types
          </h3>
          
          <div className="space-y-3">
            {Object.entries(metrics.observationTypes).map(([type, count]) => {
              const percentage = (count / metrics.totalObservations) * 100;
              const colors = {
                'Learning Story': 'bg-blue-500',
                'Snapshot': 'bg-green-500',
                'Assessment': 'bg-purple-500',
                'Group Activity': 'bg-orange-500'
              };
              
              return (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${colors[type] || 'bg-gray-500'}`}></div>
                    <span className="text-sm font-medium text-gray-900">{type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{count}</span>
                    <span className="text-xs text-gray-500">({percentage.toFixed(1)}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* EYFS Areas Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <SafeIcon icon={FiAward} className="w-5 h-5 mr-2 text-purple-600" />
            EYFS Areas Coverage
          </h3>
          
          <div className="space-y-3">
            {eyfsAreasArray.map(([area, count]) => {
              const maxCount = Math.max(...Object.values(metrics.eyfsAreasCoverage));
              const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
              
              return (
                <div key={area} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 truncate">{area}</span>
                    <span className="text-sm text-gray-600">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <SafeIcon icon={FiUsers} className="w-5 h-5 mr-2 text-orange-600" />
            Most Observed Children
          </h3>
          
          <div className="space-y-3">
            {topPerformers.map((child, index) => (
              <div key={child.id} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-orange-600">#{index + 1}</span>
                </div>
                <img
                  src={child.photo}
                  alt={`${child.firstName} ${child.lastName}`}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {child.firstName} {child.lastName}
                  </p>
                  <p className="text-xs text-gray-600">{child.room}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{child.observationCount}</p>
                  <p className="text-xs text-gray-600">observations</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* System Health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health & Recommendations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium text-gray-900">Observation Frequency</span>
            </div>
            <p className="text-sm text-gray-600">
              {metrics.averagePerChild >= 2 ? 'Excellent' : metrics.averagePerChild >= 1 ? 'Good' : 'Needs Improvement'} - 
              {metrics.averagePerChild.toFixed(1)} observations per child
            </p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${
                (metrics.sharedObservations / metrics.totalObservations) >= 0.7 ? 'bg-green-500' : 
                (metrics.sharedObservations / metrics.totalObservations) >= 0.5 ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span className="font-medium text-gray-900">Parent Engagement</span>
            </div>
            <p className="text-sm text-gray-600">
              {Math.round((metrics.sharedObservations / metrics.totalObservations) * 100)}% of observations shared with parents
            </p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${
                Object.keys(metrics.eyfsAreasCoverage).length >= 6 ? 'bg-green-500' : 
                Object.keys(metrics.eyfsAreasCoverage).length >= 4 ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span className="font-medium text-gray-900">EYFS Coverage</span>
            </div>
            <p className="text-sm text-gray-600">
              {Object.keys(metrics.eyfsAreasCoverage).length} of 7 EYFS areas covered
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsOverview;