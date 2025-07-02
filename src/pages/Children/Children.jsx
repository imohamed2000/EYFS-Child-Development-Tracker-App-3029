import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import { useApp } from '../../context/AppContext';
import { format, differenceInMonths } from 'date-fns';
import ChildForm from './ChildForm';

const { FiPlus, FiEdit, FiEye, FiSearch, FiFilter, FiCalendar, FiUser, FiUsers } = FiIcons;

const Children = () => {
  const { children } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);

  const filteredChildren = children.filter(child =>
    `${child.firstName} ${child.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleEditChild = (child) => {
    setSelectedChild(child);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedChild(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Children</h1>
          <p className="text-gray-600 mt-2">Manage your children's profiles and information</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5 mr-2" />
            Add Child
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search children..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <SafeIcon icon={FiFilter} className="w-5 h-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Children Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChildren.map((child, index) => (
          <motion.div
            key={child.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-medium transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={child.photo}
                  alt={`${child.firstName} ${child.lastName}`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {child.firstName} {child.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">Age: {calculateAge(child.dateOfBirth)}</p>
                  <p className="text-sm text-gray-600">Room: {child.room}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <SafeIcon icon={FiUser} className="w-4 h-4 mr-2 text-gray-400" />
                  Key Worker: {child.keyWorker}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2 text-gray-400" />
                  Started: {format(new Date(child.startDate), 'MMM dd, yyyy')}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <Link
                    to={`/children/${child.id}`}
                    className="inline-flex items-center px-3 py-1.5 text-sm bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
                  >
                    <SafeIcon icon={FiEye} className="w-4 h-4 mr-1" />
                    View
                  </Link>
                  <button
                    onClick={() => handleEditChild(child)}
                    className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <SafeIcon icon={FiEdit} className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                </div>
                <Link
                  to={`/observations/create/${child.id}`}
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <SafeIcon icon={FiPlus} className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredChildren.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiUsers} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No children found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first child'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <SafeIcon icon={FiPlus} className="w-5 h-5 mr-2" />
              Add First Child
            </button>
          )}
        </div>
      )}

      {/* Child Form Modal */}
      {showForm && (
        <ChildForm
          child={selectedChild}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Children;