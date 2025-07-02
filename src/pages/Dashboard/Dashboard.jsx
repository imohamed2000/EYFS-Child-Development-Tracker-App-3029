import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import { useApp } from '../../context/AppContext';
import { format } from 'date-fns';

const { FiUsers, FiEye, FiBarChart3, FiPlus, FiCalendar, FiClock, FiTrendingUp, FiAlert } = FiIcons;

const Dashboard = () => {
  const { children, observations } = useApp();

  const stats = [
    {
      title: 'Total Children',
      value: children.length,
      icon: FiUsers,
      color: 'bg-blue-500',
      change: '+2 this month'
    },
    {
      title: 'Observations',
      value: observations.length,
      icon: FiEye,
      color: 'bg-green-500',
      change: '+12 this week'
    },
    {
      title: 'Reports Generated',
      value: 8,
      icon: FiBarChart3,
      color: 'bg-purple-500',
      change: '+3 this month'
    },
    {
      title: 'Avg. Progress',
      value: '85%',
      icon: FiTrendingUp,
      color: 'bg-orange-500',
      change: '+5% this month'
    }
  ];

  const recentObservations = observations.slice(0, 3);
  const upcomingTasks = [
    { id: 1, task: 'Complete Emma\'s development report', due: '2024-01-20', priority: 'high' },
    { id: 2, task: 'Parent meeting with Oliver\'s family', due: '2024-01-22', priority: 'medium' },
    { id: 3, task: 'Update Sophia\'s learning journey', due: '2024-01-25', priority: 'low' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, Sarah! Here's what's happening today.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/observations/create"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5 mr-2" />
            New Observation
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Observations */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Observations</h2>
            <Link
              to="/observations"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentObservations.map((observation) => {
              const child = children.find(c => c.id === observation.childId);
              return (
                <div key={observation.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={child?.photo || 'https://via.placeholder.com/40'}
                    alt={child?.firstName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {child?.firstName} {child?.lastName}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{observation.title}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-500 flex items-center">
                        <SafeIcon icon={FiCalendar} className="w-3 h-3 mr-1" />
                        {format(new Date(observation.date), 'MMM dd')}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <SafeIcon icon={FiClock} className="w-3 h-3 mr-1" />
                        {observation.time}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Tasks</h2>
            <SafeIcon icon={FiAlert} className="w-5 h-5 text-orange-500" />
          </div>
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  task.priority === 'high' ? 'bg-red-500' :
                  task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{task.task}</p>
                  <p className="text-xs text-gray-500 mt-1">Due: {format(new Date(task.due), 'MMM dd, yyyy')}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-soft p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/observations/create"
            className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <SafeIcon icon={FiEye} className="w-6 h-6 text-primary-600" />
            <span className="font-medium text-gray-900">Add Observation</span>
          </Link>
          <Link
            to="/children"
            className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <SafeIcon icon={FiUsers} className="w-6 h-6 text-primary-600" />
            <span className="font-medium text-gray-900">Manage Children</span>
          </Link>
          <Link
            to="/reports"
            className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <SafeIcon icon={FiBarChart3} className="w-6 h-6 text-primary-600" />
            <span className="font-medium text-gray-900">Generate Report</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;