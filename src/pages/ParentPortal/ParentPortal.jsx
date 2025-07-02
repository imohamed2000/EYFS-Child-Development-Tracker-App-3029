import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import { useApp } from '../../context/AppContext';
import { format, differenceInMonths } from 'date-fns';

const { FiUser, FiEye, FiCalendar, FiMail, FiPhone, FiHome, FiTrendingUp } = FiIcons;

const ParentPortal = () => {
  const { childId } = useParams();
  const { children, observations } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  // For demo purposes, we'll show the first child if no childId is provided
  const child = childId ? children.find(c => c.id === childId) : children[0];
  const childObservations = child ? observations.filter(obs => obs.childId === child.id && obs.sharedWithParents) : [];

  if (!child) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to EYFS Tracker Parent Portal</h2>
          <p className="text-gray-600">Please contact your child's nursery for access.</p>
        </div>
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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiHome },
    { id: 'learning', label: 'Learning Journey', icon: FiEye },
    { id: 'progress', label: 'Progress', icon: FiTrendingUp },
    { id: 'contact', label: 'Contact', icon: FiMail },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiUser} className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EYFS Tracker</h1>
                <p className="text-sm text-gray-500">Parent Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{child.parentName}</p>
                <p className="text-xs text-gray-500">Parent/Guardian</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
                alt="Parent"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Child Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-soft p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={child.photo}
              alt={`${child.firstName} ${child.lastName}`}
              className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
            />
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {child.firstName} {child.lastName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <SafeIcon icon={FiCalendar} className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-medium text-gray-900">{calculateAge(child.dateOfBirth)}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <SafeIcon icon={FiUser} className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Room</p>
                    <p className="font-medium text-gray-900">{child.room}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <SafeIcon icon={FiUser} className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Key Worker</p>
                    <p className="font-medium text-gray-900">{child.keyWorker}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-soft mb-8">
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
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6 text-center">
                    <SafeIcon icon={FiEye} className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">{childObservations.length}</p>
                    <p className="text-sm text-blue-800">Shared Observations</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-6 text-center">
                    <SafeIcon icon={FiTrendingUp} className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">78%</p>
                    <p className="text-sm text-green-800">Overall Progress</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-6 text-center">
                    <SafeIcon icon={FiCalendar} className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-600">{child.attendanceDays.length}</p>
                    <p className="text-sm text-purple-800">Days per Week</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h3>
                  <div className="space-y-4">
                    {childObservations.slice(0, 3).map((observation) => (
                      <div key={observation.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{observation.title}</h4>
                          <span className="text-sm text-gray-500">
                            {format(new Date(observation.date), 'MMM dd')}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm mb-3">{observation.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {observation.eyfsAreas.map((area) => (
                            <span key={area} className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs">
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'learning' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Learning Journey</h3>
                
                {childObservations.length > 0 ? (
                  <div className="space-y-6">
                    {childObservations.map((observation) => (
                      <motion.div
                        key={observation.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-200 rounded-lg p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">{observation.title}</h4>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <span className="flex items-center">
                                <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                                {format(new Date(observation.date), 'MMMM dd, yyyy')}
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
                            <span key={area} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              {area}
                            </span>
                          ))}
                        </div>
                        
                        {observation.photos && observation.photos.length > 0 && (
                          <div className="mt-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {observation.photos.map((photo, index) => (
                                <img
                                  key={index}
                                  src={photo}
                                  alt={`Learning moment ${index + 1}`}
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {observation.nextSteps && (
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm font-medium text-blue-900 mb-1">Next Steps:</p>
                            <p className="text-sm text-blue-800">{observation.nextSteps}</p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <SafeIcon icon={FiEye} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No learning updates yet</h3>
                    <p className="text-gray-600">Check back soon for updates on {child.firstName}'s learning journey</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Development Progress</h3>
                
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
                        <h4 className="font-medium text-gray-900 text-sm">{item.area}</h4>
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

            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Key Worker</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <SafeIcon icon={FiUser} className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900">{child.keyWorker}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <SafeIcon icon={FiMail} className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900">sarah.johnson@nursery.com</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <SafeIcon icon={FiPhone} className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900">+44 7123 456789</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Nursery Information</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-600">Room: </span>
                        <span className="text-gray-900 font-medium">{child.room}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Attendance: </span>
                        <span className="text-gray-900 font-medium">{child.attendanceDays.join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Start Date: </span>
                        <span className="text-gray-900 font-medium">
                          {format(new Date(child.startDate), 'MMMM dd, yyyy')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <h4 className="font-medium text-primary-900 mb-2">Need to get in touch?</h4>
                  <p className="text-primary-800 text-sm mb-4">
                    Feel free to contact your child's key worker or the nursery office for any questions or concerns.
                  </p>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentPortal;