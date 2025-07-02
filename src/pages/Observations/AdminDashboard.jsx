import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import CommentBankBuilder from '../../components/CommentBank/CommentBankBuilder';
import TemplateManager from './components/TemplateManager';
import ObservationSettings from './components/ObservationSettings';
import ImportExportManager from './components/ImportExportManager';
import AnalyticsOverview from './components/AnalyticsOverview';
import { useAuth } from '../../context/AuthContext';
import { PERMISSIONS } from '../../data/roles';

const { FiSettings, FiDatabase, FiFileText, FiUpload, FiBarChart3, FiShield } = FiIcons;

const AdminDashboard = () => {
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Check if user has admin permissions
  if (!hasPermission(PERMISSIONS.SETTINGS_SYSTEM)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <SafeIcon icon={FiShield} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiBarChart3, description: 'System analytics and insights' },
    { id: 'comments', label: 'Comment Bank', icon: FiDatabase, description: 'Manage observation comments and suggestions' },
    { id: 'templates', label: 'Templates', icon: FiFileText, description: 'Create and edit observation templates' },
    { id: 'import-export', label: 'Import/Export', icon: FiUpload, description: 'Bulk data management tools' },
    { id: 'settings', label: 'Settings', icon: FiSettings, description: 'System configuration and preferences' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <SafeIcon icon={FiSettings} className="w-8 h-8 mr-3" />
              Observations Admin Dashboard
            </h1>
            <p className="text-purple-100 mt-2">
              Manage observation system settings, templates, and content
            </p>
            <div className="flex items-center space-x-6 mt-4 text-purple-100">
              <span>🔧 System Management</span>
              <span>📝 Content Control</span>
              <span>📊 Analytics & Insights</span>
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">Admin</div>
              <div className="text-sm opacity-80">Full Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-soft border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-6 py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600 bg-purple-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-5 h-5" />
                <div className="text-left">
                  <div>{tab.label}</div>
                  <div className="text-xs opacity-75">{tab.description}</div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && <AnalyticsOverview />}
            {activeTab === 'comments' && <CommentBankBuilder />}
            {activeTab === 'templates' && <TemplateManager />}
            {activeTab === 'import-export' && <ImportExportManager />}
            {activeTab === 'settings' && <ObservationSettings />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;