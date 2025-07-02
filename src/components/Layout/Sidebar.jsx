import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {
  FiHome, FiUsers, FiEye, FiBarChart3, FiSettings, FiX, FiUser, FiBook,
  FiCalendar, FiMessageCircle, FiClipboard, FiCamera, FiTrendingUp,
  FiFileText, FiAward, FiTarget, FiSend, FiShield, FiGrid, FiPlay
} = FiIcons;

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/children', icon: FiUsers, label: 'Children' },
    { path: '/observations', icon: FiEye, label: 'Observations' },
    { path: '/learning-journeys', icon: FiBook, label: 'Learning Journeys' },
    { path: '/assessments', icon: FiClipboard, label: 'Assessments' },
    { path: '/planning', icon: FiCalendar, label: 'Planning' },
    { path: '/milestones', icon: FiTarget, label: 'Milestones' },
    { path: '/class-management', icon: FiGrid, label: 'Class Management' },
    { path: '/parent-communication', icon: FiMessageCircle, label: 'Parent Communication' },
    { path: '/cohort-tracker', icon: FiTrendingUp, label: 'Cohort Tracker' },
    { path: '/user-management', icon: FiShield, label: 'User Management' },
    { path: '/reports', icon: FiBarChart3, label: 'Reports' },
    { path: '/get-started', icon: FiPlay, label: 'Get Started' },
    { path: '/settings', icon: FiSettings, label: 'Settings' }
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40
      }
    }
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg lg:shadow-none"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary-500 to-primary-600">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiBook} className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">EYFS Tracker</h1>
                <p className="text-sm text-primary-100">v1.3 - Complete Solution</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <SafeIcon icon={FiX} className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <SafeIcon icon={item.icon} className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Sarah Johnson</p>
                <p className="text-xs text-gray-500 truncate">Lead Practitioner</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-gray-200">
          {/* Header */}
          <div className="flex items-center p-6 border-b border-gray-200 bg-gradient-to-r from-primary-500 to-primary-600">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiBook} className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">EYFS Tracker</h1>
                <p className="text-sm text-primary-100">v1.3 - Complete Solution</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <SafeIcon icon={item.icon} className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Sarah Johnson</p>
                <p className="text-xs text-gray-500 truncate">Lead Practitioner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;