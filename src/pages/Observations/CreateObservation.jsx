import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import CommentBankDropdown from '../../components/Observation/CommentBankDropdown';
import MediaUpload from '../../components/Observation/MediaUpload';
import AssessmentLevelSelector from '../../components/Observation/AssessmentLevelSelector';
import ObservationTemplates from '../../components/Observation/ObservationTemplates';
import NextStepsDropdown from '../../components/Observation/NextStepsDropdown';
import { useApp } from '../../context/AppContext';
import { format } from 'date-fns';
import { eyfsAreas, learningObjectives } from '../../data/commentBank';
import { formatObservationText } from '../../utils/observationHelpers';

const { FiArrowLeft, FiSave, FiTag, FiClock, FiBookOpen } = FiIcons;

const CreateObservation = () => {
  const { childId } = useParams();
  const navigate = useNavigate();
  const { children, dispatch } = useApp();

  const selectedChild = children.find(c => c.id === childId);

  const [formData, setFormData] = useState({
    childId: childId || '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: format(new Date(), 'HH:mm'),
    type: 'Learning Story',
    title: '',
    description: '',
    eyfsAssessments: [],
    developmentStage: '30-50 months',
    mediaFiles: [],
    nextSteps: '',
    sharedWithParents: false,
    tags: []
  });

  const [errors, setErrors] = useState({});
  const [newTag, setNewTag] = useState('');

  const observationTypes = ['Learning Story', 'Snapshot', 'Assessment', 'Group Activity'];
  const developmentStages = ['0-11 months', '8-20 months', '16-26 months', '22-36 months', '30-50 months', '40-60+ months'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
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
    
    const newComment = currentComment ? `${currentComment} ${comment}` : comment;
    updateEyfsAssessment(areaName, subcategoryName, 'comments', newComment);
  };

  const appendDescription = (template) => {
    const currentDescription = formData.description;
    const newDescription = currentDescription ? `${currentDescription} ${template}` : template;
    
    setFormData(prev => ({
      ...prev,
      description: newDescription
    }));
  };

  const appendNextStep = (nextStep) => {
    const currentNextSteps = formData.nextSteps;
    const newNextSteps = currentNextSteps ? `${currentNextSteps} ${nextStep}` : nextStep;
    
    setFormData(prev => ({
      ...prev,
      nextSteps: newNextSteps
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.childId) newErrors.childId = 'Please select a child';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.eyfsAssessments.length === 0) newErrors.eyfsAssessments = 'Select at least one EYFS area';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const mediaUrls = formData.mediaFiles.map(file => ({
      type: file.type,
      url: file.url,
      name: file.name
    }));

    // Format observation text with proper names and pronouns
    let finalDescription = formData.description;
    let finalNextSteps = formData.nextSteps;
    
    if (selectedChild) {
      finalDescription = formatObservationText(formData.description, selectedChild.firstName, selectedChild.gender);
      finalNextSteps = formatObservationText(formData.nextSteps, selectedChild.firstName, selectedChild.gender);
    }

    const observationData = {
      ...formData,
      description: finalDescription,
      nextSteps: finalNextSteps,
      mediaFiles: mediaUrls,
      eyfsAreas: formData.eyfsAssessments.map(assessment => assessment.area)
    };

    dispatch({ type: 'ADD_OBSERVATION', payload: observationData });
    navigate('/observations');
  };

  const currentLearningObjectives = learningObjectives[formData.developmentStage] || [];

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
            >
              <SafeIcon icon={FiArrowLeft} className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold">Create Observation</h1>
              <p className="text-primary-100 mt-1">
                {selectedChild
                  ? `Document learning for ${selectedChild.firstName} ${selectedChild.lastName}`
                  : 'Document a child\'s learning moment'
                }
              </p>
            </div>
          </div>
          {selectedChild && (
            <div className="flex items-center space-x-3">
              <img
                src={selectedChild.photo}
                alt={selectedChild.firstName}
                className="w-16 h-16 rounded-full border-4 border-white border-opacity-30"
              />
              <div className="text-right">
                <p className="font-semibold">{selectedChild.firstName} {selectedChild.lastName}</p>
                <p className="text-primary-100 text-sm">{selectedChild.room}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiClock} className="w-5 h-5 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Child *
                  </label>
                  <select
                    name="childId"
                    value={formData.childId}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.childId ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={!!childId}
                  >
                    <option value="">Select a child</option>
                    {children.map(child => (
                      <option key={child.id} value={child.id}>
                        {child.firstName} {child.lastName}
                      </option>
                    ))}
                  </select>
                  {errors.childId && (
                    <p className="text-red-500 text-sm mt-1">{errors.childId}</p>
                  )}
                </div>

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
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Give your observation a descriptive title..."
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>
            </motion.div>

            {/* Observation Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiBookOpen} className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Observation Details</h2>
                </div>
                <ObservationTemplates
                  observationType={formData.type}
                  selectedChildId={formData.childId}
                  onSelectTemplate={appendDescription}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Describe what you observed in detail..."
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Next Steps
                  </label>
                  <NextStepsDropdown
                    eyfsAreas={formData.eyfsAssessments.map(a => a.area)}
                    selectedChildId={formData.childId}
                    onSelectNextStep={appendNextStep}
                  />
                </div>
                <textarea
                  name="nextSteps"
                  value={formData.nextSteps}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="What are the next steps to support this child's development?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </motion.div>

            {/* Media Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Evidence: Photos & Videos</h2>
              <MediaUpload
                mediaFiles={formData.mediaFiles}
                onMediaChange={(files) => setFormData(prev => ({ ...prev, mediaFiles: files }))}
              />
            </motion.div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-8">
            {/* Learning Objectives */}
            {currentLearningObjectives.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-blue-50 rounded-xl p-6 border border-blue-200"
              >
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  Learning Objectives ({formData.developmentStage})
                </h3>
                <div className="space-y-2">
                  {currentLearningObjectives.map((objective, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-blue-800">{objective}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* EYFS Areas with Enhanced Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">EYFS Areas & Assessment *</h3>
              
              <div className="space-y-3">
                {eyfsAreas.map(area => {
                  const isSelected = formData.eyfsAssessments.some(
                    assessment => assessment.area === area.name
                  );

                  return (
                    <div key={area.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => handleEyfsAreaSelect(area)}
                        className={`w-full text-left p-4 transition-colors ${
                          isSelected ? area.color : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{area.name}</span>
                          {isSelected && (
                            <span className="text-xs bg-white bg-opacity-70 px-2 py-1 rounded-full">
                              ✓ Selected
                            </span>
                          )}
                        </div>
                      </button>

                      {isSelected && (
                        <div className="border-t border-gray-200 p-4 space-y-4 bg-gray-50">
                          {area.subcategories.map(subcategory => {
                            const assessment = formData.eyfsAssessments
                              .find(a => a.area === area.name)
                              ?.subcategories.find(s => s.name === subcategory);

                            return (
                              <div key={subcategory} className="space-y-3 p-3 bg-white rounded-lg border border-gray-200">
                                <h4 className="font-medium text-sm text-gray-800">
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
                                    <label className="text-sm font-medium text-gray-700">
                                      Comments & Evidence
                                    </label>
                                    <CommentBankDropdown
                                      eyfsArea={area.name}
                                      subcategory={subcategory}
                                      selectedChildId={formData.childId}
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
                                    rows={3}
                                    placeholder="Add your observations and evidence..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
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

              {errors.eyfsAssessments && (
                <p className="text-red-500 text-sm mt-2">{errors.eyfsAssessments}</p>
              )}
            </motion.div>

            {/* Development Stage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Development Stage</h3>
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
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Add a tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <SafeIcon icon={FiTag} className="w-5 h-5" />
                </button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Sharing Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sharing Options</h3>
              
              <div className="space-y-3">
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
                
                {formData.sharedWithParents && (
                  <div className="ml-6 text-sm text-gray-600">
                    <p>✓ Parents will be notified via email</p>
                    <p>✓ Visible in parent portal immediately</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Form Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p>💡 <strong>Tip:</strong> Templates automatically use the correct name and pronouns for {selectedChild ? selectedChild.firstName : 'the selected child'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center"
              >
                <SafeIcon icon={FiSave} className="w-5 h-5 mr-2" />
                Save Observation
              </button>
            </div>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default CreateObservation;