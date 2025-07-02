import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import { useApp } from '../../context/AppContext';

const { FiX, FiSave, FiUser, FiCalendar, FiPhone, FiMail } = FiIcons;

const ChildForm = ({ child, onClose }) => {
  const { dispatch, classes } = useApp(); // Get classes from context
  const [formData, setFormData] = useState({
    firstName: child?.firstName || '',
    lastName: child?.lastName || '',
    dateOfBirth: child?.dateOfBirth || '',
    gender: child?.gender || '',
    photo: child?.photo || '',
    parentName: child?.parentName || '',
    parentEmail: child?.parentEmail || '',
    parentPhone: child?.parentPhone || '',
    medicalInfo: child?.medicalInfo || '',
    dietaryRequirements: child?.dietaryRequirements || '',
    startDate: child?.startDate || '',
    keyWorker: child?.keyWorker || 'Sarah Johnson',
    room: child?.room || (classes.length > 0 ? classes[0].name : 'Rainbow Room'), // Use first available class
    emergencyContact: child?.emergencyContact || '',
    attendanceDays: child?.attendanceDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  });

  const [errors, setErrors] = useState({});

  const daysOfWeek = [
    { id: 'Sunday', label: 'Sunday', short: 'Sun' },
    { id: 'Monday', label: 'Monday', short: 'Mon' },
    { id: 'Tuesday', label: 'Tuesday', short: 'Tue' },
    { id: 'Wednesday', label: 'Wednesday', short: 'Wed' },
    { id: 'Thursday', label: 'Thursday', short: 'Thu' },
    { id: 'Friday', label: 'Friday', short: 'Fri' },
    { id: 'Saturday', label: 'Saturday', short: 'Sat' }
  ];

  const genderOptions = [
    { value: '', label: 'Select Gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  // Use available classes from context
  const availableRooms = classes.length > 0 ? classes.map(cls => cls.name) : ['Rainbow Room', 'Sunshine Room', 'Stars Room', 'Moon Room'];
  
  const keyWorkers = ['Sarah Johnson', 'Emma Davis', 'Michael Brown', 'Lisa Wilson'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAttendanceDayChange = (day) => {
    setFormData(prev => ({
      ...prev,
      attendanceDays: prev.attendanceDays.includes(day)
        ? prev.attendanceDays.filter(d => d !== day)
        : [...prev.attendanceDays, day]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.parentName.trim()) newErrors.parentName = 'Parent name is required';
    if (!formData.parentEmail.trim()) newErrors.parentEmail = 'Parent email is required';
    if (!formData.parentPhone.trim()) newErrors.parentPhone = 'Parent phone is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (formData.attendanceDays.length === 0) newErrors.attendanceDays = 'Select at least one attendance day';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (child) {
      dispatch({ type: 'UPDATE_CHILD', payload: { ...formData, id: child.id } });
    } else {
      dispatch({ 
        type: 'ADD_CHILD', 
        payload: {
          ...formData,
          photo: formData.photo || `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1544717297-fa95b6ee9643' : '1503919545889-aef636e10ad4'}?w=200&h=200&fit=crop&crop=face`
        }
      });
    }

    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
            <h2 className="text-2xl font-bold">
              {child ? 'Edit Child Profile' : 'Add New Child'}
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
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                    <SafeIcon icon={FiUser} className="w-5 h-5 mr-2" />
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.dateOfBirth && (
                        <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender *
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.gender ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        {genderOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.gender && (
                        <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photo URL
                    </label>
                    <input
                      type="url"
                      name="photo"
                      value={formData.photo}
                      onChange={handleInputChange}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave empty for automatic photo assignment</p>
                  </div>
                </div>

                {/* Nursery Information */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                    <SafeIcon icon={FiCalendar} className="w-5 h-5 mr-2" />
                    Nursery Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.startDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.startDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Room
                      </label>
                      <select
                        name="room"
                        value={formData.room}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {availableRooms.map(room => (
                          <option key={room} value={room}>{room}</option>
                        ))}
                      </select>
                      {classes.length === 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          No classes available. Create classes in Class Management first.
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Key Worker
                      </label>
                      <select
                        name="keyWorker"
                        value={formData.keyWorker}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {keyWorkers.map(worker => (
                          <option key={worker} value={worker}>{worker}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Attendance Days *
                    </label>
                    <div className="grid grid-cols-7 gap-2">
                      {daysOfWeek.map(day => (
                        <label
                          key={day.id}
                          className={`relative flex flex-col items-center cursor-pointer rounded-lg p-3 border-2 transition-all ${
                            formData.attendanceDays.includes(day.id)
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.attendanceDays.includes(day.id)}
                            onChange={() => handleAttendanceDayChange(day.id)}
                            className="sr-only"
                          />
                          <span className="text-xs font-medium">{day.short}</span>
                          <span className="text-xs mt-1">{day.label.slice(0, 3)}</span>
                          {formData.attendanceDays.includes(day.id) && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                    {errors.attendanceDays && (
                      <p className="text-red-500 text-sm mt-2">{errors.attendanceDays}</p>
                    )}
                    <p className="text-sm text-gray-600 mt-2">
                      Selected: {formData.attendanceDays.length} day{formData.attendanceDays.length !== 1 ? 's' : ''} per week
                    </p>
                  </div>
                </div>
              </div>

              {/* Parent Information & Medical */}
              <div className="space-y-6">
                {/* Parent Information */}
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
                    <SafeIcon icon={FiPhone} className="w-5 h-5 mr-2" />
                    Parent Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Parent/Guardian Name *
                      </label>
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.parentName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.parentName && (
                        <p className="text-red-500 text-sm mt-1">{errors.parentName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="parentEmail"
                        value={formData.parentEmail}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.parentEmail ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.parentEmail && (
                        <p className="text-red-500 text-sm mt-1">{errors.parentEmail}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="parentPhone"
                        value={formData.parentPhone}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          errors.parentPhone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.parentPhone && (
                        <p className="text-red-500 text-sm mt-1">{errors.parentPhone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact
                      </label>
                      <input
                        type="text"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        placeholder="Name - Phone Number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
                    <SafeIcon icon={FiMail} className="w-5 h-5 mr-2" />
                    Medical & Dietary Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Medical Information
                      </label>
                      <textarea
                        name="medicalInfo"
                        value={formData.medicalInfo}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Any medical conditions, allergies, or medications..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dietary Requirements
                      </label>
                      <textarea
                        name="dietaryRequirements"
                        value={formData.dietaryRequirements}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Any dietary restrictions or requirements..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
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
                {child ? 'Update Child' : 'Add Child'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ChildForm;