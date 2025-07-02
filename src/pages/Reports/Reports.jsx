import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import { useApp } from '../../context/AppContext';

const { FiBarChart3, FiDownload, FiFilter, FiUsers, FiEye, FiTrendingUp, FiCalendar } = FiIcons;

const Reports = () => {
  const { children, observations } = useApp();
  const [selectedReport, setSelectedReport] = useState('overview');
  const [selectedChild, setSelectedChild] = useState('all');
  const [dateRange, setDateRange] = useState('month');

  const reportTypes = [
    { id: 'overview', label: 'Overview', icon: FiBarChart3 },
    { id: 'individual', label: 'Individual Progress', icon: FiUsers },
    { id: 'cohort', label: 'Cohort Analysis', icon: FiTrendingUp },
    { id: 'observations', label: 'Observation Summary', icon: FiEye },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">Track progress and generate insights</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <SafeIcon icon={FiDownload} className="w-5 h-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          {reportTypes.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedReport === report.id
                  ? 'bg-primary-100 text-primary-700 border border-primary-300'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <SafeIcon icon={report.icon} className="w-5 h-5" />
              <span>{report.label}</span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="term">This Term</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Child</label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Children</option>
              {children.map(child => (
                <option key={child.id} value={child.id}>
                  {child.firstName} {child.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="all">All Rooms</option>
              <option value="rainbow">Rainbow Room</option>
              <option value="sunshine">Sunshine Room</option>
              <option value="stars">Stars Room</option>
              <option value="moon">Moon Room</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="space-y-8">
        {selectedReport === 'overview' && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-soft p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Children</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{children.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiUsers} className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-soft p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Observations</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{observations.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiEye} className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-soft p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">78%</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-soft p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">This Month</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">12</p>
                    <p className="text-sm text-green-600">New observations</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiCalendar} className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* EYFS Areas Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-soft p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">EYFS Areas Progress</h3>
              {/* Simple chart representation */}
              <div className="space-y-4">
                {[
                  { area: 'Communication & Language', progress: 85 },
                  { area: 'Physical Development', progress: 78 },
                  { area: 'PSED', progress: 82 },
                  { area: 'Literacy', progress: 73 },
                  { area: 'Mathematics', progress: 80 },
                  { area: 'Understanding the World', progress: 76 },
                  { area: 'Expressive Arts & Design', progress: 88 }
                ].map((item) => (
                  <div key={item.area} className="flex items-center space-x-4">
                    <div className="w-32 text-sm font-medium text-gray-700">
                      {item.area}
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-sm text-gray-600">
                      {item.progress}%
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {selectedReport === 'individual' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Individual Progress Reports</h3>
            {selectedChild === 'all' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {children.map((child) => (
                  <div key={child.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <img
                        src={child.photo}
                        alt={`${child.firstName} ${child.lastName}`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {child.firstName} {child.lastName}
                        </h4>
                        <p className="text-sm text-gray-600">{child.room}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {['Communication', 'Physical', 'Social', 'Literacy', 'Mathematics'].map((area) => {
                        const progress = Math.floor(Math.random() * 40) + 60;
                        return (
                          <div key={area}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">{area}</span>
                              <span className="text-gray-900">{progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary-600 h-2 rounded-full"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <button className="w-full mt-4 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors">
                      View Detailed Report
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">Select "All Children" to view individual progress cards</p>
              </div>
            )}
          </motion.div>
        )}

        {selectedReport === 'cohort' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Cohort Analysis</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Age Distribution</h4>
                <div className="space-y-3">
                  {[
                    { range: '2-3 years', count: 5, percentage: 50 },
                    { range: '3-4 years', count: 3, percentage: 30 },
                    { range: '4-5 years', count: 2, percentage: 20 }
                  ].map((group) => (
                    <div key={group.range} className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-900">{group.range}</span>
                        <span className="text-sm text-gray-600 ml-2">({group.count} children)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${group.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">{group.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Development Milestones</h4>
                <div className="space-y-3">
                  {[
                    { milestone: 'Speaking in sentences', achieved: 8, total: 10 },
                    { milestone: 'Recognizing letters', achieved: 6, total: 10 },
                    { milestone: 'Counting to 10', achieved: 9, total: 10 },
                    { milestone: 'Social play skills', achieved: 7, total: 10 }
                  ].map((milestone) => (
                    <div key={milestone.milestone} className="flex items-center justify-between">
                      <span className="text-sm text-gray-900">{milestone.milestone}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">
                          {milestone.achieved}/{milestone.total}
                        </span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(milestone.achieved / milestone.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {selectedReport === 'observations' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Observation Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{observations.length}</p>
                <p className="text-sm text-blue-800">Total Observations</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {observations.filter(obs => obs.sharedWithParents).length}
                </p>
                <p className="text-sm text-green-800">Shared with Parents</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">7</p>
                <p className="text-sm text-purple-800">EYFS Areas Covered</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900">Recent Observations</h4>
              {observations.slice(0, 5).map((observation) => {
                const child = children.find(c => c.id === observation.childId);
                return (
                  <div key={observation.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                    {child && (
                      <img
                        src={child.photo}
                        alt={`${child.firstName} ${child.lastName}`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-medium text-gray-900">{observation.title}</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        {child ? `${child.firstName} ${child.lastName}` : 'Unknown Child'} • {observation.date}
                      </p>
                      <div className="flex space-x-2 mt-2">
                        {observation.eyfsAreas.slice(0, 2).map((area) => (
                          <span key={area} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {area}
                          </span>
                        ))}
                        {observation.eyfsAreas.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            +{observation.eyfsAreas.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Reports;