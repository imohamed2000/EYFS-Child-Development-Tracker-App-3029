import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import { ROLES, PERMISSIONS } from '../../data/roles';

const { FiShield, FiUsers, FiCheck, FiX, FiInfo } = FiIcons;

const RoleManagement = () => {
  const [selectedRole, setSelectedRole] = useState('practitioner');

  const groupedPermissions = {
    'Children Management': [
      PERMISSIONS.CHILDREN_VIEW,
      PERMISSIONS.CHILDREN_CREATE,
      PERMISSIONS.CHILDREN_EDIT,
      PERMISSIONS.CHILDREN_DELETE
    ],
    'Observations': [
      PERMISSIONS.OBSERVATIONS_VIEW,
      PERMISSIONS.OBSERVATIONS_CREATE,
      PERMISSIONS.OBSERVATIONS_EDIT,
      PERMISSIONS.OBSERVATIONS_DELETE,
      PERMISSIONS.OBSERVATIONS_SHARE
    ],
    'Assessments': [
      PERMISSIONS.ASSESSMENTS_VIEW,
      PERMISSIONS.ASSESSMENTS_CREATE,
      PERMISSIONS.ASSESSMENTS_EDIT,
      PERMISSIONS.ASSESSMENTS_DELETE
    ],
    'Reports & Planning': [
      PERMISSIONS.REPORTS_VIEW,
      PERMISSIONS.REPORTS_GENERATE,
      PERMISSIONS.REPORTS_EXPORT,
      PERMISSIONS.PLANNING_VIEW,
      PERMISSIONS.PLANNING_CREATE,
      PERMISSIONS.PLANNING_EDIT,
      PERMISSIONS.PLANNING_DELETE
    ],
    'Communication': [
      PERMISSIONS.COMMUNICATION_VIEW,
      PERMISSIONS.COMMUNICATION_SEND
    ],
    'User Management': [
      PERMISSIONS.USERS_VIEW,
      PERMISSIONS.USERS_CREATE,
      PERMISSIONS.USERS_EDIT,
      PERMISSIONS.USERS_DELETE,
      PERMISSIONS.USERS_MANAGE_ROLES
    ],
    'System': [
      PERMISSIONS.SETTINGS_VIEW,
      PERMISSIONS.SETTINGS_EDIT,
      PERMISSIONS.SETTINGS_SYSTEM,
      PERMISSIONS.DATA_EXPORT,
      PERMISSIONS.DATA_IMPORT,
      PERMISSIONS.DATA_BACKUP
    ]
  };

  const formatPermissionName = (permission) => {
    return permission
      .split(':')[1]
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getPermissionDescription = (permission) => {
    const descriptions = {
      [PERMISSIONS.CHILDREN_VIEW]: 'View children profiles and information',
      [PERMISSIONS.CHILDREN_CREATE]: 'Add new children to the system',
      [PERMISSIONS.CHILDREN_EDIT]: 'Edit existing children profiles',
      [PERMISSIONS.CHILDREN_DELETE]: 'Remove children from the system',
      [PERMISSIONS.OBSERVATIONS_VIEW]: 'View observations and learning stories',
      [PERMISSIONS.OBSERVATIONS_CREATE]: 'Create new observations',
      [PERMISSIONS.OBSERVATIONS_EDIT]: 'Edit existing observations',
      [PERMISSIONS.OBSERVATIONS_DELETE]: 'Delete observations',
      [PERMISSIONS.OBSERVATIONS_SHARE]: 'Share observations with parents',
      [PERMISSIONS.ASSESSMENTS_VIEW]: 'View assessment data and reports',
      [PERMISSIONS.ASSESSMENTS_CREATE]: 'Create new assessments',
      [PERMISSIONS.ASSESSMENTS_EDIT]: 'Edit existing assessments',
      [PERMISSIONS.ASSESSMENTS_DELETE]: 'Delete assessment records',
      [PERMISSIONS.REPORTS_VIEW]: 'View generated reports',
      [PERMISSIONS.REPORTS_GENERATE]: 'Generate new reports',
      [PERMISSIONS.REPORTS_EXPORT]: 'Export reports to various formats',
      [PERMISSIONS.PLANNING_VIEW]: 'View planning and schedules',
      [PERMISSIONS.PLANNING_CREATE]: 'Create new plans and schedules',
      [PERMISSIONS.PLANNING_EDIT]: 'Edit existing plans',
      [PERMISSIONS.PLANNING_DELETE]: 'Delete plans and schedules',
      [PERMISSIONS.COMMUNICATION_VIEW]: 'View parent communications',
      [PERMISSIONS.COMMUNICATION_SEND]: 'Send messages to parents',
      [PERMISSIONS.USERS_VIEW]: 'View user accounts and profiles',
      [PERMISSIONS.USERS_CREATE]: 'Create new user accounts',
      [PERMISSIONS.USERS_EDIT]: 'Edit user profiles and settings',
      [PERMISSIONS.USERS_DELETE]: 'Delete user accounts',
      [PERMISSIONS.USERS_MANAGE_ROLES]: 'Assign and manage user roles',
      [PERMISSIONS.SETTINGS_VIEW]: 'View system settings',
      [PERMISSIONS.SETTINGS_EDIT]: 'Modify system settings',
      [PERMISSIONS.SETTINGS_SYSTEM]: 'Access advanced system settings',
      [PERMISSIONS.DATA_EXPORT]: 'Export system data',
      [PERMISSIONS.DATA_IMPORT]: 'Import data into the system',
      [PERMISSIONS.DATA_BACKUP]: 'Create and manage backups'
    };
    return descriptions[permission] || 'Permission description not available';
  };

  const selectedRoleData = ROLES[selectedRole.toUpperCase()];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Role & Permission Management</h3>
          <p className="text-sm text-gray-600 mt-1">
            Manage roles and their associated permissions across the system
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Roles List */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Available Roles</h4>
          <div className="space-y-2">
            {Object.values(ROLES).map((role, index) => (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedRole(role.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedRole === role.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiShield} className="w-5 h-5 text-indigo-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{role.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{role.description}</div>
                    <div className="flex items-center mt-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${role.color}`}>
                        {role.permissions.length} permissions
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Role Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedRoleData && (
            <>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <SafeIcon icon={FiShield} className="w-6 h-6 text-indigo-600" />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{selectedRoleData.name}</h4>
                    <p className="text-gray-600">{selectedRoleData.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedRoleData.permissions.length}
                    </div>
                    <div className="text-sm text-blue-800">Total Permissions</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {Object.keys(groupedPermissions).filter(group => 
                        groupedPermissions[group].some(perm => selectedRoleData.permissions.includes(perm))
                      ).length}
                    </div>
                    <div className="text-sm text-green-800">Permission Groups</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {selectedRoleData.id === 'administrator' ? 'Full' : 'Limited'}
                    </div>
                    <div className="text-sm text-purple-800">Access Level</div>
                  </div>
                </div>
              </div>

              {/* Permissions Breakdown */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-6">Permission Breakdown</h4>
                
                <div className="space-y-6">
                  {Object.entries(groupedPermissions).map(([groupName, permissions]) => {
                    const hasAnyPermission = permissions.some(perm => selectedRoleData.permissions.includes(perm));
                    const permissionCount = permissions.filter(perm => selectedRoleData.permissions.includes(perm)).length;
                    
                    return (
                      <motion.div
                        key={groupName}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`border rounded-lg p-4 ${
                          hasAnyPermission ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-medium text-gray-900 flex items-center">
                            {hasAnyPermission ? (
                              <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-600 mr-2" />
                            ) : (
                              <SafeIcon icon={FiX} className="w-4 h-4 text-gray-400 mr-2" />
                            )}
                            {groupName}
                          </h5>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            hasAnyPermission 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {permissionCount}/{permissions.length} permissions
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {permissions.map(permission => {
                            const hasPermission = selectedRoleData.permissions.includes(permission);
                            return (
                              <div
                                key={permission}
                                className={`flex items-center space-x-2 p-2 rounded text-sm ${
                                  hasPermission 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {hasPermission ? (
                                  <SafeIcon icon={FiCheck} className="w-3 h-3 text-green-600" />
                                ) : (
                                  <SafeIcon icon={FiX} className="w-3 h-3 text-gray-400" />
                                )}
                                <span className="font-medium">{formatPermissionName(permission)}</span>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Permission Details */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiInfo} className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">Permission System Information</h4>
                    <div className="text-sm text-blue-800 space-y-1">
                      <p>• Permissions control access to specific features and actions within the system</p>
                      <p>• Each role has a predefined set of permissions appropriate for their responsibilities</p>
                      <p>• Users inherit permissions based on their assigned role</p>
                      <p>• System administrators have full access to all features and settings</p>
                      <p>• Permission changes take effect immediately for all users with that role</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;