import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import { useApp } from '../../context/AppContext';
import { format, differenceInMonths } from 'date-fns';

const { FiTarget, FiCheckCircle, FiClock, FiTrendingUp, FiUsers, FiCalendar, FiAward } = FiIcons;

const Milestones = () => {
  const { children } = useApp();
  const [selectedChild, setSelectedChild] = useState('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');

  const ageGroups = [
    '0-11 months',
    '8-20 months', 
    '16-26 months',
    '22-36 months',
    '30-50 months',
    '40-60+ months'
  ];

  const milestoneData = {
    '0-11 months': [
      { id: 1, area: 'Physical Development', milestone: 'Sits without support', typical: '6-9 months', type: 'physical' },
      { id: 2, area: 'Communication', milestone: 'Responds to their name', typical: '6-9 months', type: 'communication' },
      { id: 3, area: 'Social', milestone: 'Enjoys peek-a-boo games', typical: '6-12 months', type: 'social' },
      { id: 4, area: 'Physical Development', milestone: 'Crawls or bottom shuffles', typical: '7-10 months', type: 'physical' }
    ],
    '8-20 months': [
      { id: 5, area: 'Physical Development', milestone: 'Walks independently', typical: '12-18 months', type: 'physical' },
      { id: 6, area: 'Communication', milestone: 'Says first words', typical: '10-14 months', type: 'communication' },
      { id: 7, area: 'Social', milestone: 'Shows affection to familiar people', typical: '12-18 months', type: 'social' },
      { id: 8, area: 'Cognitive', milestone: 'Points to objects when named', typical: '12-18 months', type: 'cognitive' }
    ],
    '16-26 months': [
      { id: 9, area: 'Communication', milestone: 'Uses 2-word phrases', typical: '18-24 months', type: 'communication' },
      { id: 10, area: 'Physical Development', milestone: 'Kicks a ball', typical: '18-24 months', type: 'physical' },
      { id: 11, area: 'Social', milestone: 'Plays alongside other children', typical: '18-30 months', type: 'social' },
      { id: 12, area: 'Cognitive', milestone: 'Sorts objects by shape/color', typical: '20-30 months', type: 'cognitive' }
    ],
    '22-36 months': [
      { id: 13, area: 'Communication', milestone: 'Uses sentences of 3+ words', typical: '24-36 months', type: 'communication' },
      { id: 14, area: 'Physical Development', milestone: 'Pedals a tricycle', typical: '30-36 months', type: 'physical' },
      { id: 15, area: 'Social', milestone: 'Takes turns in games', typical: '30-42 months', type: 'social' },
      { id: 16, area: 'Cognitive', milestone: 'Counts to 3', typical: '30-36 months', type: 'cognitive' }
    ],
    '30-50 months': [
      { id: 17, area: 'Communication', milestone: 'Tells simple stories', typical: '36-48 months', type: 'communication' },
      { id: 18, area: 'Physical Development', milestone: 'Hops on one foot', typical: '42-48 months', type: 'physical' },
      { id: 19, area: 'Social', milestone: 'Shows concern for others', typical: '36-48 months', type: 'social' },
      { id: 20, area: 'Cognitive', milestone: 'Understands counting', typical: '42-54 months', type: 'cognitive' }
    ],
    '40-60+ months': [
      { id: 21, area: 'Communication', milestone: 'Uses complex sentences', typical: '48-60 months', type: 'communication' },
      { id: 22, area: 'Physical Development', milestone: 'Skips alternating feet', typical: '54-66 months', type: 'physical' },
      { id: 23, area: 'Social', milestone: 'Plays cooperatively', typical: '48-60 months', type: 'social' },
      { id: 24, area: 'Literacy', milestone: 'Recognizes some letters', typical: '48-60 months', type: 'literacy' }
    ]
  };

  const getMilestoneColor = (type) => {
    const colors = {
      physical: 'bg-green-100 text-green-800 border-green-200',
      communication: 'bg-blue-100 text-blue-800 border-blue-200',
      social: 'bg-purple-100 text-purple-800 border-purple-200',
      cognitive: 'bg-orange-100 text-orange-800 border-orange-200',
      literacy: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const calculateAge = (dateOfBirth) => {
    const months = differenceInMonths(new Date(), new Date(dateOfBirth));
    return months;
  };

  const getAgeGroupForChild = (months) => {
    if (months <= 11) return '0-11 months';
    if (months <= 20) return '8-20 months';
    if (months <= 26) return '16-26 months';
    if (months <= 36) return '22-36 months';
    if (months <= 50) return '30-50 months';
    return '40-60+ months';
  };

  const getChildMilestones = (child) => {
    const ageInMonths = calculateAge(child.dateOfBirth);
    const ageGroup = getAgeGroupForChild(ageInMonths);
    const milestones = milestoneData[ageGroup] || [];
    
    // Simulate milestone achievement (in real app, this would come from assessments)
    const achievedMilestones = milestones.map(milestone => ({
      ...milestone,
      achieved: Math.random() > 0.3, // 70% chance of achievement
      achievedDate: Math.random() > 0.5 ? format(new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd') : null
    }));

    return {
      child,
      ageInMonths,
      ageGroup,
      milestones: achievedMilestones,
      achievedCount: achievedMilestones.filter(m => m.achieved).length,
      totalCount: achievedMilestones.length
    };
  };

  const filteredChildren = selectedChild === 'all' 
    ? children.map(getChildMilestones)
    : [getChildMilestones(children.find(c => c.id === selectedChild))].filter(Boolean);

  const filteredByAge = selectedAgeGroup === 'all' 
    ? filteredChildren
    : filteredChildren.filter(data => data.ageGroup === selectedAgeGroup);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <SafeIcon icon={FiTarget} className="w-8 h-8 mr-3" />
              Developmental Milestones
            </h1>
            <p className="text-teal-100 mt-2">Track key developmental achievements for each child</p>
            <div className="flex items-center space-x-6 mt-4 text-teal-100">
              <span>🎯 Age-Appropriate Goals</span>
              <span>📊 Progress Tracking</span>
              <span>🏆 Achievement Records</span>
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              to="/assessments"
              className="inline-flex items-center px-6 py-3 bg-white text-teal-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <SafeIcon icon={FiTrendingUp} className="w-5 h-5 mr-2" />
              View Assessments
            </Link>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Child</label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Children</option>
              {children.map(child => (
                <option key={child.id} value={child.id}>
                  {child.firstName} {child.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Age Group</label>
            <select
              value={selectedAgeGroup}
              onChange={(e) => setSelectedAgeGroup(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Age Groups</option>
              {ageGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <div className="text-sm text-gray-600">
              Showing {filteredByAge.length} child{filteredByAge.length !== 1 ? 'ren' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Tracking */}
      <div className="space-y-6">
        {filteredByAge.map((data, index) => (
          <motion.div
            key={data.child.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
          >
            {/* Child Header */}
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={data.child.photo}
                alt={`${data.child.firstName} ${data.child.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  {data.child.firstName} {data.child.lastName}
                </h3>
                <p className="text-gray-600">
                  {Math.floor(data.ageInMonths / 12)} years {data.ageInMonths % 12} months • {data.child.room}
                </p>
                <p className="text-sm text-gray-500">Age Group: {data.ageGroup}</p>
              </div>
              <div className="text-right">
                <div className="bg-teal-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-teal-600">
                    {data.achievedCount}/{data.totalCount}
                  </p>
                  <p className="text-sm text-teal-800">Milestones</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm text-gray-600">
                  {Math.round((data.achievedCount / data.totalCount) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-teal-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(data.achievedCount / data.totalCount) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Milestones Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.milestones.map((milestone, milestoneIndex) => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (index * 0.1) + (milestoneIndex * 0.05) }}
                  className={`border-2 rounded-lg p-4 transition-all ${
                    milestone.achieved 
                      ? 'border-teal-200 bg-teal-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getMilestoneColor(milestone.type)}`}>
                      {milestone.area}
                    </span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      milestone.achieved ? 'bg-teal-500' : 'bg-gray-300'
                    }`}>
                      {milestone.achieved ? (
                        <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-white" />
                      ) : (
                        <SafeIcon icon={FiClock} className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                  </div>

                  <h4 className="font-medium text-gray-900 mb-2">{milestone.milestone}</h4>
                  
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiCalendar} className="w-3 h-3" />
                      <span>Typical: {milestone.typical}</span>
                    </div>
                    {milestone.achieved && milestone.achievedDate && (
                      <div className="flex items-center space-x-1 text-teal-600">
                        <SafeIcon icon={FiAward} className="w-3 h-3" />
                        <span>Achieved: {format(new Date(milestone.achievedDate), 'MMM dd, yyyy')}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredByAge.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiTarget} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Children Found</h3>
          <p className="text-gray-600 mb-6">Add children to start tracking their developmental milestones</p>
          <Link
            to="/children"
            className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <SafeIcon icon={FiUsers} className="w-5 h-5 mr-2" />
            Add Children
          </Link>
        </div>
      )}
    </div>
  );
};

export default Milestones;