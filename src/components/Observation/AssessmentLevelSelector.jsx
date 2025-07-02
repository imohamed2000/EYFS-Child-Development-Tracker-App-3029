import React from 'react';
import { assessmentLevels } from '../../data/commentBank';

const AssessmentLevelSelector = ({ selectedLevel, onLevelChange, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        Assessment Level
      </label>
      <div className="grid grid-cols-2 gap-3">
        {assessmentLevels.map((level) => (
          <label
            key={level.id}
            className={`relative flex cursor-pointer rounded-lg border p-4 hover:border-primary-300 transition-colors ${
              selectedLevel === level.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="assessmentLevel"
              value={level.id}
              checked={selectedLevel === level.id}
              onChange={(e) => onLevelChange(e.target.value)}
              className="sr-only"
            />
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${level.color}`}>
                  {level.label}
                </span>
                <span className="ml-2 text-sm text-gray-600">
                  Level {level.value}
                </span>
              </div>
              <span className="mt-2 text-xs text-gray-500">
                {level.description}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AssessmentLevelSelector;