import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiX, FiSave, FiUsers, FiClock, FiMapPin, FiSettings } = FiIcons;

const ClassForm = ({ classData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: classData?.name || '',
    ageGroup: classData?.ageGroup || '2-3 years',
    capacity: classData?.capacity || 12,
    color: classData?.color || 'bg-blue-400',
    description: classData?.description || '',
    staff: classData?.staff || [],
    schedule: {
      openTime: classData?.schedule?.openTime || '08:00',
      closeTime: classData?.schedule?.closeTime || '18:00',
      lunchTime: classData?.schedule?.lunchTime || '12:00',
      napTime: classData?.schedule?.napTime || '13:30'
    },
    facilities: classData?.facilities || [],
    status: classData?.status || 'active'
  });

  const [errors, setErrors] = useState({});
  const [newStaffMember, setNewStaffMember] = useState('');
  const [newFacility, setNewFacility] = useState('');

  const ageGroups = [
    '0-1 years',
    '1-2 years', 
    '2-3 years',
    '3-4 years',
    '4-5 years',
    '2-5 years',
    '3-5 years'
  ];

  const colorOptions = [
    { value: 'bg-red-400', label: 'Red', preview: 'bg-red-400' },
    { value: 'bg-blue-400', label: 'Blue', preview: 'bg-blue-400' },
    { value: 'bg-green-400', label: 'Green', preview: 'bg-green-400' },
    { value: 'bg-yellow-400', label: 'Yellow', preview: 'bg-yellow-400' },
    { value: 'bg-purple-400', label: 'Purple', preview: 'bg-purple-400' },
    { value: 'bg-pink-400', label: 'Pink', preview: 'bg-pink-400' },
    { value: 'bg-indigo-400', label: 'Indigo', preview: 'bg-indigo-400' },
    { value: 'bg-orange-400', label: 'Orange', preview: 'bg-orange-400' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddStaff = () => {
    if (newStaffMember.trim() && !formData.staff.includes(newStaffMember.trim())) {
      setFormData(prev => ({
        ...prev,
        staff: [...prev.staff, newStaffMember.trim()]
      }));
      setNewStaffMember('');
    }
  };

  const handleRemoveStaff = (staffMember) => {
    setFormData(prev => ({
      ...prev,
      staff: prev.staff.filter(member => member !== staffMember)
    }));
  };

  const handleAddFacility = () => {
    if (newFacility.trim() && !formData.facilities.includes(newFacility.trim())) {
      setFormData(prev => ({
        ...prev,
        facilities: [...prev.facilities, newFacility.trim()]
      }));
      setNewFacility('');
    }
  };

  const handleRemoveFacility = (facility) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.filter(f => f !== facility)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Class name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.capacity < 1) newErrors.capacity = 'Capacity must be at least 1';
    if (formData.staff.length === 0) newErrors.staff = 'At least one staff member is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSave(formData);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <h2 className="text-2xl font-bold">
              {classData ? 'Edit Class' : 'Create New Class'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <SafeIcon icon={FiX} className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                    <SafeIcon icon={FiUsers} className="w-5 h-5 mr-2" />
                    Basic Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Class Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Rainbow Room"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Brief description of the class focus and environment..."
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          errors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Age Group
                        </label>
                        <select
                          name="ageGroup"
                          value={formData.ageGroup}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          {ageGroups.map(group => (
                            <option key={group} value={group}>{group}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Capacity *
                        </label>
                        <input
                          type="number"
                          name="capacity"
                          value={formData.capacity}
                          onChange={handleInputChange}
                          min="1"
                          max="30"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.capacity ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.capacity && (
                          <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Class Color
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {colorOptions.map(color => (
                          <label
                            key={color.value}
                            className={`relative flex items-center justify-center cursor-pointer rounded-lg border-2 p-3 transition-colors ${
                              formData.color === color.value
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="color"
                              value={color.value}
                              checked={formData.color === color.value}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className={`w-6 h-6 rounded-full ${color.preview}`}></div>
                            {formData.color === color.value && (
                              <span className="absolute -top-1 -right-1 text-purple-600">✓</span>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="maintenance">Under Maintenance</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule and Staff */}
              <div className="space-y-6">
                {/* Schedule */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                    <SafeIcon icon={FiClock} className="w-5 h-5 mr-2" />
                    Daily Schedule
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Open Time
                      </label>
                      <input
                        type="time"
                        name="schedule.openTime"
                        value={formData.schedule.openTime}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Close Time
                      </label>
                      <input
                        type="time"
                        name="schedule.closeTime"
                        value={formData.schedule.closeTime}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lunch Time
                      </label>
                      <input
                        type="time"
                        name="schedule.lunchTime"
                        value={formData.schedule.lunchTime}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nap Time
                      </label>
                      <input
                        type="time"
                        name="schedule.napTime"
                        value={formData.schedule.napTime || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Leave empty if no nap time</p>
                    </div>
                  </div>
                </div>

                {/* Staff */}
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
                    <SafeIcon icon={FiUsers} className="w-5 h-5 mr-2" />
                    Assigned Staff *
                  </h3>

                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newStaffMember}
                        onChange={(e) => setNewStaffMember(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddStaff())}
                        placeholder="Enter staff member name..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={handleAddStaff}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>

                    {formData.staff.length > 0 && (
                      <div className="space-y-2">
                        {formData.staff.map((member, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200">
                            <span className="text-sm font-medium text-gray-900">{member}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveStaff(member)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              <SafeIcon icon={FiX} className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {errors.staff && (
                      <p className="text-red-500 text-sm">{errors.staff}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Facilities */}
            <div className="mt-8">
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
                  <SafeIcon icon={FiMapPin} className="w-5 h-5 mr-2" />
                  Facilities & Equipment
                </h3>

                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newFacility}
                      onChange={(e) => setNewFacility(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFacility())}
                      placeholder="Enter facility or equipment..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={handleAddFacility}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>

                  {formData.facilities.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {formData.facilities.map((facility, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200">
                          <span className="text-sm font-medium text-gray-900 truncate">{facility}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFacility(facility)}
                            className="text-red-600 hover:text-red-800 transition-colors ml-2"
                          >
                            <SafeIcon icon={FiX} className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {formData.facilities.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No facilities added yet</p>
                  )}
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
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
              >
                <SafeIcon icon={FiSave} className="w-5 h-5 mr-2" />
                {classData ? 'Update Class' : 'Create Class'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ClassForm;