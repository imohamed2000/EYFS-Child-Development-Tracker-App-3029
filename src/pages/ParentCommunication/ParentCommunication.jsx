import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import { useApp } from '../../context/AppContext';
import { format } from 'date-fns';

const { FiMessageCircle, FiSend, FiMail, FiPhone, FiCalendar, FiUser, FiEye, FiShare2, FiClock } = FiIcons;

const ParentCommunication = () => {
  const { children, observations } = useApp();
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedChild, setSelectedChild] = useState('all');
  const [newMessage, setNewMessage] = useState('');
  const [messageType, setMessageType] = useState('general');

  const tabs = [
    { id: 'messages', label: 'Messages', icon: FiMessageCircle },
    { id: 'shared-content', label: 'Shared Content', icon: FiShare2 },
    { id: 'communication-log', label: 'Communication Log', icon: FiClock }
  ];

  const messageTypes = [
    { id: 'general', label: 'General Update', color: 'bg-blue-100 text-blue-800' },
    { id: 'achievement', label: 'Achievement', color: 'bg-green-100 text-green-800' },
    { id: 'concern', label: 'Concern', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'reminder', label: 'Reminder', color: 'bg-purple-100 text-purple-800' },
    { id: 'incident', label: 'Incident Report', color: 'bg-red-100 text-red-800' }
  ];

  const sampleMessages = [
    {
      id: 1,
      childId: '1',
      type: 'achievement',
      subject: 'Emma\'s painting skills',
      message: 'Emma showed excellent fine motor control today while painting. She mixed colors independently and created a beautiful artwork!',
      timestamp: '2024-01-15T10:30:00',
      from: 'Sarah Johnson',
      to: 'Lisa Thompson',
      read: true,
      replied: false
    },
    {
      id: 2,
      childId: '2',
      type: 'general',
      subject: 'Oliver\'s lunch preferences',
      message: 'Just wanted to let you know that Oliver really enjoyed the sandwiches today. He ate everything and asked for more!',
      timestamp: '2024-01-14T14:15:00',
      from: 'Sarah Johnson',
      to: 'Michael Smith',
      read: true,
      replied: true
    },
    {
      id: 3,
      childId: '3',
      type: 'reminder',
      subject: 'Sophia\'s EpiPen reminder',
      message: 'Just a friendly reminder that Sophia\'s EpiPen expires next month. Please bring in a replacement when convenient.',
      timestamp: '2024-01-13T09:00:00',
      from: 'Sarah Johnson',
      to: 'Rachel Davis',
      read: false,
      replied: false
    }
  ];

  const sharedObservations = observations.filter(obs => obs.sharedWithParents);

  const filteredMessages = selectedChild === 'all' 
    ? sampleMessages 
    : sampleMessages.filter(msg => msg.childId === selectedChild);

  const getMessageTypeColor = (type) => {
    const messageType = messageTypes.find(t => t.id === type);
    return messageType ? messageType.color : 'bg-gray-100 text-gray-800';
  };

  const getChildName = (childId) => {
    const child = children.find(c => c.id === childId);
    return child ? `${child.firstName} ${child.lastName}` : 'Unknown Child';
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChild !== 'all') {
      // In a real app, this would send the message
      console.log('Sending message:', {
        childId: selectedChild,
        type: messageType,
        message: newMessage
      });
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <SafeIcon icon={FiMessageCircle} className="w-8 h-8 mr-3" />
              Parent Communication
            </h1>
            <p className="text-indigo-100 mt-2">Stay connected with families through messages and shared content</p>
            <div className="flex items-center space-x-6 mt-4 text-indigo-100">
              <span>💬 {sampleMessages.length} Messages</span>
              <span>📤 {sharedObservations.length} Shared Items</span>
              <span>👨‍👩‍👧‍👦 {children.length} Families</span>
            </div>
          </div>
        </div>
      </div>

      {/* Child Filter */}
      <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Child</label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-soft">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
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
          {activeTab === 'messages' && (
            <div className="space-y-6">
              {/* New Message Form */}
              {selectedChild !== 'all' && (
                <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
                  <h3 className="text-lg font-semibold text-indigo-900 mb-4">
                    Send Message to {getChildName(selectedChild)}'s Family
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
                      <select
                        value={messageType}
                        onChange={(e) => setMessageType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        {messageTypes.map(type => (
                          <option key={type.id} value={type.id}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        rows={4}
                        placeholder="Type your message here..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <SafeIcon icon={FiSend} className="w-4 h-4 mr-2" />
                      Send Message
                    </button>
                  </div>
                </div>
              )}

              {/* Messages List */}
              <div className="space-y-4">
                {filteredMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border rounded-lg p-4 ${
                      message.read ? 'border-gray-200 bg-white' : 'border-indigo-200 bg-indigo-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <SafeIcon icon={FiUser} className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{getChildName(message.childId)}</h4>
                          <p className="text-sm text-gray-600">{message.from} → {message.to}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMessageTypeColor(message.type)}`}>
                          {messageTypes.find(t => t.id === message.type)?.label}
                        </span>
                        <span className="text-sm text-gray-500">
                          {format(new Date(message.timestamp), 'MMM dd, HH:mm')}
                        </span>
                      </div>
                    </div>
                    
                    <h5 className="font-medium text-gray-900 mb-2">{message.subject}</h5>
                    <p className="text-gray-700">{message.message}</p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className={`flex items-center ${message.read ? 'text-green-600' : 'text-gray-600'}`}>
                          <SafeIcon icon={FiEye} className="w-4 h-4 mr-1" />
                          {message.read ? 'Read' : 'Unread'}
                        </span>
                        {message.replied && (
                          <span className="flex items-center text-blue-600">
                            <SafeIcon icon={FiMessageCircle} className="w-4 h-4 mr-1" />
                            Replied
                          </span>
                        )}
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                        Reply
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'shared-content' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Shared Observations</h3>
                <span className="text-sm text-gray-600">{sharedObservations.length} items shared</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sharedObservations.map((observation, index) => {
                  const child = children.find(c => c.id === observation.childId);
                  return (
                    <motion.div
                      key={observation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {child && (
                            <img
                              src={child.photo}
                              alt={`${child.firstName} ${child.lastName}`}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          )}
                          <div>
                            <h4 className="font-medium text-gray-900">{observation.title}</h4>
                            <p className="text-sm text-gray-600">
                              {child ? `${child.firstName} ${child.lastName}` : 'Unknown Child'}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                          Shared
                        </span>
                      </div>

                      <p className="text-gray-700 text-sm mb-4 line-clamp-3">{observation.description}</p>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{format(new Date(observation.date), 'MMM dd, yyyy')}</span>
                        {observation.mediaFiles && observation.mediaFiles.length > 0 && (
                          <span className="flex items-center">
                            <SafeIcon icon={FiEye} className="w-4 h-4 mr-1" />
                            {observation.mediaFiles.length} media
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'communication-log' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Communication History</h3>
              
              <div className="space-y-4">
                {/* Sample communication log entries */}
                {[
                  { type: 'message', content: 'Sent achievement update to Lisa Thompson', timestamp: '2024-01-15T10:30:00' },
                  { type: 'shared', content: 'Shared observation "Emma\'s Creative Expression" with parents', timestamp: '2024-01-15T10:15:00' },
                  { type: 'call', content: 'Phone call with Michael Smith regarding Oliver\'s progress', timestamp: '2024-01-14T16:00:00' },
                  { type: 'email', content: 'Email sent to Rachel Davis about Sophia\'s EpiPen', timestamp: '2024-01-13T09:00:00' }
                ].map((entry, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      entry.type === 'message' ? 'bg-blue-100' :
                      entry.type === 'shared' ? 'bg-green-100' :
                      entry.type === 'call' ? 'bg-purple-100' : 'bg-orange-100'
                    }`}>
                      <SafeIcon 
                        icon={
                          entry.type === 'message' ? FiMessageCircle :
                          entry.type === 'shared' ? FiShare2 :
                          entry.type === 'call' ? FiPhone : FiMail
                        } 
                        className={`w-4 h-4 ${
                          entry.type === 'message' ? 'text-blue-600' :
                          entry.type === 'shared' ? 'text-green-600' :
                          entry.type === 'call' ? 'text-purple-600' : 'text-orange-600'
                        }`} 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">{entry.content}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {format(new Date(entry.timestamp), 'MMM dd, yyyy \'at\' HH:mm')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentCommunication;