import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { nextStepsBank } from '../../data/commentBank';
import { formatObservationText } from '../../utils/observationHelpers';
import { useApp } from '../../context/AppContext';

const { FiChevronDown, FiTarget } = FiIcons;

const NextStepsDropdown = ({ eyfsAreas, selectedChildId, onSelectNextStep, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { children } = useApp();
  
  const selectedChild = children.find(c => c.id === selectedChildId);

  // Get next steps for all selected EYFS areas
  const allNextSteps = eyfsAreas.reduce((acc, area) => {
    const steps = nextStepsBank[area] || [];
    return [...acc, ...steps.map(step => ({ area, step }))];
  }, []);

  if (allNextSteps.length === 0) return null;

  const handleNextStepSelect = (step) => {
    if (selectedChild) {
      const formattedStep = formatObservationText(step, selectedChild.firstName, selectedChild.gender);
      onSelectNextStep(formattedStep);
    } else {
      onSelectNextStep(step);
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
      >
        <SafeIcon icon={FiTarget} className="w-4 h-4 mr-1" />
        Suggested Next Steps
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
                Next Steps for Selected Areas
                {selectedChild && (
                  <span className="ml-2 text-green-600">
                    (for {selectedChild.firstName})
                  </span>
                )}
              </div>
              <div className="space-y-1">
                {allNextSteps.map(({ area, step }, index) => {
                  const previewText = selectedChild 
                    ? formatObservationText(step, selectedChild.firstName, selectedChild.gender)
                    : step;
                  
                  return (
                    <div key={index} className="border-b border-gray-100 last:border-b-0">
                      <div className="text-xs text-gray-500 px-2 py-1 bg-gray-50">{area}</div>
                      <button
                        type="button"
                        onClick={() => handleNextStepSelect(step)}
                        className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        title={previewText}
                      >
                        <div className="line-clamp-2">
                          {previewText}
                        </div>
                      </button>
                    </div>
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

export default NextStepsDropdown;