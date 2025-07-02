import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import ClassForm from './ClassForm';
import { useApp } from '../../context/AppContext';
import { format, differenceInMonths } from 'date-fns';

const { FiUsers, FiPlus, FiEye, FiBarChart3, FiCalendar, FiUser, FiTrendingUp, FiBook, FiTarget, FiAward, FiClock, FiMapPin, FiEdit, FiTrash2, FiSettings } = FiIcons;

const ClassManagement = () => {
  const { children, observations, classes, dispatch } = useApp(); // Get classes from context
  const [selectedRoom, setSelectedRoom] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [showClassForm, setShowClassForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  const tabs = [
    { id: 'overview', label: 'Classes Overview', icon: FiBarChart3 },
    { id: 'children', label: 'Children by Class', icon: FiUsers },
    { id: 'journey', label: 'Class Journey', icon: FiBook },
    { id: 'statistics', label: 'Statistics', icon: FiTrendingUp }
  ];

  const calculateAge = (dateOfBirth) => {
    const months = differenceInMonths(new Date(), new Date(dateOfBirth));
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) {
      return `${remainingMonths}m`;
    } else if (remainingMonths === 0) {
      return `${years}y`;
    } else {
      return `${years}y ${remainingMonths}m`;
    }
  };

  const getRoomData = (roomName) => {
    const roomChildren = children.filter(child => child.room === roomName);
    const roomObservations = observations.filter(obs => 
      roomChildren.some(child => child.id === obs.childId)
    );

    return {
      children: roomChildren,
      observations: roomObservations,
      averageAge: roomChildren.length > 0 ? 
        Math.round(roomChildren.reduce((sum, child) => {
          const months = differenceInMonths(new Date(), new Date(child.dateOfBirth));
          return sum + months;
        }, 0) / roomChildren.length) : 0,
      recentObservations: roomObservations.filter(obs => 
        new Date(obs.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length
    };
  };

  const handleAddClass = () => {
    setEditingClass(null);
    setShowClassForm(true);
  };

  const handleEditClass = (classData) => {
    setEditingClass(classData);
    setShowClassForm(true);
  };

  const handleDeleteClass = (classId) => {
    if (window.confirm('Are you sure you want to delete this class? This action cannot be undone.')) {
      dispatch({ type: 'DELETE_CLASS', payload: classId });
    }
  };

  const handleSaveClass = (classData) => {
    if (editingClass) {
      // Update existing class
      dispatch({ 
        type: 'UPDATE_CLASS', 
        payload: { ...classData, id: editingClass.id } 
      });
    } else {
      // Add new class
      const newClass = {
        ...classData,
        id: `class-${Date.now()}`,
        createdDate: new Date().toISOString().split('T')[0],
        status: 'active'
      };
      dispatch({ type: 'ADD_CLASS', payload: newClass });
    }
    setShowClassForm(false);
    setEditingClass(null);
  };

  const handleCloseForm = () => {
    setShowClassForm(false);
    setEditingClass(null);
  };

  const filteredClasses = selectedRoom === 'all' ? classes : classes.filter(cls => cls.id === selectedRoom);

  const getGenderDistribution = (roomChildren) => {
    const male = roomChildren.filter(child => child.gender === 'male').length;
    const female = roomChildren.filter(child => child.gender === 'female').length;
    return { male, female };
  };

  const getAgeDistribution = (roomChildren) => {
    const ageGroups = {
      '2-3 years': 0,
      '3-4 years': 0,
      '4-5 years': 0,
      '5+ years': 0
    };

    roomChildren.forEach(child => {
      const ageInYears = Math.floor(differenceInMonths(new Date(), new Date(child.dateOfBirth)) / 12);
      if (ageInYears <= 3) {
        ageGroups['2-3 years']++;
      } else if (ageInYears <= 4) {
        ageGroups['3-4 years']++;
      } else if (ageInYears <= 5) {
        ageGroups['4-5 years']++;
      } else {
        ageGroups['5+ years']++;
      }
    });

    return ageGroups;
  };

  const getProgressStats = (roomObservations) => {
    const eyfsAreas = [
      'Communication and Language',
      'Physical Development',
      'Personal, Social and Emotional Development',
      'Literacy',
      'Mathematics',
      'Understanding the World',
      'Expressive Arts and Design'
    ];

    return eyfsAreas.map(area => {
      const areaObservations = roomObservations.filter(obs => 
        obs.eyfsAreas && obs.eyfsAreas.includes(area)
      );
      return {
        area,
        count: areaObservations.length,
        percentage: roomObservations.length > 0 ? 
          Math.round((areaObservations.length / roomObservations.length) * 100) : 0
      };
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <SafeIcon icon={FiUsers} className="w-8 h-8 mr-3" />
              Class Management
            </h1>
            <p className="text-purple-100 mt-2">Create, manage and monitor classroom activities, progress, and statistics</p>
            <div className="flex items-center space-x-6 mt-4 text-purple-100">
              <span>🏫 {classes.length} Classes</span>
              <span>👥 {children.length} Children</span>
              <span>📊 {observations.length} Observations</span>
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={handleAddClass}
              className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <SafeIcon icon={FiPlus} className="w-5 h-5 mr-2" />
              Add New Class
            </button>
          </div>
        </div>
      </div>

      {/* Class Filter */}
      <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Class</label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Classes</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} ({cls.ageGroup})
                </option>
              ))}
            </select>
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
                    ? 'border-purple-500 text-purple-600'
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
            <div className="space-y-8">
              {/* Class Management Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((classData, index) => {
                  const roomData = getRoomData(classData.name);
                  const occupancyRate = Math.round((roomData.children.length / classData.capacity) * 100);
                  
                  return (
                    <motion.div
                      key={classData.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
                    >
                      {/* Header with Actions */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${classData.color}`}></div>
                          <h3 className="font-semibold text-gray-900">{classData.name}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditClass(classData)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit class"
                          >
                            <SafeIcon icon={FiEdit} className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClass(classData.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete class"
                          >
                            <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Class Info */}
                      <div className="space-y-3 mb-4">
                        <p className="text-sm text-gray-600">{classData.description}</p>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Age Group:</span>
                          <span className="font-medium">{classData.ageGroup}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-medium">{roomData.children.length}/{classData.capacity}</span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${occupancyRate}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Staff:</span>
                          <span className="font-medium">{classData.staff.length} assigned</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">This Week:</span>
                          <span className="font-medium text-green-600">{roomData.recentObservations} observations</span>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedRoom(classData.id)}
                          className="flex-1 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm hover:bg-purple-100 transition-colors"
                        >
                          View Details
                        </button>
                        <Link
                          to="/children"
                          className="px-3 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm hover:bg-gray-100 transition-colors"
                        >
                          <SafeIcon icon={FiPlus} className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Total Classes</p>
                      <p className="text-2xl font-bold text-blue-900 mt-2">{classes.length}</p>
                    </div>
                    <SafeIcon icon={FiMapPin} className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Total Enrollment</p>
                      <p className="text-2xl font-bold text-green-900 mt-2">{children.length}</p>
                    </div>
                    <SafeIcon icon={FiUsers} className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-600">Avg Capacity</p>
                      <p className="text-2xl font-bold text-yellow-900 mt-2">
                        {classes.length > 0 ? Math.round((children.length / classes.reduce((sum, cls) => sum + cls.capacity, 0)) * 100) : 0}%
                      </p>
                    </div>
                    <SafeIcon icon={FiBarChart3} className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Active Classes</p>
                      <p className="text-2xl font-bold text-purple-900 mt-2">
                        {classes.filter(cls => cls.status === 'active').length}
                      </p>
                    </div>
                    <SafeIcon icon={FiTarget} className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Detailed Class Information */}
              {selectedRoom !== 'all' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-200 rounded-xl p-6"
                >
                  {(() => {
                    const selectedClass = classes.find(cls => cls.id === selectedRoom);
                    if (!selectedClass) return null;

                    return (
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-semibold text-gray-900">{selectedClass.name} - Details</h3>
                          <button
                            onClick={() => handleEditClass(selectedClass)}
                            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            <SafeIcon icon={FiSettings} className="w-4 h-4 mr-2" />
                            Manage Class
                          </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Class Information */}
                          <div className="space-y-6">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">Class Information</h4>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Age Group:</span>
                                  <span className="font-medium">{selectedClass.ageGroup}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Capacity:</span>
                                  <span className="font-medium">{selectedClass.capacity} children</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Status:</span>
                                  <span className={`font-medium ${selectedClass.status === 'active' ? 'text-green-600' : 'text-gray-600'}`}>
                                    {selectedClass.status}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Created:</span>
                                  <span className="font-medium">{format(new Date(selectedClass.createdDate), 'MMM dd, yyyy')}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">Schedule</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Open Time:</span>
                                  <span className="font-medium">{selectedClass.schedule.openTime}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Close Time:</span>
                                  <span className="font-medium">{selectedClass.schedule.closeTime}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Lunch Time:</span>
                                  <span className="font-medium">{selectedClass.schedule.lunchTime}</span>
                                </div>
                                {selectedClass.schedule.napTime && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Nap Time:</span>
                                    <span className="font-medium">{selectedClass.schedule.napTime}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Staff and Facilities */}
                          <div className="space-y-6">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">Assigned Staff</h4>
                              <div className="space-y-2">
                                {selectedClass.staff.map((staffMember, index) => (
                                  <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                                    <SafeIcon icon={FiUser} className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-900">{staffMember}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">Facilities</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {selectedClass.facilities.map((facility, index) => (
                                  <div key={index} className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                                    <SafeIcon icon={FiMapPin} className="w-3 h-3 text-blue-600" />
                                    <span className="text-xs font-medium text-blue-800">{facility}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </div>
          )}

          {activeTab === 'children' && (
            <div className="space-y-6">
              {filteredClasses.map(cls => {
                const roomData = getRoomData(cls.name);
                
                return (
                  <div key={cls.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {cls.name} ({roomData.children.length} children)
                      </h3>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">{cls.ageGroup}</span>
                        <Link
                          to="/children"
                          className="inline-flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                        >
                          <SafeIcon icon={FiPlus} className="w-4 h-4 mr-1" />
                          Add Child
                        </Link>
                      </div>
                    </div>

                    {roomData.children.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {roomData.children.map((child, index) => {
                          const childObservations = observations.filter(obs => obs.childId === child.id);
                          
                          return (
                            <motion.div
                              key={child.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
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
                                  <p className="text-sm text-gray-600">Age: {calculateAge(child.dateOfBirth)}</p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Observations:</span>
                                  <span className="font-medium">{childObservations.length}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Shared:</span>
                                  <span className="font-medium text-green-600">
                                    {childObservations.filter(obs => obs.sharedWithParents).length}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Key Worker:</span>
                                  <span className="font-medium text-xs">{child.keyWorker}</span>
                                </div>
                              </div>

                              <div className="mt-4 flex space-x-2">
                                <Link
                                  to={`/children/${child.id}`}
                                  className="flex-1 px-3 py-2 bg-purple-50 text-purple-700 rounded text-sm text-center hover:bg-purple-100 transition-colors"
                                >
                                  View Profile
                                </Link>
                                <Link
                                  to={`/observations/create/${child.id}`}
                                  className="px-3 py-2 bg-gray-50 text-gray-700 rounded text-sm hover:bg-gray-100 transition-colors"
                                >
                                  <SafeIcon icon={FiPlus} className="w-4 h-4" />
                                </Link>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <SafeIcon icon={FiUsers} className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No children in this class yet</p>
                        <Link
                          to="/children"
                          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors mt-4"
                        >
                          <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
                          Add First Child
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'journey' && (
            <div className="space-y-6">
              {filteredClasses.map(cls => {
                const roomData = getRoomData(cls.name);
                const recentObservations = roomData.observations
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 10);

                return (
                  <div key={cls.id} className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {cls.name} - Class Learning Journey
                      </h3>
                      <span className="text-sm text-gray-600">
                        {roomData.observations.length} total observations
                      </span>
                    </div>

                    {recentObservations.length > 0 ? (
                      <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-purple-200"></div>
                        
                        <div className="space-y-6">
                          {recentObservations.map((observation, index) => {
                            const child = children.find(c => c.id === observation.childId);
                            
                            return (
                              <motion.div
                                key={observation.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative flex items-start space-x-4"
                              >
                                {/* Timeline dot */}
                                <div className="relative z-10 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow"></div>
                                
                                {/* Content */}
                                <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-200">
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center space-x-3">
                                      {child && (
                                        <img
                                          src={child.photo}
                                          alt={child.firstName}
                                          className="w-8 h-8 rounded-full object-cover"
                                        />
                                      )}
                                      <div>
                                        <h4 className="font-medium text-gray-900">{observation.title}</h4>
                                        <p className="text-sm text-gray-600">
                                          {child ? `${child.firstName} ${child.lastName}` : 'Unknown Child'}
                                        </p>
                                      </div>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                      {format(new Date(observation.date), 'MMM dd, yyyy')}
                                    </span>
                                  </div>
                                  
                                  <p className="text-sm text-gray-700 mb-3">{observation.description}</p>
                                  
                                  {observation.eyfsAreas && observation.eyfsAreas.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                      {observation.eyfsAreas.slice(0, 3).map(area => (
                                        <span
                                          key={area}
                                          className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs"
                                        >
                                          {area}
                                        </span>
                                      ))}
                                      {observation.eyfsAreas.length > 3 && (
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                          +{observation.eyfsAreas.length - 3} more
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <SafeIcon icon={FiBook} className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No learning journey entries yet</p>
                        <p className="text-sm">Start adding observations to build the class journey</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'statistics' && (
            <div className="space-y-8">
              {filteredClasses.map(cls => {
                const roomData = getRoomData(cls.name);
                const genderDist = getGenderDistribution(roomData.children);
                const ageDist = getAgeDistribution(roomData.children);
                const progressStats = getProgressStats(roomData.observations);

                return (
                  <div key={cls.id} className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {cls.name} - Statistics & Analytics
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Gender Distribution */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="font-medium text-gray-900 mb-4">Gender Distribution</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Male</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ 
                                    width: `${roomData.children.length > 0 ? (genderDist.male / roomData.children.length) * 100 : 0}%` 
                                  }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium w-8">{genderDist.male}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Female</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-pink-500 h-2 rounded-full"
                                  style={{ 
                                    width: `${roomData.children.length > 0 ? (genderDist.female / roomData.children.length) * 100 : 0}%` 
                                  }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium w-8">{genderDist.female}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Age Distribution */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="font-medium text-gray-900 mb-4">Age Distribution</h4>
                        <div className="space-y-3">
                          {Object.entries(ageDist).map(([ageGroup, count]) => (
                            <div key={ageGroup} className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">{ageGroup}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-green-500 h-2 rounded-full"
                                    style={{ 
                                      width: `${roomData.children.length > 0 ? (count / roomData.children.length) * 100 : 0}%` 
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium w-8">{count}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* EYFS Progress */}
                      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="font-medium text-gray-900 mb-4">EYFS Areas Coverage</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {progressStats.map(stat => (
                            <div key={stat.area} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">{stat.area}</span>
                                <span className="font-medium">{stat.count} observations</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-600 h-2 rounded-full"
                                  style={{ width: `${stat.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{roomData.children.length}</div>
                        <div className="text-sm text-blue-800">Total Children</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{roomData.observations.length}</div>
                        <div className="text-sm text-green-800">Observations</div>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                          {Math.round(roomData.averageAge / 12)}y {roomData.averageAge % 12}m
                        </div>
                        <div className="text-sm text-yellow-800">Average Age</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {Math.round((roomData.children.length / cls.capacity) * 100)}%
                        </div>
                        <div className="text-sm text-purple-800">Capacity</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Class Form Modal */}
      {showClassForm && (
        <ClassForm
          classData={editingClass}
          onClose={handleCloseForm}
          onSave={handleSaveClass}
        />
      )}
    </div>
  );
};

export default ClassManagement;