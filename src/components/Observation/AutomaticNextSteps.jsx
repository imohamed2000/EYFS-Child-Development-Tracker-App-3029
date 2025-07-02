import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { generateAutomaticNextSteps } from '../../data/expandedCommentBank';
import { useApp } from '../../context/AppContext';

const { FiTarget, FiRefreshCw, FiPlus, FiCheck } = FiIcons;

const AutomaticNextSteps = ({ 
  eyfsAssessments, 
  selectedChildId, 
  onNextStepsChange,
  currentNextSteps = ''
}) => {
  const { children } = useApp();
  const [generatedSteps, setGeneratedSteps] = useState([]);
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const selectedChild = children.find(c => c.id === selectedChildId);

  // Generate next steps when assessments change
  useEffect(() => {
    if (eyfsAssessments.length > 0 && selectedChild) {
      generateNextSteps();
    }
  }, [eyfsAssessments, selectedChildId]);

  const generateNextSteps = async () => {
    if (!selectedChild) return;

    setIsLoading(true);
    
    try {
      const allSteps = [];
      
      // Generate steps for each assessed area
      for (const assessment of eyfsAssessments) {
        for (const subcategory of assessment.subcategories) {
          if (subcategory.level) {
            const steps = generateAutomaticNextSteps(
              assessment.area,
              subcategory.name,
              subcategory.level,
              selectedChild.firstName,
              selectedChild.gender
            );
            
            allSteps.push(...steps.map(step => ({
              id: `${assessment.area}-${subcategory.name}-${Math.random()}`,
              text: step,
              area: assessment.area,
              subcategory: subcategory.name,
              level: subcategory.level,
              selected: false
            })));
          }
        }
      }
      
      // Remove duplicates and limit to 15 most relevant
      const uniqueSteps = allSteps.filter((step, index, self) => 
        index === self.findIndex(s => s.text === step.text)
      ).slice(0, 15);
      
      setGeneratedSteps(uniqueSteps);
    } catch (error) {
      console.error('Error generating next steps:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStepToggle = (stepId) => {
    setGeneratedSteps(prev => 
      prev.map(step => 
        step.id === stepId 
          ? { ...step, selected: !step.selected }
          : step
      )
    );
  };

  const handleApplySelected = () => {
    const selected = generatedSteps.filter(step => step.selected);
    const selectedTexts = selected.map(step => step.text);
    
    // Combine with existing next steps
    const combined = currentNextSteps 
      ? `${currentNextSteps}\n\n${selectedTexts.join('\n\n')}`
      : selectedTexts.join('\n\n');
    
    onNextStepsChange(combined);
    
    // Reset selections
    setGeneratedSteps(prev => 
      prev.map(step => ({ ...step, selected: false }))
    );
  };

  const selectedCount = generatedSteps.filter(step => step.selected).length;

  if (!selectedChild || eyfsAssessments.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <SafeIcon icon={FiTarget} className="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <p className="text-gray-600">
          Select a child and complete EYFS assessments to generate automatic next steps
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiTarget} className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Automatic Next Steps
            </h3>
            <p className="text-sm text-gray-600">
              AI-generated based on {selectedChild.firstName}'s assessments
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {selectedCount > 0 && (
            <button
              onClick={handleApplySelected}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
              Add Selected ({selectedCount})
            </button>
          )}
          
          <button
            onClick={generateNextSteps}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <SafeIcon 
              icon={FiRefreshCw} 
              className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} 
            />
            {isLoading ? 'Generating...' : 'Regenerate'}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {generatedSteps.map((step) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  step.selected
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
                onClick={() => handleStepToggle(step.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                    step.selected
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300'
                  }`}>
                    {step.selected && (
                      <SafeIcon icon={FiCheck} className="w-3 h-3 text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm leading-relaxed">
                      {step.text}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        {step.area}
                      </span>
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                        {step.subcategory}
                      </span>
                      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                        {step.level}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {generatedSteps.length === 0 && !isLoading && (
            <div className="text-center py-8 text-gray-500">
              <SafeIcon icon={FiTarget} className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No next steps generated yet.</p>
              <p className="text-sm">Complete EYFS assessments and click "Generate"</p>
            </div>
          )}
        </div>
      )}
      
      {generatedSteps.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>💡 Tip:</strong> These next steps are automatically generated based on 
            {selectedChild.firstName}'s current assessment levels. Select the most relevant 
            ones to add to your observation.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default AutomaticNextSteps;