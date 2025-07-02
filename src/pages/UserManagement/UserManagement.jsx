import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import PermissionGuard from '../../components/common/PermissionGuard';
import UserForm from './UserForm';
import RoleManagement from './RoleManagement';
import PasswordResetModal from './PasswordResetModal';
import { useAuth } from '../../context/AuthContext';
import { ROLES, PERMISSIONS } from '../../data/roles';
import { format } from 'date-fns';

const { FiUsers, FiPlus, FiEdit, FiTrash2, FiShield, FiMail, FiPhone, FiCalendar, FiUser, FiLock, FiKey } = FiIcons;

const UserManagement = () => {
  const { user: currentUser, users, addUser, updateUser, deleteUser, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [resetUserId, setResetUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const tabs = [
    { id: 'users', label: 'Users', icon: FiUsers },
    { id: 'roles', label: 'Roles & Permissions', icon: FiShield }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = () => {
    setEditingUser(null);
    setShowUserForm(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleDeleteUser = (userId) => {
    const user = users.find(u => u.id === userId);
    if (window.confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
      try {
        deleteUser(userId);
        alert('User deleted successfully');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handlePasswordReset = (userId) => {
    setResetUserId(userId);
    setShowPasswordReset(true);
  };

  const handleCloseForm = () => {
    setShowUserForm(false);
    setEditingUser(null);
  };

  const handleSaveUser = (userData) => {
    try {
      if (editingUser) {
        updateUser({ ...userData, id: editingUser.id });
        alert('User updated successfully');
      } else {
        addUser(userData);
        alert('User created successfully');
      }
      handleCloseForm();
    } catch (error) {
      alert(error.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleInfo = (roleId) => {
    return Object.values(ROLES).find(role => role.id === roleId);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return '✅';
      case 'inactive': return '⏸️';
      case 'suspended': return '🚫';
      default: return '❓';
    }
  };

  return (
    <PermissionGuard permission={PERMISSIONS.USERS_VIEW}>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <SafeIcon icon={FiUsers} className="w-8 h-8 mr-3" />
                User Management
              </h1>
              <p className="text-indigo-100 mt-2">Manage users, roles, and permissions</p>
              <div className="flex items-center space-x-6 mt-4 text-indigo-100">
                <span>👥 {users.length} Total Users</span>
                <span>✅ {users.filter(u => u.status === 'active').length} Active</span>
                <span>🔒 {Object.keys(ROLES).length} Roles</span>
                <span>⚡ {Object.keys(PERMISSIONS).length} Permissions</span>
              </div>
            </div>
            <PermissionGuard permission={PERMISSIONS.USERS_CREATE}>
              <div className="mt-4 sm:mt-0">
                <button
                  onClick={handleAddUser}
                  className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <SafeIcon icon={FiPlus} className="w-5 h-5 mr-2" />
                  Add User
                </button>
              </div>
            </PermissionGuard>
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
                      ? 'border-indigo-500 text-indigo-600'
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
            {activeTab === 'users' && (
              <div className="space-y-6">
                {/* Filters */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64"
                      />
                    </div>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="all">All Roles</option>
                      {Object.values(ROLES).map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                  <div className="text-sm text-gray-600">
                    Showing {filteredUsers.length} of {users.length} users
                  </div>
                </div>

                {/* Users Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredUsers.map((user, index) => {
                    const roleInfo = getRoleInfo(user.role);
                    return (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
                      >
                        {/* User Header */}
                        <div className="flex items-center space-x-4 mb-4">
                          <img
                            src={user.avatar}
                            alt={`${user.firstName} ${user.lastName}`}
                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {user.firstName} {user.lastName}
                            </h3>
                            <p className="text-sm text-gray-600 truncate">{user.email}</p>
                            <p className="text-xs text-gray-500">@{user.username}</p>
                          </div>
                        </div>

                        {/* User Details */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Role:</span>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${roleInfo?.color || 'bg-gray-100 text-gray-800'}`}>
                              {roleInfo?.name || user.role}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Status:</span>
                            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                              {getStatusIcon(user.status)} {user.status}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Phone:</span>
                            <span className="text-sm text-gray-900">{user.phone}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Rooms:</span>
                            <span className="text-sm text-gray-900">
                              {user.rooms.length > 1 ? `${user.rooms.length} rooms` : user.rooms[0]}
                            </span>
                          </div>

                          {user.lastLogin && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Last Login:</span>
                              <span className="text-xs text-gray-500">
                                {format(new Date(user.lastLogin), 'MMM dd, HH:mm')}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex space-x-2">
                            <PermissionGuard permission={PERMISSIONS.USERS_EDIT}>
                              <button
                                onClick={() => handleEditUser(user)}
                                className="inline-flex items-center px-3 py-1.5 text-sm bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
                              >
                                <SafeIcon icon={FiEdit} className="w-4 h-4 mr-1" />
                                Edit
                              </button>
                            </PermissionGuard>
                            
                            {hasPermission(PERMISSIONS.USERS_EDIT) && (
                              <button
                                onClick={() => handlePasswordReset(user.id)}
                                className="inline-flex items-center px-3 py-1.5 text-sm bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors"
                                title="Reset Password"
                              >
                                <SafeIcon icon={FiKey} className="w-4 h-4" />
                              </button>
                            )}
                          </div>

                          <PermissionGuard permission={PERMISSIONS.USERS_DELETE}>
                            {user.id !== currentUser.id && (
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="inline-flex items-center px-3 py-1.5 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                              >
                                <SafeIcon icon={FiTrash2} className="w-4 h-4 mr-1" />
                                Delete
                              </button>
                            )}
                          </PermissionGuard>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <SafeIcon icon={FiUsers} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                    <p className="text-gray-600">
                      {searchTerm || selectedRole !== 'all' || selectedStatus !== 'all'
                        ? 'Try adjusting your search criteria'
                        : 'Get started by adding your first user'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'roles' && <RoleManagement />}
          </div>
        </div>

        {/* User Form Modal */}
        {showUserForm && (
          <UserForm
            user={editingUser}
            onClose={handleCloseForm}
            onSave={handleSaveUser}
          />
        )}

        {/* Password Reset Modal */}
        {showPasswordReset && (
          <PasswordResetModal
            userId={resetUserId}
            onClose={() => {
              setShowPasswordReset(false);
              setResetUserId(null);
            }}
          />
        )}
      </div>
    </PermissionGuard>
  );
};

export default UserManagement;