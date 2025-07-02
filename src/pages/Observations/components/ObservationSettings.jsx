import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../../components/common/SafeIcon';

const { FiSettings, FiSave, FiRefreshCw, FiShield, FiClock, FiMail, FiDatabase } = FiIcons;

const ObservationSettings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    autoSave: true,
    autoSaveInterval: 30,
    defaultObservationType: 'Learning Story',
    requireEyfsAreas: true,
    maxMediaFiles: 5,
    maxFileSize: 10,
    
    // Sharing Settings
    defaultShareWithParents: false,
    requireApprovalBeforeSharing: true,
    parentNotificationEmail: true,
    
    // Template Settings
    enableSmartSuggestions: true,
    showCommentBank: true,
    enableTemplatePreview: true,
    
    // Security Settings
    enableAuditLog: true,
    requireReasonForDeletion: true,
    dataRetentionPeriod: 7,
    
    // Notification Settings
    notifyOnNewObservation: true,
    notifyOnSharedObservation: true,
    weeklyDigest: true,
    
    // System Settings
    enableBackup: true,
    backupFrequency: 'daily',
    compressionLevel: 'medium'
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to the backend
    console.log('Saving settings:', settings);
    setHasChanges(false);
    alert('Settings saved successfully!');
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values?')) {
      // Reset to default values
      setSettings({
        autoSave: true,
        autoSaveInterval: 30,
        defaultObservationType: 'Learning Story',
        requireEyfsAreas: true,
        maxMediaFiles: 5,
        maxFileSize: 10,
        defaultShareWithParents: false,
        requireApprovalBeforeSharing: true,
        parentNotificationEmail: true,
        enableSmartSuggestions: true,
        showCommentBank: true,
        enableTemplatePreview: true,
        enableAuditLog: true,
        requireReasonForDeletion: true,
        dataRetentionPeriod: 7,
        notifyOnNewObservation: true,
        notifyOnSharedObservation: true,
        weeklyDigest: true,
        enableBackup: true,
        backupFrequency: 'daily',
        compressionLevel: 'medium'
      });
      setHasChanges(true);
    }
  };

  const SettingSection = ({ title, icon, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <SafeIcon icon={icon} className="w-5 h-5 mr-2 text-purple-600" />
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </motion.div>
  );

  const ToggleSetting = ({ label, description, value, onChange }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{label}</h4>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
      </label>
    </div>
  );

  const SelectSetting = ({ label, description, value, options, onChange }) => (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900">{label}</h4>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>
  );

  const NumberSetting = ({ label, description, value, min, max, unit, onChange }) => (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900">{label}</h4>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-20 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          {unit && <span className="text-sm text-gray-600">{unit}</span>}
        </div>
      </div>
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Observation Settings</h2>
          <p className="text-gray-600 mt-1">
            Configure system-wide settings for the observation module
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleResetSettings}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <SafeIcon icon={FiRefreshCw} className="w-4 h-4 mr-2" />
            Reset to Defaults
          </button>
          <button
            onClick={handleSaveSettings}
            disabled={!hasChanges}
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SafeIcon icon={FiSave} className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      {hasChanges && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
        >
          <p className="text-yellow-800 text-sm">
            ⚠️ You have unsaved changes. Don't forget to save your settings.
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <SettingSection title="General Settings" icon={FiSettings}>
          <ToggleSetting
            label="Auto-save Observations"
            description="Automatically save observations as users type"
            value={settings.autoSave}
            onChange={(value) => handleSettingChange('autoSave', value)}
          />
          
          <NumberSetting
            label="Auto-save Interval"
            description="How often to auto-save (in seconds)"
            value={settings.autoSaveInterval}
            min={10}
            max={300}
            unit="seconds"
            onChange={(value) => handleSettingChange('autoSaveInterval', value)}
          />

          <SelectSetting
            label="Default Observation Type"
            description="Default type when creating new observations"
            value={settings.defaultObservationType}
            options={[
              { value: 'Learning Story', label: 'Learning Story' },
              { value: 'Snapshot', label: 'Snapshot' },
              { value: 'Assessment', label: 'Assessment' },
              { value: 'Group Activity', label: 'Group Activity' }
            ]}
            onChange={(value) => handleSettingChange('defaultObservationType', value)}
          />

          <ToggleSetting
            label="Require EYFS Areas"
            description="Make EYFS area selection mandatory for all observations"
            value={settings.requireEyfsAreas}
            onChange={(value) => handleSettingChange('requireEyfsAreas', value)}
          />

          <NumberSetting
            label="Maximum Media Files"
            description="Maximum number of photos/videos per observation"
            value={settings.maxMediaFiles}
            min={1}
            max={20}
            unit="files"
            onChange={(value) => handleSettingChange('maxMediaFiles', value)}
          />

          <NumberSetting
            label="Maximum File Size"
            description="Maximum size for uploaded media files"
            value={settings.maxFileSize}
            min={1}
            max={50}
            unit="MB"
            onChange={(value) => handleSettingChange('maxFileSize', value)}
          />
        </SettingSection>

        {/* Sharing Settings */}
        <SettingSection title="Sharing & Communication" icon={FiMail}>
          <ToggleSetting
            label="Default Share with Parents"
            description="Share new observations with parents by default"
            value={settings.defaultShareWithParents}
            onChange={(value) => handleSettingChange('defaultShareWithParents', value)}
          />

          <ToggleSetting
            label="Require Approval Before Sharing"
            description="Require manager approval before sharing with parents"
            value={settings.requireApprovalBeforeSharing}
            onChange={(value) => handleSettingChange('requireApprovalBeforeSharing', value)}
          />

          <ToggleSetting
            label="Parent Notification Emails"
            description="Send email notifications to parents when observations are shared"
            value={settings.parentNotificationEmail}
            onChange={(value) => handleSettingChange('parentNotificationEmail', value)}
          />

          <ToggleSetting
            label="New Observation Notifications"
            description="Notify staff when new observations are created"
            value={settings.notifyOnNewObservation}
            onChange={(value) => handleSettingChange('notifyOnNewObservation', value)}
          />

          <ToggleSetting
            label="Shared Observation Notifications"
            description="Notify staff when observations are shared with parents"
            value={settings.notifyOnSharedObservation}
            onChange={(value) => handleSettingChange('notifyOnSharedObservation', value)}
          />

          <ToggleSetting
            label="Weekly Digest"
            description="Send weekly summary emails to staff and managers"
            value={settings.weeklyDigest}
            onChange={(value) => handleSettingChange('weeklyDigest', value)}
          />
        </SettingSection>

        {/* Template & AI Settings */}
        <SettingSection title="Templates & Suggestions" icon={FiDatabase}>
          <ToggleSetting
            label="Enable Smart Suggestions"
            description="Show AI-powered suggestions while writing observations"
            value={settings.enableSmartSuggestions}
            onChange={(value) => handleSettingChange('enableSmartSuggestions', value)}
          />

          <ToggleSetting
            label="Show Comment Bank"
            description="Display comment bank suggestions in observation forms"
            value={settings.showCommentBank}
            onChange={(value) => handleSettingChange('showCommentBank', value)}
          />

          <ToggleSetting
            label="Enable Template Preview"
            description="Show preview of templates before applying them"
            value={settings.enableTemplatePreview}
            onChange={(value) => handleSettingChange('enableTemplatePreview', value)}
          />
        </SettingSection>

        {/* Security & Compliance */}
        <SettingSection title="Security & Compliance" icon={FiShield}>
          <ToggleSetting
            label="Enable Audit Log"
            description="Log all observation creation, editing, and deletion activities"
            value={settings.enableAuditLog}
            onChange={(value) => handleSettingChange('enableAuditLog', value)}
          />

          <ToggleSetting
            label="Require Reason for Deletion"
            description="Require users to provide a reason when deleting observations"
            value={settings.requireReasonForDeletion}
            onChange={(value) => handleSettingChange('requireReasonForDeletion', value)}
          />

          <NumberSetting
            label="Data Retention Period"
            description="How long to keep deleted observations in the system"
            value={settings.dataRetentionPeriod}
            min={1}
            max={365}
            unit="years"
            onChange={(value) => handleSettingChange('dataRetentionPeriod', value)}
          />

          <ToggleSetting
            label="Enable Automatic Backup"
            description="Automatically backup observation data"
            value={settings.enableBackup}
            onChange={(value) => handleSettingChange('enableBackup', value)}
          />

          <SelectSetting
            label="Backup Frequency"
            description="How often to create automatic backups"
            value={settings.backupFrequency}
            options={[
              { value: 'hourly', label: 'Hourly' },
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' }
            ]}
            onChange={(value) => handleSettingChange('backupFrequency', value)}
          />

          <SelectSetting
            label="Compression Level"
            description="Compression level for backup files"
            value={settings.compressionLevel}
            options={[
              { value: 'low', label: 'Low (Faster)' },
              { value: 'medium', label: 'Medium (Balanced)' },
              { value: 'high', label: 'High (Smaller files)' }
            ]}
            onChange={(value) => handleSettingChange('compressionLevel', value)}
          />
        </SettingSection>
      </div>

      {/* System Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <SafeIcon icon={FiDatabase} className="w-5 h-5 mr-2" />
          System Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-blue-700 font-medium">Module Version:</span>
            <span className="text-blue-800 ml-2">v2.1.0</span>
          </div>
          <div>
            <span className="text-blue-700 font-medium">Last Updated:</span>
            <span className="text-blue-800 ml-2">January 2024</span>
          </div>
          <div>
            <span className="text-blue-700 font-medium">Database Version:</span>
            <span className="text-blue-800 ml-2">v1.5.2</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ObservationSettings;