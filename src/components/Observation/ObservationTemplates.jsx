import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { observationStatements } from '../../data/commentBank';
import { createSmartObservationText } from '../../utils/observationHelpers';
import { useApp } from '../../context/AppContext';

const { FiChevronDown, FiPlus, FiType } = FiIcons;

const ObservationTemplates = ({ observationType, onSelectTemplate, selectedChildId, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { children } = useApp();
  
  const templates = observationStatements[observationType] || [];
  const selectedChild = children.find(c => c.id === selectedChildId);

  if (templates.length === 0) return null;

  const handleTemplateSelect = (template) => {
    if (selectedChild) {
      const smartTemplate = createSmartObservationText(
        template, 
        selectedChild.firstName, 
        selectedChild.gender,
        observationType
      );
      onSelectTemplate(smartTemplate);
    } else {
      onSelectTemplate(template);
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-3 py-1.5 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors border border-purple-200"
      >
        <SafeIcon icon={FiType} className="w-4 h-4 mr-1" />
        Observation Templates
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
                {observationType} Templates
                {selectedChild && (
                  <span className="ml-2 text-purple-600">
                    (for {selectedChild.firstName})
                  </span>
                )}
              </div>
              <div className="space-y-1">
                {templates.map((template, index) => {
                  const previewText = selectedChild 
                    ? createSmartObservationText(template, selectedChild.firstName, selectedChild.gender, observationType)
                    : template;
                  
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleTemplateSelect(template)}
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

export default ObservationTemplates;