import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import EditObservationModal from '../../components/Observation/EditObservationModal';
import { useApp } from '../../context/AppContext';
import { format } from 'date-fns';

const { FiPlus, FiSearch, FiFilter, FiCalendar, FiClock, FiEye, FiEdit, FiTrash2, FiShare2, FiImage, FiVideo } = FiIcons;

const Observations = () => {
  const { observations, children, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedChild, setSelectedChild] = useState('all');
  const [editingObservation, setEditingObservation] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const observationTypes = ['all', 'Learning Story', 'Snapshot', 'Assessment', 'Group Activity'];

  const filteredObservations = observations.filter(obs => {
    const child = children.find(c => c.id === obs.childId);
    const matchesSearch = obs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obs.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (child && `${child.firstName} ${child.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || obs.type === selectedType;
    const matchesChild = selectedChild === 'all' || obs.childId === selectedChild;
    
    return matchesSearch && matchesType && matchesChild;
  });

  const handleEdit = (observation) => {
    setEditingObservation(observation);
  };

  const handleSaveEdit = (updatedObservation) => {
    dispatch({ type: 'UPDATE_OBSERVATION', payload: updatedObservation });
    setEditingObservation(null);
  };

  const handleDelete = (observationId) => {
    dispatch({ type: 'DELETE_OBSERVATION', payload: observationId });
    setShowDeleteConfirm(null);
  };

  const getObservationTypeColor = (type) => {
    const colors = {
      'Learning Story': 'bg-blue-100 text-blue-800',
      'Snapshot': 'bg-green-100 text-green-800',
      'Assessment': 'bg-purple-100 text-purple-800',
      'Group Activity': 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Observations</h1>
            <p className="text-primary-100 mt-2">Document and track children's learning moments</p>
            <div className="flex items-center space-x-6 mt-4 text-primary-100">
              <span>📚 {observations.length} Total Observations</span>
              <span>👥 {children.length} Children</span>
              <span>📤 {observations.filter(obs => obs.sharedWithParents).length} Shared</span>
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              to="/observations/create"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <SafeIcon icon={FiPlus} className="w-5 h-5 mr-2" />
              New Observation
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search observations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {observationTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </option>
            ))}
          </select>

          <select
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Children</option>
            {children.map(child => (
              <option key={child.id} value={child.id}>
                {child.firstName} {child.lastName}
              </option>
            ))}
          </select>

          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <SafeIcon icon={FiFilter} className="w-5 h-5 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Enhanced Observations List */}
      <div className="space-y-6">
        {filteredObservations.length > 0 ? (
          filteredObservations.map((observation, index) => {
            const child = children.find(c => c.id === observation.childId);
            
            return (
              <motion.div
                key={observation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-200 border border-gray-100 overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {child && (
                        <img
                          src={child.photo}
                          alt={`${child.firstName} ${child.lastName}`}
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{observation.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getObservationTypeColor(observation.type)}`}>
                            {observation.type}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                          <span className="flex items-center">
                            <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-1" />
                            {format(new Date(observation.date), 'MMM dd, yyyy')}
                          </span>
                          <span className="flex items-center">
                            <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
                            {observation.time}
                          </span>
                          {child && (
                            <span className="flex items-center">
                              <SafeIcon icon={FiEye} className="w-4 h-4 mr-1" />
                              {child.firstName} {child.lastName}
                            </span>
                          )}
                        </div>

                        {/* Media indicators */}
                        {observation.mediaFiles && observation.mediaFiles.length > 0 && (
                          <div className="flex items-center space-x-2 mb-3">
                            {observation.mediaFiles.some(file => file.type === 'image') && (
                              <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                <SafeIcon icon={FiImage} className="w-3 h-3 mr-1" />
                                Photos
                              </span>
                            )}
                            {observation.mediaFiles.some(file => file.type === 'video') && (
                              <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                                <SafeIcon icon={FiVideo} className="w-3 h-3 mr-1" />
                                Videos
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      {observation.sharedWithParents && (
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          <SafeIcon icon={FiShare2} className="w-3 h-3 mr-1" />
                          Shared
                        </span>
                      )}
                      
                      <button
                        onClick={() => handleEdit(observation)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit observation"
                      >
                        <SafeIcon icon={FiEdit} className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={() => setShowDeleteConfirm(observation.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete observation"
                      >
                        <SafeIcon icon={FiTrash2} className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-700 mb-4 leading-relaxed">{observation.description}</p>

                  {/* EYFS Areas */}
                  {observation.eyfsAreas && observation.eyfsAreas.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {observation.eyfsAreas.map((area) => (
                        <span
                          key={area}
                          className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-200"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  {observation.tags && observation.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {observation.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Next Steps */}
                  {observation.nextSteps && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-medium text-blue-900 mb-1">Next Steps:</p>
                      <p className="text-sm text-blue-800">{observation.nextSteps}</p>
                    </div>
                  )}

                  {/* Media Preview */}
                  {observation.mediaFiles && observation.mediaFiles.length > 0 && (
                    <div className="mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {observation.mediaFiles.slice(0, 4).map((media, mediaIndex) => (
                          <div key={mediaIndex} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            {media.type === 'image' ? (
                              <img
                                src={media.url}
                                alt={`Evidence ${mediaIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-200">
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
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-soft border border-gray-100">
            <SafeIcon icon={FiEye} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No observations found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedType !== 'all' || selectedChild !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Start documenting children\'s learning moments'}
            </p>
            <Link
              to="/observations/create"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <SafeIcon icon={FiPlus} className="w-5 h-5 mr-2" />
              Create First Observation
            </Link>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingObservation && (
        <EditObservationModal
          observation={editingObservation}
          onClose={() => setEditingObservation(null)}
          onSave={handleSaveEdit}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Observation</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this observation? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Observations;