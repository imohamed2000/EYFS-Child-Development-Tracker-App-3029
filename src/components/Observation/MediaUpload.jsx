import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCamera, FiVideo, FiX, FiUpload, FiFile } = FiIcons;

const MediaUpload = ({ mediaFiles, onMediaChange, maxFiles = 5 }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleFileSelect = (files, type = 'image') => {
    const newFiles = Array.from(files).slice(0, maxFiles - mediaFiles.length).map(file => ({
      id: Date.now() + Math.random(),
      file,
      type,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }));

    onMediaChange([...mediaFiles, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    const imageFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    
    if (imageFiles.length > 0) {
      handleFileSelect(imageFiles, imageFiles[0].type.startsWith('video/') ? 'video' : 'image');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeMedia = (id) => {
    const updatedFiles = mediaFiles.filter(file => file.id !== id);
    onMediaChange(updatedFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <SafeIcon icon={FiUpload} className="w-8 h-8 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">
          Drag and drop photos or videos here, or click to select
        </p>
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <SafeIcon icon={FiCamera} className="w-5 h-5 mr-2" />
            Add Photos
          </button>
          <button
            type="button"
            onClick={() => videoInputRef.current?.click()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <SafeIcon icon={FiVideo} className="w-5 h-5 mr-2" />
            Add Videos
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Maximum {maxFiles} files. JPG, PNG, MP4, MOV up to 10MB each
        </p>
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFileSelect(e.target.files, 'image')}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        multiple
        className="hidden"
        onChange={(e) => handleFileSelect(e.target.files, 'video')}
      />

      {/* Preview Grid */}
      {mediaFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mediaFiles.map((media) => (
            <motion.div
              key={media.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {media.type === 'image' ? (
                  <img
                    src={media.url}
                    alt="Uploaded content"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <video
                      src={media.url}
                      className="w-full h-full object-cover"
                      controls
                    />
                    <div className="absolute top-2 left-2">
                      <SafeIcon icon={FiVideo} className="w-5 h-5 text-white bg-black bg-opacity-50 rounded p-1" />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeMedia(media.id)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <SafeIcon icon={FiX} className="w-4 h-4" />
              </button>

              {/* File Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiFile} className="w-3 h-3" />
                  <span className="text-xs truncate">{media.name}</span>
                </div>
                <div className="text-xs text-gray-300">
                  {formatFileSize(media.size)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaUpload;