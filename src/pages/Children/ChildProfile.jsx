import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import { useApp } from '../../context/AppContext';
import { format, differenceInMonths } from 'date-fns';

const { FiArrowLeft, FiEdit, FiPlus, FiUser, FiPhone, FiMail, FiCalendar, FiClock, FiEye, FiTrendingUp } = FiIcons;

const ChildProfile = () => {
  const { id } = useParams();
  const { children, observations } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  
  const child = children.find(c => c.id === id);
  const childObservations = observations.filter(obs => obs.childId === id);

  if (!child) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Child not found</h2>
        <Link
          to="/children"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <SafeIcon icon={FiArrowLeft} className="w-5 h-5 mr-2" />
          Back to Children
        </Link>
      </div>
    );
  }

  const calculateAge = (dateOfBirth) => {
    const months = differenceInMonths(new Date(), new Date(dateOfBirth));
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${remainingMonths} months`;
    } else if (remainingMonths === 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    } else {
      return `${years}y ${remainingMonths}m`;
    }
  };

  const getGenderIcon = (gender) => {
    switch (gender) {
      case 'male':
        return '👦';
      case 'female':
        return '👧';
      default:
        return '👤';
    }
  };

  const getGenderLabel = (gender) => {
    switch (gender) {
      case 'male':
        return 'Male';
      case 'female':
        return 'Female';
      case 'other':
        return 'Other';
      case 'prefer-not-to-say':
        return 'Prefer not to say';
      default:
        return 'Not specified';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiUser },
    { id: 'observations', label: 'Observations', icon: FiEye },
    { id: 'progress', label: 'Progress', icon: FiTrendingUp },
  ];

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/children"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-6 h-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {child.firstName} {child.lastName}
            </h1>
            <p className="text-gray-600 mt-1">
              Age: {calculateAge(child.dateOfBirth)} • Room: {child.room}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to={`/observations/create/${child.id}`}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5 mr-2" />
            Add Observation
          </Link>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <SafeIcon icon={FiEdit} className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Enhanced Child Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-soft p-6 text-white"
      >
        <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative">
            <img
              src={child.photo}
              alt={`${child.firstName} ${child.lastName}`}
              className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0 border-4 border-white border-opacity-30"
            />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl">
              {getGenderIcon(child.gender)}
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3 bg-white bg-opacity-20 rounded-lg p-3">
                <SafeIcon icon={FiUser} className="w-5 h-5" />
                <div>
                  <p className="text-sm opacity-80">Gender</p>
                  <p className="font-medium">{getGenderLabel(child.gender)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-white bg-opacity-20 rounded-lg p-3">
                <SafeIcon icon={FiUser} className="w-5 h-5" />
                <div>
                  <p className="text-sm opacity-80">Key Worker</p>
                  <p className="font-medium">{child.keyWorker}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-white bg-opacity-20 rounded-lg p-3">
                <SafeIcon icon={FiCalendar} className="w-5 h-5" />
                <div>
                  <p className="text-sm opacity-80">Start Date</p>
                  <p className="font-medium">
                    {format(new Date(child.startDate), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-white bg-opacity-20 rounded-lg p-3">
                <SafeIcon icon={FiClock} className="w-5 h-5" />
                <div>
                  <p className="text-sm opacity-80">Attendance</p>
                  <p className="font-medium">{child.attendanceDays.length} days/week</p>
                </div>
              </div>
            </div>

            {/* Attendance Days Visual */}
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="text-sm font-medium mb-3 opacity-80">Weekly Schedule</h4>
              <div className="grid grid-cols-7 gap-2">
                {daysOfWeek.map(day => (
                  <div
                    key={day}
                    className={`text-center p-2 rounded-lg text-xs font-medium ${
                      child.attendanceDays.includes(day)
                        ? 'bg-white bg-opacity-30 text-white'
                        : 'bg-white bg-opacity-10 text-white opacity-50'
                    }`}
                  >
                    <div>{day.slice(0, 3)}</div>
                    <div className="mt-1">
                      {child.attendanceDays.includes(day) ? '✓' : '○'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

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
                    ? 'border-primary-500 text-primary-600'
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date of Birth:</span>
                      <span className="font-medium">{format(new Date(child.dateOfBirth), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-medium">{calculateAge(child.dateOfBirth)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gender:</span>
                      <span className="font-medium">{getGenderLabel(child.gender)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room:</span>
                      <span className="font-medium">{child.room}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Attendance Days:</span>
                      <span className="font-medium">{child.attendanceDays.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 block mb-1">Medical Info:</span>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {child.medicalInfo || 'No medical information recorded'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-1">Dietary Requirements:</span>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {child.dietaryRequirements || 'No dietary requirements recorded'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parent Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Parent Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <SafeIcon icon={FiUser} className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">{child.parentName}</p>
                        <p className="text-sm text-gray-600">Parent/Guardian</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <SafeIcon icon={FiMail} className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">{child.parentEmail}</p>
                        <p className="text-sm text-gray-600">Email Address</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <SafeIcon icon={FiPhone} className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">{child.parentPhone}</p>
                        <p className="text-sm text-gray-600">Phone Number</p>
                      </div>
                    </div>

                    {child.emergencyContact && (
                      <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                        <SafeIcon icon={FiPhone} className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="font-medium text-gray-900">{child.emergencyContact}</p>
                          <p className="text-sm text-red-600">Emergency Contact</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'observations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Observations ({childObservations.length})
                </h3>
                <Link
                  to={`/observations/create/${child.id}`}
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <SafeIcon icon={FiPlus} className="w-5 h-5 mr-2" />
                  Add Observation
                </Link>
              </div>

              {childObservations.length > 0 ? (
                <div className="space-y-4">
                  {childObservations.map((observation) => (
                    <div key={observation.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{observation.title}</h4>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center">
                              <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                              {format(new Date(observation.date), 'MMM dd, yyyy')}
                            </span>
                            <span className="flex items-center">
                              <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
                              {observation.time}
                            </span>
                            <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs">
                              {observation.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{observation.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {observation.eyfsAreas.map((area) => (
                          <span
                            key={area}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                          >
                            {area}
                          </span>
                        ))}
                      </div>

                      {observation.nextSteps && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-medium text-blue-900 mb-1">Next Steps:</p>
                          <p className="text-sm text-blue-800">{observation.nextSteps}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <SafeIcon icon={FiEye} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No observations yet</h3>
                  <p className="text-gray-600 mb-4">Start documenting {child.firstName}'s learning journey</p>
                  <Link
                    to={`/observations/create/${child.id}`}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <SafeIcon icon={FiPlus} className="w-5 h-5 mr-2" />
                    Add First Observation
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Development Progress</h3>
              
              {/* EYFS Areas Progress */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { area: 'Communication and Language', progress: 75 },
                  { area: 'Physical Development', progress: 80 },
                  { area: 'Personal, Social and Emotional Development', progress: 70 },
                  { area: 'Literacy', progress: 65 },
                  { area: 'Mathematics', progress: 85 },
                  { area: 'Understanding the World', progress: 75 },
                  { area: 'Expressive Arts and Design', progress: 90 }
                ].map((item) => (
                  <div key={item.area} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{item.area}</h4>
                      <span className="text-sm text-gray-600">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Development Summary</h4>
                <p className="text-blue-800 text-sm">
                  {child.firstName} is progressing well across all areas of development. 
                  Particular strengths in Expressive Arts and Mathematics. 
                  Continue to support literacy development through reading activities.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChildProfile;