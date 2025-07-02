import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { commentBank } from '../../data/commentBank';
import { createSmartObservationText } from '../../utils/observationHelpers';
import { useApp } from '../../context/AppContext';

const { FiChevronDown, FiPlus } = FiIcons;

const CommentBankDropdown = ({ eyfsArea, subcategory, onSelectComment, selectedChildId, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { children } = useApp();
  
  const comments = commentBank[eyfsArea]?.[subcategory] || [];
  const selectedChild = children.find(c => c.id === selectedChildId);

  if (comments.length === 0) return null;

  const handleCommentSelect = (comment) => {
    if (selectedChild) {
      const smartComment = createSmartObservationText(
        comment, 
        selectedChild.firstName, 
        selectedChild.gender
      );
      onSelectComment(smartComment);
    } else {
      onSelectComment(comment);
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
      >
        <SafeIcon icon={FiPlus} className="w-4 h-4 mr-1" />
        Suggested Comments
        <SafeIcon icon={FiChevronDown} className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 mb-2 px-2">
                {subcategory} - {eyfsArea}
                {selectedChild && (
                  <span className="ml-2 text-blue-600">
                    (for {selectedChild.firstName})
                  </span>
                )}
              </div>
              <div className="space-y-1">
                {comments.map((comment, index) => {
                  const previewText = selectedChild 
                    ? createSmartObservationText(comment, selectedChild.firstName, selectedChild.gender)
                    : comment;
                  
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleCommentSelect(comment)}
                      className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                      title={previewText}
                    >
                      <div className="line-clamp-2">
                        {previewText}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-5" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default CommentBankDropdown;