import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../../components/common/SafeIcon';
import { observationStatements } from '../../../data/commentBank';

const { FiPlus, FiEdit3, FiTrash2, FiSave, FiX, FiCopy, FiEye, FiFileText, FiUpload, FiDownload } = FiIcons;

const TemplateManager = () => {
  const [templates, setTemplates] = useState(observationStatements);
  const [selectedType, setSelectedType] = useState('Learning Story');
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [newTemplate, setNewTemplate] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState('');

  const observationTypes = Object.keys(templates);

  const handleAddTemplate = () => {
    if (!newTemplate.trim()) return;

    setTemplates(prev => ({
      ...prev,
      [selectedType]: [...(prev[selectedType] || []), newTemplate.trim()]
    }));
    
    setNewTemplate('');
  };

  const handleEditTemplate = (index, newText) => {
    setTemplates(prev => ({
      ...prev,
      [selectedType]: prev[selectedType].map((template, i) => 
        i === index ? newText : template
      )
    }));
    setEditingTemplate(null);
  };

  const handleDeleteTemplate = (index) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      setTemplates(prev => ({
        ...prev,
        [selectedType]: prev[selectedType].filter((_, i) => i !== index)
      }));
    }
  };

  const handleDuplicateTemplate = (template) => {
    setTemplates(prev => ({
      ...prev,
      [selectedType]: [...(prev[selectedType] || []), `${template} (Copy)`]
    }));
  };

  const handlePreview = (template) => {
    setPreviewTemplate(template);
    setShowPreview(true);
  };

  const exportTemplates = () => {
    const dataStr = JSON.stringify(templates, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'observation-templates.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importTemplates = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTemplates = JSON.parse(e.target.result);
        setTemplates(prev => ({ ...prev, ...importedTemplates }));
        alert('Templates imported successfully!');
      } catch (error) {
        alert('Error importing templates. Please check the file format.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const currentTemplates = templates[selectedType] || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Template Manager</h2>
          <p className="text-gray-600 mt-1">
            Create and manage observation templates for different observation types
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="file"
            accept=".json"
            onChange={importTemplates}
            className="hidden"
            id="import-templates"
          />
          <label
            htmlFor="import-templates"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <SafeIcon icon={FiUpload} className="w-4 h-4 mr-2" />
            Import
          </label>
          <button
            onClick={exportTemplates}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <SafeIcon icon={FiDownload} className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Type Selection */}
      <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Observation Type</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {observationTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedType === type
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="font-medium">{type}</div>
              <div className="text-sm opacity-75 mt-1">
                {currentTemplates.length} templates
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Add New Template */}
      <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Add New Template for {selectedType}
        </h3>
        <div className="space-y-4">
          <textarea
            value={newTemplate}
            onChange={(e) => setNewTemplate(e.target.value)}
            placeholder="Enter your template text using placeholders like [child], [he/she], [his/her]..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              💡 Use placeholders: [child], [he/she], [his/her], [him/her] for dynamic content
            </div>
            <button
              onClick={handleAddTemplate}
              disabled={!newTemplate.trim()}
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
              Add Template
            </button>
          </div>
        </div>
      </div>

      {/* Templates List */}
      <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedType} Templates ({currentTemplates.length})
          </h3>
        </div>

        <div className="space-y-4">
          {currentTemplates.length > 0 ? (
            currentTemplates.map((template, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                {editingTemplate === index ? (
                  <EditTemplateForm
                    template={template}
                    onSave={(newText) => handleEditTemplate(index, newText)}
                    onCancel={() => setEditingTemplate(null)}
                  />
                ) : (
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-gray-800 leading-relaxed">{template}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handlePreview(template)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Preview"
                      >
                        <SafeIcon icon={FiEye} className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDuplicateTemplate(template)}
                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                        title="Duplicate"
                      >
                        <SafeIcon icon={FiCopy} className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingTemplate(index)}
                        className="p-2 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(index)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <SafeIcon icon={FiFileText} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No templates yet</h3>
              <p className="text-gray-600">Add your first template for {selectedType} observations</p>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Template Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Original Template:</h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{previewTemplate}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Preview with Sample Data:</h4>
                    <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">
                      {previewTemplate
                        .replace(/\[child\]/g, 'Emma')
                        .replace(/\[he\/she\]/g, 'she')
                        .replace(/\[his\/her\]/g, 'her')
                        .replace(/\[him\/her\]/g, 'her')
                      }
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EditTemplateForm = ({ template, onSave, onCancel }) => {
  const [editText, setEditText] = useState(template);

  const handleSave = () => {
    if (editText.trim()) {
      onSave(editText.trim());
    }
  };

  return (
    <div className="space-y-3">
      <textarea
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      <div className="flex items-center space-x-2">
        <button
          onClick={handleSave}
          className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          <SafeIcon icon={FiSave} className="w-4 h-4 mr-1" />
          Save
        </button>
        <button
          onClick={onCancel}
          className="inline-flex items-center px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
        >
          <SafeIcon icon={FiX} className="w-4 h-4 mr-1" />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TemplateManager;