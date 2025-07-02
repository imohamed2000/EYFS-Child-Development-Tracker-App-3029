import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import { useApp } from '../../context/AppContext';

const { FiTrendingUp, FiUsers, FiBarChart3, FiTarget, FiCalendar, FiEye } = FiIcons;

const CohortTracker = () => {
  const { children, observations } = useApp();
  const [selectedRoom, setSelectedRoom] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('term');

  const rooms = ['Rainbow Room', 'Sunshine Room', 'Stars Room', 'Moon Room'];
  const eyfsAreas = [
    'Communication and Language',
    'Physical Development', 
    'Personal, Social and Emotional Development',
    'Literacy',
    'Mathematics',
    'Understanding the World',
    'Expressive Arts and Design'
  ];

  const filteredChildren = selectedRoom === 'all' 
    ? children 
    : children.filter(child => child.room === selectedRoom);

  const cohortStats = {
    totalChildren: filteredChildren.length,
    averageAge: filteredChildren.length > 0 
      ? Math.round(filteredChildren.reduce((sum, child) => {
          const months = new Date().getFullYear() * 12 + new Date().getMonth() - 
                       (new Date(child.dateOfBirth).getFullYear() * 12 + new Date(child.dateOfBirth).getMonth());
          return sum + months;
        }, 0) / filteredChildren.length)
      : 0,
    totalObservations: observations.filter(obs => 
      filteredChildren.some(child => child.id === obs.childId)
    ).length,
    sharedObservations: observations.filter(obs => 
      obs.sharedWithParents && filteredChildren.some(child => child.id === obs.childId)
    ).length
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <SafeIcon icon={FiTrendingUp} className="w-8 h-8 mr-3" />
              Cohort Tracker
            </h1>
            <p className="text-cyan-100 mt-2">Monitor group progress and identify trends across your cohort</p>
            <div className="flex items-center space-x-6 mt-4 text-cyan-100">
              <span>👥 {cohortStats.totalChildren} Children</span>
              <span>📊 Group Analytics</span>
              <span>📈 Progress Tracking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="all">All Rooms</option>
              {rooms.map(room => (
                <option key={room} value={room}>{room}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="month">This Month</option>
              <option value="term">This Term</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div className="flex items-end">
            <div className="text-sm text-gray-600">
              Analyzing {cohortStats.totalChildren} children
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Children</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{cohortStats.totalChildren}</p>
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
              <p className="text-sm font-medium text-gray-600">Average Age</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{Math.floor(cohortStats.averageAge / 12)}y {cohortStats.averageAge % 12}m</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiCalendar} className="w-6 h-6 text-white" />
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
              <p className="text-sm font-medium text-gray-600">Observations</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{cohortStats.totalObservations}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiEye} className="w-6 h-6 text-white" />
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
              <p className="text-sm font-medium text-gray-600">Shared Items</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{cohortStats.sharedObservations}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiTarget} className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cohort Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* EYFS Progress Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">EYFS Progress Distribution</h3>
          <div className="space-y-4">
            {eyfsAreas.map((area, index) => {
              const emerging = Math.floor(Math.random() * 3);
              const developing = Math.floor(Math.random() * 3);
              const secure = Math.floor(Math.random() * 2);
              const total = emerging + developing + secure || 1;
              
              return (
                <div key={area} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{area}</span>
                    <span className="text-gray-500">{total} children</span>
                  </div>
                  <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="bg-red-500" 
                      style={{ width: `${(emerging / total) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-yellow-500" 
                      style={{ width: `${(developing / total) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-green-500" 
                      style={{ width: `${(secure / total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Emerging: {emerging}</span>
                    <span>Developing: {developing}</span>
                    <span>Secure: {secure}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Age Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Age Distribution</h3>
          <div className="space-y-4">
            {[
              { range: '2-3 years', count: filteredChildren.filter(child => {
                const age = Math.floor((new Date() - new Date(child.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000));
                return age >= 2 && age < 3;
              }).length },
              { range: '3-4 years', count: filteredChildren.filter(child => {
                const age = Math.floor((new Date() - new Date(child.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000));
                return age >= 3 && age < 4;
              }).length },
              { range: '4-5 years', count: filteredChildren.filter(child => {
                const age = Math.floor((new Date() - new Date(child.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000));
                return age >= 4 && age < 5;
              }).length }
            ].map((group) => {
              const percentage = filteredChildren.length > 0 ? (group.count / filteredChildren.length) * 100 : 0;
              return (
                <div key={group.range} className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-900">{group.range}</span>
                    <span className="text-sm text-gray-600 ml-2">({group.count} children)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-cyan-600 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{Math.round(percentage)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Children Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-soft p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Children in Cohort</h3>
        
        {filteredChildren.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChildren.map((child, index) => {
              const childObservations = observations.filter(obs => obs.childId === child.id);
              const age = Math.floor((new Date() - new Date(child.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000));
              
              return (
                <motion.div
                  key={child.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + (index * 0.05) }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={child.photo}
                      alt={`${child.firstName} ${child.lastName}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {child.firstName} {child.lastName}
                      </h4>
                      <p className="text-sm text-gray-600">Age: {age} years</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Observations:</span>
                      <span className="font-medium">{childObservations.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shared:</span>
                      <span className="font-medium">
                        {childObservations.filter(obs => obs.sharedWithParents).length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress:</span>
                      <span className="font-medium text-green-600">
                        {Math.floor(Math.random() * 40 + 60)}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <SafeIcon icon={FiUsers} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No children in selected cohort</h3>
            <p className="text-gray-600">
              {selectedRoom === 'all' 
                ? 'Add children to start tracking cohort progress'
                : `No children found in ${selectedRoom}`
              }
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CohortTracker;