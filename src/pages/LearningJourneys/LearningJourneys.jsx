import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import { useApp } from '../../context/AppContext';
import { format, differenceInMonths } from 'date-fns';

const { FiBook, FiPlus, FiEye, FiCalendar, FiUser, FiTrendingUp, FiImage, FiVideo, FiFileText } = FiIcons;

const LearningJourneys = () => {
  const { children, observations } = useApp();
  const [selectedChild, setSelectedChild] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

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

  const getChildJourney = (childId) => {
    const child = children.find(c => c.id === childId);
    const childObservations = observations.filter(obs => obs.childId === childId);
    
    return {
      child,
      observations: childObservations,
      totalObservations: childObservations.length,
      sharedObservations: childObservations.filter(obs => obs.sharedWithParents).length,
      eyfsAreas: [...new Set(childObservations.flatMap(obs => obs.eyfsAreas || []))],
      latestObservation: childObservations.sort((a, b) => new Date(b.date) - new Date(a.date))[0],
      mediaCount: childObservations.reduce((total, obs) => total + (obs.mediaFiles?.length || 0), 0)
    };
  };

  const filteredJourneys = selectedChild === 'all' 
    ? children.map(child => getChildJourney(child.id))
    : children.filter(child => child.id === selectedChild).map(child => getChildJourney(child.id));

  const getProgressColor = (count) => {
    if (count >= 10) return 'text-green-600 bg-green-100';
    if (count >= 5) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getProgressPercentage = (observations) => {
    // Calculate progress based on number of observations and EYFS coverage
    const baseScore = Math.min(observations.length * 10, 70);
    const eyfsBonus = Math.min(new Set(observations.flatMap(obs => obs.eyfsAreas || [])).size * 5, 30);
    return Math.min(baseScore + eyfsBonus, 100);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <SafeIcon icon={FiBook} className="w-8 h-8 mr-3" />
              Learning Journeys
            </h1>
            <p className="text-purple-100 mt-2">Track and celebrate each child's unique learning story</p>
            <div className="flex items-center space-x-6 mt-4 text-purple-100">
              <span>📚 {children.length} Active Journeys</span>
              <span>📝 {observations.length} Total Entries</span>
              <span>📤 {observations.filter(obs => obs.sharedWithParents).length} Shared</span>
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              to="/observations/create"
              className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <SafeIcon icon={FiPlus} className="w-5 h-5 mr-2" />
              Add Entry
            </Link>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Child</label>
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Children</option>
                {children.map(child => (
                  <option key={child.id} value={child.id}>
                    {child.firstName} {child.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-purple-100 text-purple-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <SafeIcon icon={FiUser} className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-purple-100 text-purple-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <SafeIcon icon={FiCalendar} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Learning Journeys Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJourneys.map((journey, index) => (
            <motion.div
              key={journey.child.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-200 border border-gray-100 overflow-hidden"
            >
              {/* Journey Header */}
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-purple-400 to-purple-500"></div>
                <div className="absolute -bottom-8 left-6">
                  <img
                    src={journey.child.photo}
                    alt={`${journey.child.firstName} ${journey.child.lastName}`}
                    className="w-16 h-16 rounded-full border-4 border-white object-cover"
                  />
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getProgressColor(journey.totalObservations)}`}>
                    {getProgressPercentage(journey.observations)}% Complete
                  </span>
                </div>
              </div>

              <div className="pt-12 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {journey.child.firstName} {journey.child.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{journey.child.room}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Age: {calculateAge(journey.child.dateOfBirth)}
                    </p>
                  </div>
                </div>

                {/* Journey Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-lg font-bold text-purple-600">{journey.totalObservations}</p>
                    <p className="text-xs text-purple-800">Entries</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-lg font-bold text-green-600">{journey.sharedObservations}</p>
                    <p className="text-xs text-green-800">Shared</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-lg font-bold text-blue-600">{journey.mediaCount}</p>
                    <p className="text-xs text-blue-800">Media</p>
                  </div>
                </div>

                {/* EYFS Areas */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">EYFS Areas Covered:</p>
                  <div className="flex flex-wrap gap-1">
                    {journey.eyfsAreas.slice(0, 3).map(area => (
                      <span key={area} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {area.split(' ')[0]}...
                      </span>
                    ))}
                    {journey.eyfsAreas.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{journey.eyfsAreas.length - 3}
                      </span>
                    )}
                    {journey.eyfsAreas.length === 0 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        No areas yet
                      </span>
                    )}
                  </div>
                </div>

                {/* Latest Entry */}
                {journey.latestObservation ? (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-1">Latest Entry:</p>
                    <p className="text-xs text-gray-600 line-clamp-2">{journey.latestObservation.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {format(new Date(journey.latestObservation.date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                ) : (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 text-center">No observations yet</p>
                  </div>
                )}

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Learning Progress</span>
                    <span className="text-gray-900">{getProgressPercentage(journey.observations)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage(journey.observations)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link
                    to={`/learning-journeys/${journey.child.id}`}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  >
                    <SafeIcon icon={FiBook} className="w-4 h-4 mr-1" />
                    View Journey
                  </Link>
                  <Link
                    to={`/observations/create/${journey.child.id}`}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <SafeIcon icon={FiPlus} className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Timeline View */
        <div className="space-y-6">
          {selectedChild === 'all' ? (
            <div className="text-center py-12">
              <SafeIcon icon={FiCalendar} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Child</h3>
              <p className="text-gray-600">Choose a specific child to view their timeline</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Learning Timeline - {filteredJourneys[0]?.child.firstName} {filteredJourneys[0]?.child.lastName}
              </h3>
              
              {filteredJourneys[0]?.observations.length > 0 ? (
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-purple-200"></div>
                  
                  {/* Timeline Items */}
                  <div className="space-y-6">
                    {filteredJourneys[0]?.observations
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((observation, index) => (
                        <motion.div
                          key={observation.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative flex items-start space-x-4"
                        >
                          {/* Timeline Dot */}
                          <div className="relative z-10 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow"></div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0 pb-6">
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="text-lg font-medium text-gray-900">{observation.title}</h4>
                                <span className="text-sm text-gray-500">
                                  {format(new Date(observation.date), 'MMM dd, yyyy')}
                                </span>
                              </div>
                              <p className="text-gray-700 mb-3">{observation.description}</p>
                              
                              <div className="flex flex-wrap gap-2 mb-3">
                                {(observation.eyfsAreas || []).map(area => (
                                  <span key={area} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                                    {area}
                                  </span>
                                ))}
                              </div>
                              
                              {observation.mediaFiles && observation.mediaFiles.length > 0 && (
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <SafeIcon icon={FiImage} className="w-4 h-4" />
                                  <span>{observation.mediaFiles.length} media file(s)</span>
                                </div>
                              )}
                              
                              {observation.nextSteps && (
                                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                  <p className="text-sm font-medium text-blue-900 mb-1">Next Steps:</p>
                                  <p className="text-sm text-blue-800">{observation.nextSteps}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <SafeIcon icon={FiBook} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No observations yet</h3>
                  <p className="text-gray-600 mb-4">Start documenting this child's learning journey</p>
                  <Link
                    to={`/observations/create/${selectedChild}`}
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <SafeIcon icon={FiPlus} className="w-5 h-5 mr-2" />
                    Add First Observation
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {filteredJourneys.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiBook} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Learning Journeys Found</h3>
          <p className="text-gray-600 mb-6">Start creating observations to build learning journeys</p>
          <Link
            to="/observations/create"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5 mr-2" />
            Create First Entry
          </Link>
        </div>
      )}
    </div>
  );
};

export default LearningJourneys;