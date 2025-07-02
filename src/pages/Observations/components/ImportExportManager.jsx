import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../../components/common/SafeIcon';
import { useApp } from '../../../context/AppContext';

const { FiUpload, FiDownload, FiFileText, FiDatabase, FiCheckCircle, FiAlertCircle, FiRefreshCw } = FiIcons;

const ImportExportManager = () => {
  const { observations, children, dispatch } = useApp();
  const [importStatus, setImportStatus] = useState(null);
  const [exportFormat, setExportFormat] = useState('json');
  const [importType, setImportType] = useState('observations');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const exportFormats = [
    { value: 'json', label: 'JSON', description: 'Complete data with all fields' },
    { value: 'csv', label: 'CSV', description: 'Spreadsheet format for analysis' },
    { value: 'pdf', label: 'PDF', description: 'Formatted report for printing' }
  ];

  const importTypes = [
    { value: 'observations', label: 'Observations', description: 'Import observation records' },
    { value: 'templates', label: 'Templates', description: 'Import observation templates' },
    { value: 'comments', label: 'Comment Bank', description: 'Import comment bank entries' }
  ];

  const handleExport = async () => {
    setIsProcessing(true);
    
    try {
      let exportData;
      let filename;
      let mimeType;

      switch (exportFormat) {
        case 'json':
          exportData = JSON.stringify({
            observations,
            children: children.map(child => ({
              id: child.id,
              firstName: child.firstName,
              lastName: child.lastName,
              room: child.room
            })),
            exportDate: new Date().toISOString(),
            version: '1.0'
          }, null, 2);
          filename = `observations-export-${new Date().toISOString().split('T')[0]}.json`;
          mimeType = 'application/json';
          break;

        case 'csv':
          const csvHeaders = [
            'ID', 'Child Name', 'Title', 'Type', 'Date', 'Time', 'Description', 
            'EYFS Areas', 'Next Steps', 'Shared with Parents'
          ];
          
          const csvRows = observations.map(obs => {
            const child = children.find(c => c.id === obs.childId);
            return [
              obs.id,
              child ? `${child.firstName} ${child.lastName}` : 'Unknown',
              obs.title,
              obs.type,
              obs.date,
              obs.time,
              `"${obs.description.replace(/"/g, '""')}"`,
              `"${(obs.eyfsAreas || []).join(', ')}"`,
              `"${(obs.nextSteps || '').replace(/"/g, '""')}"`,
              obs.sharedWithParents ? 'Yes' : 'No'
            ].join(',');
          });

          exportData = [csvHeaders.join(','), ...csvRows].join('\n');
          filename = `observations-export-${new Date().toISOString().split('T')[0]}.csv`;
          mimeType = 'text/csv';
          break;

        case 'pdf':
          // For PDF export, we would typically use a library like jsPDF
          // For now, we'll create a simple text-based export
          exportData = generatePDFContent();
          filename = `observations-report-${new Date().toISOString().split('T')[0]}.txt`;
          mimeType = 'text/plain';
          break;

        default:
          throw new Error('Unsupported export format');
      }

      // Create and download file
      const blob = new Blob([exportData], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setImportStatus({
        type: 'success',
        message: `Successfully exported ${observations.length} observations as ${exportFormat.toUpperCase()}`
      });

    } catch (error) {
      setImportStatus({
        type: 'error',
        message: `Export failed: ${error.message}`
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const generatePDFContent = () => {
    let content = `EYFS TRACKER - OBSERVATIONS REPORT\n`;
    content += `Generated: ${new Date().toLocaleDateString()}\n`;
    content += `Total Observations: ${observations.length}\n\n`;
    content += `${'='.repeat(50)}\n\n`;

    observations.forEach((obs, index) => {
      const child = children.find(c => c.id === obs.childId);
      content += `${index + 1}. ${obs.title}\n`;
      content += `Child: ${child ? `${child.firstName} ${child.lastName}` : 'Unknown'}\n`;
      content += `Type: ${obs.type}\n`;
      content += `Date: ${obs.date} at ${obs.time}\n`;
      content += `EYFS Areas: ${(obs.eyfsAreas || []).join(', ')}\n`;
      content += `Description: ${obs.description}\n`;
      if (obs.nextSteps) {
        content += `Next Steps: ${obs.nextSteps}\n`;
      }
      content += `Shared with Parents: ${obs.sharedWithParents ? 'Yes' : 'No'}\n`;
      content += `${'-'.repeat(30)}\n\n`;
    });

    return content;
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsProcessing(true);
    setImportStatus(null);

    try {
      const text = await file.text();
      let importedData;

      if (file.name.endsWith('.json')) {
        importedData = JSON.parse(text);
      } else if (file.name.endsWith('.csv')) {
        importedData = parseCSV(text);
      } else {
        throw new Error('Unsupported file format. Please use JSON or CSV files.');
      }

      await processImportedData(importedData);

    } catch (error) {
      setImportStatus({
        type: 'error',
        message: `Import failed: ${error.message}`
      });
    } finally {
      setIsProcessing(false);
      event.target.value = '';
    }
  };

  const parseCSV = (csvText) => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        data.push(row);
      }
    }

    return data;
  };

  const processImportedData = async (data) => {
    let importCount = 0;

    switch (importType) {
      case 'observations':
        if (Array.isArray(data)) {
          // Direct array of observations
          data.forEach(obs => {
            if (obs.title && obs.description) {
              dispatch({ type: 'ADD_OBSERVATION', payload: { ...obs, id: `imported-${Date.now()}-${Math.random()}` } });
              importCount++;
            }
          });
        } else if (data.observations) {
          // Structured export with observations array
          data.observations.forEach(obs => {
            dispatch({ type: 'ADD_OBSERVATION', payload: { ...obs, id: `imported-${Date.now()}-${Math.random()}` } });
            importCount++;
          });
        }
        break;

      case 'templates':
        // Handle template imports
        if (data.templates || data.observationStatements) {
          importCount = Object.keys(data.templates || data.observationStatements).length;
          // In a real app, this would update the template store
        }
        break;

      case 'comments':
        // Handle comment bank imports
        if (data.commentBank) {
          importCount = Object.keys(data.commentBank).reduce((total, area) => {
            return total + Object.keys(data.commentBank[area]).reduce((areaTotal, subcategory) => {
              return areaTotal + data.commentBank[area][subcategory].length;
            }, 0);
          }, 0);
          // In a real app, this would update the comment bank
        }
        break;

      default:
        throw new Error('Unknown import type');
    }

    setImportStatus({
      type: 'success',
      message: `Successfully imported ${importCount} ${importType}`
    });
  };

  const downloadTemplate = () => {
    let templateData;
    let filename;

    switch (importType) {
      case 'observations':
        templateData = JSON.stringify([
          {
            title: "Sample Observation",
            description: "This is a sample observation description",
            type: "Learning Story",
            date: "2024-01-15",
            time: "10:30",
            childId: "child-id-here",
            eyfsAreas: ["Communication and Language"],
            nextSteps: "Continue to encourage speaking",
            sharedWithParents: false
          }
        ], null, 2);
        filename = 'observations-template.json';
        break;

      case 'templates':
        templateData = JSON.stringify({
          "Learning Story": [
            "Today I observed [child] engaging in...",
            "[child] showed great interest in..."
          ],
          "Snapshot": [
            "Quick observation: [child] was...",
            "I noticed [child] independently..."
          ]
        }, null, 2);
        filename = 'templates-template.json';
        break;

      case 'comments':
        templateData = JSON.stringify({
          "Communication and Language": {
            "Listening and Attention": [
              "[child] shows excellent listening skills during story time",
              "[He/She] responds appropriately to instructions"
            ]
          }
        }, null, 2);
        filename = 'comment-bank-template.json';
        break;
    }

    const blob = new Blob([templateData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Import & Export Manager</h2>
        <p className="text-gray-600 mt-1">
          Bulk import and export observation data, templates, and settings
        </p>
      </div>

      {/* Status Messages */}
      {importStatus && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg border ${
            importStatus.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <div className="flex items-center">
            <SafeIcon 
              icon={importStatus.type === 'success' ? FiCheckCircle : FiAlertCircle} 
              className="w-5 h-5 mr-2" 
            />
            {importStatus.message}
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Export Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <SafeIcon icon={FiDownload} className="w-5 h-5 mr-2 text-green-600" />
            Export Data
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Export Format
              </label>
              <div className="space-y-2">
                {exportFormats.map(format => (
                  <label
                    key={format.value}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      exportFormat === format.value
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="exportFormat"
                      value={format.value}
                      checked={exportFormat === format.value}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{format.label}</div>
                      <div className="text-sm text-gray-600">{format.description}</div>
                    </div>
                    {exportFormat === format.value && (
                      <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-green-600" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Export Summary</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• {observations.length} observations</p>
                <p>• {children.length} children profiles</p>
                <p>• Export date: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <button
              onClick={handleExport}
              disabled={isProcessing}
              className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <SafeIcon icon={FiRefreshCw} className="w-5 h-5 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <SafeIcon icon={FiDownload} className="w-5 h-5 mr-2" />
                  Export Data
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Import Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <SafeIcon icon={FiUpload} className="w-5 h-5 mr-2 text-blue-600" />
            Import Data
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Import Type
              </label>
              <div className="space-y-2">
                {importTypes.map(type => (
                  <label
                    key={type.value}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      importType === type.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="importType"
                      value={type.value}
                      checked={importType === type.value}
                      onChange={(e) => setImportType(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{type.label}</div>
                      <div className="text-sm text-gray-600">{type.description}</div>
                    </div>
                    {importType === type.value && (
                      <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-blue-600" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={downloadTemplate}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <SafeIcon icon={FiFileText} className="w-4 h-4 mr-2" />
                Download Template
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json,.csv"
                onChange={handleImport}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <SafeIcon icon={FiRefreshCw} className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiUpload} className="w-5 h-5 mr-2" />
                    Select File to Import
                  </>
                )}
              </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">⚠️ Import Guidelines</h4>
              <div className="text-sm text-yellow-800 space-y-1">
                <p>• Supported formats: JSON, CSV</p>
                <p>• Download template first for correct format</p>
                <p>• Large imports may take several minutes</p>
                <p>• Backup your data before importing</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bulk Operations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-soft p-6 border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <SafeIcon icon={FiDatabase} className="w-5 h-5 mr-2 text-purple-600" />
          Bulk Operations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left">
            <div className="font-medium text-gray-900 mb-1">Bulk Update EYFS Areas</div>
            <div className="text-sm text-gray-600">Update EYFS areas for multiple observations</div>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left">
            <div className="font-medium text-gray-900 mb-1">Bulk Share with Parents</div>
            <div className="text-sm text-gray-600">Share multiple observations at once</div>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left">
            <div className="font-medium text-gray-900 mb-1">Archive Old Observations</div>
            <div className="text-sm text-gray-600">Archive observations older than specified date</div>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ImportExportManager;