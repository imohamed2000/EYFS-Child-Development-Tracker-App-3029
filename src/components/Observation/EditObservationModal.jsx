import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import CommentBankDropdown from './CommentBankDropdown';
import MediaUpload from './MediaUpload';
import AssessmentLevelSelector from './AssessmentLevelSelector';
import ObservationTemplates from './ObservationTemplates';
import NextStepsDropdown from './NextStepsDropdown';
import { useApp } from '../../context/AppContext';
import { eyfsAreas } from '../../data/commentBank';

const { FiX, FiSave } = FiIcons;

const EditObservationModal = ({ observation, onClose, onSave }) => {
  const { children } = useApp();
  const child = children.find(c => c.id === observation.childId);
  
  const [formData, setFormData] = useState({
    ...observation,
    eyfsAssessments: observation.eyfsAssessments || []
  });

  const [errors, setErrors] = useState({});

  const observationTypes = ['Learning Story', 'Snapshot', 'Assessment', 'Group Activity'];
  const developmentStages = ['0-11 months', '8-20 months', '16-26 months', '22-36 months', '30-50 months', '40-60+ months'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleEyfsAreaSelect = (area) => {
    const existingIndex = formData.eyfsAssessments.findIndex(
      assessment => assessment.area === area.name
    );

    if (existingIndex === -1) {
      setFormData(prev => ({
        ...prev,
        eyfsAssessments: [
          ...prev.eyfsAssessments,
          {
            area: area.name,
            subcategories: area.subcategories.map(sub => ({
              name: sub,
              level: '',
              comments: '',
              evidence: ''
            }))
          }
        ]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        eyfsAssessments: prev.eyfsAssessments.filter((_, index) => index !== existingIndex)
      }));
    }
  };

  const updateEyfsAssessment = (areaName, subcategoryName, field, value) => {
    setFormData(prev => ({
      ...prev,
      eyfsAssessments: prev.eyfsAssessments.map(assessment => {
        if (assessment.area === areaName) {
          return {
            ...assessment,
            subcategories: assessment.subcategories.map(sub => {
              if (sub.name === subcategoryName) {
                return { ...sub, [field]: value };
              }
              return sub;
            })
          };
        }
        return assessment;
      })
    }));
  };

  const appendComment = (areaName, subcategoryName, comment) => {
    const currentComment = formData.eyfsAssessments
      .find(a => a.area === areaName)
      ?.subcategories.find(s => s.name === subcategoryName)?.comments || '';
    
    const newComment = currentComment 
      ? `${currentComment} ${comment}` 
      : comment;
    
    updateEyfsAssessment(areaName, subcategoryName, 'comments', newComment);
  };

  const appendDescription = (template) => {
    const childName = child ? child.firstName : '[child]';
    const formattedTemplate = template.replace(/\[child\]/g, childName);
    const currentDescription = formData.description;
    const newDescription = currentDescription 
      ? `${currentDescription} ${formattedTemplate}` 
      : formattedTemplate;
    
    setFormData(prev => ({ ...prev, description: newDescription }));
  };

  const appendNextStep = (nextStep) => {
    const currentNextSteps = formData.nextSteps;
    const newNextSteps = currentNextSteps 
      ? `${currentNextSteps} ${nextStep}` 
      : nextStep;
    
    setFormData(prev => ({ ...prev, nextSteps: newNextSteps }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Update EYFS areas for compatibility
    const updatedData = {
      ...formData,
      eyfsAreas: formData.eyfsAssessments.map(assessment => assessment.area)
    };

    onSave(updatedData);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Edit Observation</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <SafeIcon icon={FiX} className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observation Type
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {observationTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Development Stage
                      </label>
                      <select
                        name="developmentStage"
                        value={formData.developmentStage}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {developmentStages.map(stage => (
                          <option key={stage} value={stage}>{stage}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                  </div>
                </div>

                {/* Observation Description */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Observation Description</h3>
                    <ObservationTemplates
                      observationType={formData.type}
                      onSelectTemplate={appendDescription}
                    />
                  </div>
                  
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Describe what you observed..."
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>

                {/* Next Steps */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Next Steps</h3>
                    <NextStepsDropdown
                      eyfsAreas={formData.eyfsAssessments.map(a => a.area)}
                      childName={child?.firstName}
                      onSelectNextStep={appendNextStep}
                    />
                  </div>
                  
                  <textarea
                    name="nextSteps"
                    value={formData.nextSteps}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="What are the next steps for this child's development?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Media Upload */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Photos & Videos</h3>
                  <MediaUpload
                    mediaFiles={formData.mediaFiles || []}
                    onMediaChange={(files) => setFormData(prev => ({ ...prev, mediaFiles: files }))}
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* EYFS Areas */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">EYFS Areas & Assessment</h3>
                  
                  <div className="space-y-4">
                    {eyfsAreas.map(area => {
                      const isSelected = formData.eyfsAssessments.some(
                        assessment => assessment.area === area.name
                      );
                      
                      return (
                        <div key={area.id} className="border border-gray-200 rounded-lg">
                          <button
                            type="button"
                            onClick={() => handleEyfsAreaSelect(area)}
                            className={`w-full text-left p-3 rounded-lg transition-colors ${
                              isSelected 
                                ? area.color 
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">{area.name}</span>
                              {isSelected && (
                                <span className="text-xs bg-white bg-opacity-50 px-2 py-1 rounded-full">
                                  Selected
                                </span>
                              )}
                            </div>
                          </button>

                          {isSelected && (
                            <div className="border-t border-gray-200 p-3 space-y-4">
                              {area.subcategories.map(subcategory => {
                                const assessment = formData.eyfsAssessments
                                  .find(a => a.area === area.name)
                                  ?.subcategories.find(s => s.name === subcategory);

                                return (
                                  <div key={subcategory} className="space-y-3">
                                    <h4 className="font-medium text-xs text-gray-800">
                                      {subcategory}
                                    </h4>

                                    <AssessmentLevelSelector
                                      selectedLevel={assessment?.level || ''}
                                      onLevelChange={(level) => 
                                        updateEyfsAssessment(area.name, subcategory, 'level', level)
                                      }
                                    />

                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <label className="text-xs font-medium text-gray-700">
                                          Comments
                                        </label>
                                        <CommentBankDropdown
                                          eyfsArea={area.name}
                                          subcategory={subcategory}
                                          onSelectComment={(comment) => 
                                            appendComment(area.name, subcategory, comment)
                                          }
                                        />
                                      </div>
                                      <textarea
                                        value={assessment?.comments || ''}
                                        onChange={(e) => 
                                          updateEyfsAssessment(area.name, subcategory, 'comments', e.target.value)
                                        }
                                        rows={2}
                                        placeholder="Add observations..."
                                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sharing Options */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sharing</h3>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="sharedWithParents"
                      checked={formData.sharedWithParents}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Share with parents</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center"
              >
                <SafeIcon icon={FiSave} className="w-5 h-5 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EditObservationModal;