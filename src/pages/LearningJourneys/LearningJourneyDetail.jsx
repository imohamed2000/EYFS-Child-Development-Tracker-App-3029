import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import { useApp } from '../../context/AppContext';
import { format, differenceInMonths } from 'date-fns';

const { FiArrowLeft, FiPlus, FiDownload, FiShare2, FiEye, FiCalendar, FiTrendingUp, FiBook, FiImage, FiVideo, FiUser, FiClock, FiTarget } = FiIcons;

const LearningJourneyDetail = () => {
  const { childId } = useParams();
  const { children, observations } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedEyfsArea, setSelectedEyfsArea] = useState('all');

  const child = children.find(c => c.id === childId);
  const childObservations = observations.filter(obs => obs.childId === childId);

  if (!child) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Learning Journey not found</h2>
        <Link to="/learning-journeys" className="text-purple-600 hover:text-purple-700">
          ← Back to Learning Journeys
        </Link>
      </div>
    );
  }

  const calculateAge = (dateOfBirth) => {
    const months = differenceInMonths(new Date(), new Date(dateOfBirth));
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return years > 0 ? `${years}y ${remainingMonths}m` : `${remainingMonths} months`;
  };

  const eyfsAreas = [...new Set(childObservations.flatMap(obs => obs.eyfsAreas || []))];

  const filteredObservations = childObservations.filter(obs => {
    const matchesEyfs = selectedEyfsArea === 'all' || (obs.eyfsAreas && obs.eyfsAreas.includes(selectedEyfsArea));
    const matchesPeriod = selectedPeriod === 'all' || 
      (selectedPeriod === 'month' && new Date(obs.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
      (selectedPeriod === 'term' && new Date(obs.date) >= new Date(Date.now() - 90 * 24 * 60 * 60 * 1000));
    return matchesEyfs && matchesPeriod;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  const journeyStats = {
    totalObservations: childObservations.length,
    sharedWithParents: childObservations.filter(obs => obs.sharedWithParents).length,
    eyfsAreasCovered: eyfsAreas.length,
    mediaFiles: childObservations.reduce((total, obs) => total + (obs.mediaFiles?.length || 0), 0),
    recentActivity: childObservations.filter(obs => 
      new Date(obs.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length
  };

  const getProgressPercentage = () => {
    const baseScore = Math.min(journeyStats.totalObservations * 8, 60);
    const eyfsBonus = Math.min(journeyStats.eyfsAreasCovered * 5, 35);
    const mediaBonus = Math.min(journeyStats.mediaFiles * 1, 5);
    return Math.min(baseScore + eyfsBonus + mediaBonus, 100);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/learning-journeys"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <SafeIcon icon={FiArrowLeft} className="w-6 h-6 text-gray-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">
            {child.firstName}'s Learning Journey
          </h1>
          <p className="text-gray-600 mt-1">
            Age: {calculateAge(child.dateOfBirth)} • Room: {child.room}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <SafeIcon icon={FiShare2} className="w-5 h-5 mr-2" />
            Share with Parents
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <SafeIcon icon={FiDownload} className="w-5 h-5 mr-2" />
            Export PDF
          </button>
          <Link
            to={`/observations/create/${child.id}`}
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5 mr-2" />
            Add Entry
          </Link>
        </div>
      </div>

      {/* Child Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white"
      >
        <div className="flex items-center space-x-6">
          <img
            src={child.photo}
            alt={`${child.firstName} ${child.lastName}`}
            className="w-24 h-24 rounded-full border-4 border-white border-opacity-30 object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{child.firstName} {child.lastName}</h2>
            <p className="text-purple-100 mt-1">{child.room} • Key Worker: {child.keyWorker}</p>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Learning Journey Progress</span>
                <span>{getProgressPercentage()}%</span>
              </div>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
              <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">{journeyStats.totalObservations}</p>
                <p className="text-sm opacity-80">Total Entries</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">{journeyStats.sharedWithParents}</p>
                <p className="text-sm opacity-80">Shared</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">{journeyStats.eyfsAreasCovered}</p>
                <p className="text-sm opacity-80">EYFS Areas</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">{journeyStats.mediaFiles}</p>
                <p className="text-sm opacity-80">Media Files</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">{journeyStats.recentActivity}</p>
                <p className="text-sm opacity-80">This Month</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="month">This Month</option>
              <option value="term">This Term</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">EYFS Area</label>
            <select
              value={selectedEyfsArea}
              onChange={(e) => setSelectedEyfsArea(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Areas</option>
              {eyfsAreas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <div className="text-sm text-gray-600">
              Showing {filteredObservations.length} of {childObservations.length} entries
            </div>
          </div>
        </div>
      </div>

      {/* Learning Journey Timeline */}
      <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <SafeIcon icon={FiBook} className="w-6 h-6 mr-2 text-purple-600" />
          Learning Journey Timeline
        </h3>

        {filteredObservations.length > 0 ? (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-purple-200"></div>

            {/* Timeline Items */}
            <div className="space-y-8">
              {filteredObservations.map((observation, index) => (
                <motion.div
                  key={observation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start space-x-6"
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-md"></div>

                  {/* Content Card */}
                  <div className="flex-1 bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{observation.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center">
                            <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                            {format(new Date(observation.date), 'EEEE, MMMM dd, yyyy')}
                          </span>
                          <span className="flex items-center">
                            <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
                            {observation.time}
                          </span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                            {observation.type}
                          </span>
                          {observation.sharedWithParents && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              Shared with Parents
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">{observation.description}</p>

                    {/* EYFS Areas */}
                    {observation.eyfsAreas && observation.eyfsAreas.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {observation.eyfsAreas.map(area => (
                          <span key={area} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {area}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Media Files Preview */}
                    {observation.mediaFiles && observation.mediaFiles.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <SafeIcon icon={FiImage} className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">
                            Evidence ({observation.mediaFiles.length} files)
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {observation.mediaFiles.slice(0, 4).map((file, fileIndex) => (
                            <div key={fileIndex} className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
                              {file.type === 'image' ? (
                                <img
                                  src={file.url}
                                  alt={`Evidence ${fileIndex + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                  <SafeIcon icon={FiVideo} className="w-8 h-8 text-gray-500" />
                                </div>
                              )}
                            </div>
                          ))}
                          {observation.mediaFiles.length > 4 && (
                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm text-gray-600">+{observation.mediaFiles.length - 4} more</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Next Steps */}
                    {observation.nextSteps && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h5 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
                          <SafeIcon icon={FiTarget} className="w-4 h-4 mr-1" />
                          Next Steps
                        </h5>
                        <p className="text-sm text-blue-800">{observation.nextSteps}</p>
                      </div>
                    )}

                    {/* Assessment Information */}
                    {observation.eyfsAssessments && observation.eyfsAssessments.length > 0 && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h5 className="text-sm font-semibold text-green-900 mb-2">Assessment Summary</h5>
                        <div className="space-y-2">
                          {observation.eyfsAssessments.map((assessment, idx) => (
                            <div key={idx} className="text-sm">
                              <span className="font-medium text-green-800">{assessment.area}:</span>
                              <span className="text-green-700 ml-2">
                                {assessment.subcategories?.filter(sub => sub.level).length || 0} areas assessed
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <SafeIcon icon={FiEye} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No observations found</h3>
            <p className="text-gray-600 mb-4">
              {selectedEyfsArea !== 'all' || selectedPeriod !== 'all'
                ? 'Try adjusting your filters'
                : 'Start documenting this child\'s learning journey'
              }
            </p>
            <Link
              to={`/observations/create/${child.id}`}
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <SafeIcon icon={FiPlus} className="w-5 h-5 mr-2" />
              Add First Observation
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningJourneyDetail;