import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useApp } from '../../context/AppContext';
import { eyfsAreas } from '../../data/commentBank';
import { formatObservationText } from '../../utils/observationHelpers';

const { FiUpload, FiDownload, FiPlus, FiTrash2, FiEdit3, FiSave, FiX, FiCheck, FiFileText, FiDatabase, FiEye } = FiIcons;

const CommentBankBuilder = () => {
  const { dispatch } = useApp();
  const fileInputRef = useRef(null);
  const [customComments, setCustomComments] = useState({});
  const [selectedArea, setSelectedArea] = useState('Communication and Language');
  const [selectedSubcategory, setSelectedSubcategory] = useState('Listening and Attention');
  const [selectedLevel, setSelectedLevel] = useState('emerging');
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [previewChild, setPreviewChild] = useState({ name: 'Emma', gender: 'female' });
  const [showPreview, setShowPreview] = useState(false);

  const levels = ['emerging', 'developing', 'secure', 'exceeding'];

  // Get current comments for selected area/subcategory/level
  const getCurrentComments = () => {
    const key = `${selectedArea}-${selectedSubcategory}-${selectedLevel}`;
    return customComments[key] || [];
  };

  // Add new comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const key = `${selectedArea}-${selectedSubcategory}-${selectedLevel}`;
    const currentComments = customComments[key] || [];
    
    setCustomComments(prev => ({
      ...prev,
      [key]: [...currentComments, { id: Date.now(), text: newComment.trim() }]
    }));
    
    setNewComment('');
  };

  // Delete comment
  const handleDeleteComment = (commentId) => {
    const key = `${selectedArea}-${selectedSubcategory}-${selectedLevel}`;
    const currentComments = customComments[key] || [];
    
    setCustomComments(prev => ({
      ...prev,
      [key]: currentComments.filter(comment => comment.id !== commentId)
    }));
  };

  // Start editing comment
  const handleEditComment = (comment) => {
    setEditingId(comment.id);
    setEditingText(comment.text);
  };

  // Save edited comment
  const handleSaveEdit = () => {
    if (!editingText.trim()) return;

    const key = `${selectedArea}-${selectedSubcategory}-${selectedLevel}`;
    const currentComments = customComments[key] || [];
    
    setCustomComments(prev => ({
      ...prev,
      [key]: currentComments.map(comment => 
        comment.id === editingId 
          ? { ...comment, text: editingText.trim() }
          : comment
      )
    }));
    
    setEditingId(null);
    setEditingText('');
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  // Handle CSV/Excel import
  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

      // Expected headers: Area, Subcategory, Level, Comment
      if (headers.length < 4) {
        alert('CSV must have columns: Area, Subcategory, Level, Comment');
        return;
      }

      const newComments = {};
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
        if (values.length >= 4) {
          const [area, subcategory, level, comment] = values;
          const key = `${area}-${subcategory}-${level}`;
          
          if (!newComments[key]) {
            newComments[key] = [];
          }
          
          newComments[key].push({
            id: Date.now() + Math.random(),
            text: comment
          });
        }
      }

      setCustomComments(prev => ({ ...prev, ...newComments }));
      
      // Show success message
      const totalImported = Object.values(newComments).reduce((sum, comments) => sum + comments.length, 0);
      alert(`Successfully imported ${totalImported} comments!`);
    };

    reader.readAsText(file);
    event.target.value = ''; // Reset file input
  };

  // Export comments to CSV
  const handleExportComments = () => {
    let csvContent = 'Area,Subcategory,Level,Comment\n';
    
    Object.entries(customComments).forEach(([key, comments]) => {
      const [area, subcategory, level] = key.split('-');
      comments.forEach(comment => {
        csvContent += `"${area}","${subcategory}","${level}","${comment.text}"\n`;
      });
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comment-bank-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Get template for download
  const handleDownloadTemplate = () => {
    const template = `Area,Subcategory,Level,Comment
"Communication and Language","Listening and Attention","emerging","[child] listens with interest to stories and songs"
"Communication and Language","Listening and Attention","developing","[He/She] maintains attention during adult-led activities"
"Communication and Language","Understanding","emerging","[child] responds to simple instructions involving familiar objects"
"Physical Development","Moving and Handling","emerging","[He/She] shows increasing control when using tools and equipment"
"Personal Social and Emotional Development","Self-confidence and Self-awareness","emerging","[child] expresses [his/her] own preferences and interests confidently"`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'comment-bank-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const currentComments = getCurrentComments();
  const totalComments = Object.values(customComments).reduce((sum, comments) => sum + comments.length, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Comment Bank Builder</h1>
            <p className="text-purple-100 mt-1">
              Create and manage custom observation comments with smart placeholders
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{totalComments}</div>
            <div className="text-purple-100 text-sm">Total Comments</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Control Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Import/Export Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Import & Export</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileImport}
                accept=".csv,.xlsx,.xls"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
              >
                <SafeIcon icon={FiUpload} className="w-5 h-5 mr-2" />
                Import CSV/Excel
              </button>
              <button
                onClick={handleExportComments}
                disabled={totalComments === 0}
                className="flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors border border-green-200 disabled:opacity-50"
              >
                <SafeIcon icon={FiDownload} className="w-5 h-5 mr-2" />
                Export Comments
              </button>
              <button
                onClick={handleDownloadTemplate}
                className="flex items-center justify-center px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors border border-purple-200"
              >
                <SafeIcon icon={FiFileText} className="w-5 h-5 mr-2" />
                Download Template
              </button>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">CSV Format Guidelines:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Columns:</strong> Area, Subcategory, Level, Comment</li>
                <li>• <strong>Use placeholders:</strong> [child], [he/she], [his/her], [him/her]</li>
                <li>• <strong>Levels:</strong> emerging, developing, secure, exceeding</li>
                <li>• <strong>Areas:</strong> Use exact EYFS area names</li>
              </ul>
            </div>
          </motion.div>

          {/* Selection Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  EYFS Area
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => {
                    setSelectedArea(e.target.value);
                    const area = eyfsAreas.find(a => a.name === e.target.value);
                    if (area) {
                      setSelectedSubcategory(area.subcategories[0]);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {eyfsAreas.map(area => (
                    <option key={area.id} value={area.name}>{area.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategory
                </label>
                <select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {eyfsAreas.find(a => a.name === selectedArea)?.subcategories.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assessment Level
              </label>
              <div className="flex space-x-2">
                {levels.map(level => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedLevel === level
                        ? 'bg-purple-100 text-purple-800 border-purple-200'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    } border`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Add New Comment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Comment</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment Text
                </label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Enter your comment using [child], [he/she], [his/her], [him/her] placeholders..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <strong>Target:</strong> {selectedArea} → {selectedSubcategory} → {selectedLevel}
                </div>
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
                  Add Comment
                </button>
              </div>
            </div>
          </motion.div>

          {/* Comments List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Comments ({currentComments.length})
              </h2>
              <div className="text-sm text-gray-600">
                {selectedArea} → {selectedSubcategory} → {selectedLevel}
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {currentComments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    {editingId === comment.id ? (
                      <div className="space-y-3">
                        <textarea
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={handleSaveEdit}
                            className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                          >
                            <SafeIcon icon={FiCheck} className="w-4 h-4 mr-1" />
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="flex items-center px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
                          >
                            <SafeIcon icon={FiX} className="w-4 h-4 mr-1" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-gray-800">{comment.text}</p>
                          {showPreview && (
                            <p className="text-sm text-blue-600 mt-2 italic">
                              Preview: {formatObservationText(comment.text, previewChild.name, previewChild.gender)}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleEditComment(comment)}
                            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="p-1 text-red-600 hover:text-red-800 transition-colors"
                          >
                            <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {currentComments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <SafeIcon icon={FiDatabase} className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No comments added for this category yet.</p>
                  <p className="text-sm">Add your first comment above!</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="showPreview"
                  checked={showPreview}
                  onChange={(e) => setShowPreview(e.target.checked)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="showPreview" className="text-sm font-medium text-gray-700">
                  Show live preview
                </label>
              </div>
              
              {showPreview && (
                <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preview Child Name
                    </label>
                    <input
                      type="text"
                      value={previewChild.name}
                      onChange={(e) => setPreviewChild(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      value={previewChild.gender}
                      onChange={(e) => setPreviewChild(prev => ({ ...prev, gender: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">They/Them</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Usage Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-green-50 rounded-xl p-6 border border-green-200"
          >
            <h3 className="text-lg font-semibold text-green-900 mb-4">Smart Placeholders</h3>
            <div className="space-y-3 text-sm text-green-800">
              <div className="flex items-center space-x-2">
                <code className="bg-green-100 px-2 py-1 rounded">[child]</code>
                <span>→ Child's first name</span>
              </div>
              <div className="flex items-center space-x-2">
                <code className="bg-green-100 px-2 py-1 rounded">[he/she]</code>
                <span>→ he, she, or they</span>
              </div>
              <div className="flex items-center space-x-2">
                <code className="bg-green-100 px-2 py-1 rounded">[his/her]</code>
                <span>→ his, her, or their</span>
              </div>
              <div className="flex items-center space-x-2">
                <code className="bg-green-100 px-2 py-1 rounded">[him/her]</code>
                <span>→ him, her, or them</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-100 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Example:</strong> "[child] showed persistence when [he/she] was building with blocks."
              </p>
              <p className="text-sm text-green-700 mt-1">
                <strong>Result:</strong> "Emma showed persistence when she was building with blocks."
              </p>
            </div>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Comments</span>
                <span className="font-semibold text-purple-600">{totalComments}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Current Category</span>
                <span className="font-semibold text-blue-600">{currentComments.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Categories Used</span>
                <span className="font-semibold text-green-600">
                  {Object.keys(customComments).length}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CommentBankBuilder;