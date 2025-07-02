import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import { format, addDays, startOfWeek, addWeeks } from 'date-fns';

const { FiCalendar, FiPlus, FiEdit, FiEye, FiUsers, FiTarget, FiBook, FiClock, FiCopy, FiTrash2, FiSave, FiX, FiSearch, FiGripVertical, FiMoreVertical, FiFilter, FiUpload, FiDownload, FiSettings, FiFileText } = FiIcons;

const Planning = () => {
  const [activeTab, setActiveTab] = useState('planner');
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [draggedActivity, setDraggedActivity] = useState(null);
  const [dragOverSlot, setDragOverSlot] = useState(null);
  const [showCreateActivity, setShowCreateActivity] = useState(false);
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importType, setImportType] = useState('activities');
  const [plannerData, setPlannerData] = useState({});
  const [activityBank, setActivityBank] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Time settings
  const [timeSettings, setTimeSettings] = useState({
    dayStartTime: '08:00',
    dayEndTime: '17:00',
    sessionDuration: 15, // minutes
    breaks: [
      { id: 1, name: 'Morning Break', startTime: '10:30', endTime: '10:45', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
      { id: 2, name: 'Lunch Break', startTime: '12:00', endTime: '13:00', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
      { id: 3, name: 'Afternoon Break', startTime: '15:15', endTime: '15:30', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] }
    ]
  });

  const fileInputRef = useRef(null);

  // Initialize data
  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = () => {
    // Activity bank with more variety
    const activities = [
      {
        id: 'act1',
        title: 'Circle Time Discussion',
        duration: 30,
        category: 'Communication',
        ageGroup: '3-5 years',
        description: 'Interactive discussion with props and questions',
        color: 'bg-blue-100 border-blue-300',
        resources: ['Carpet area', 'Discussion props', 'Visual aids'],
        objectives: ['Listening skills', 'Speaking confidence']
      },
      {
        id: 'act2',
        title: 'Water Play Station',
        duration: 45,
        category: 'Mathematics',
        ageGroup: '3-4 years',
        description: 'Exploring capacity and measurement through water play',
        color: 'bg-cyan-100 border-cyan-300',
        resources: ['Water table', 'Measuring cups', 'Funnels'],
        objectives: ['Understanding capacity', 'Fine motor skills']
      },
      {
        id: 'act3',
        title: 'Art & Craft Corner',
        duration: 60,
        category: 'Creative Arts',
        ageGroup: '2-5 years',
        description: 'Free expression through various art materials',
        color: 'bg-pink-100 border-pink-300',
        resources: ['Art materials', 'Paper', 'Brushes', 'Aprons'],
        objectives: ['Creativity', 'Fine motor development']
      },
      {
        id: 'act4',
        title: 'Outdoor Nature Walk',
        duration: 90,
        category: 'Understanding World',
        ageGroup: '3-5 years',
        description: 'Exploring the natural environment and collecting items',
        color: 'bg-green-100 border-green-300',
        resources: ['Collection bags', 'Magnifying glasses', 'Weather gear'],
        objectives: ['Environmental awareness', 'Observation skills']
      },
      {
        id: 'act5',
        title: 'Building & Construction',
        duration: 40,
        category: 'Mathematics',
        ageGroup: '3-5 years',
        description: 'Problem solving with blocks and construction materials',
        color: 'bg-orange-100 border-orange-300',
        resources: ['Building blocks', 'Pattern cards', 'Construction tools'],
        objectives: ['Spatial awareness', 'Problem solving']
      },
      {
        id: 'act6',
        title: 'Story Time',
        duration: 25,
        category: 'Literacy',
        ageGroup: '2-5 years',
        description: 'Interactive storytelling with books and props',
        color: 'bg-purple-100 border-purple-300',
        resources: ['Picture books', 'Story props', 'Comfortable seating'],
        objectives: ['Language development', 'Listening skills']
      },
      {
        id: 'act7',
        title: 'Music & Movement',
        duration: 35,
        category: 'Physical Development',
        ageGroup: '2-4 years',
        description: 'Dancing, singing and rhythm activities',
        color: 'bg-yellow-100 border-yellow-300',
        resources: ['Music player', 'Instruments', 'Movement props'],
        objectives: ['Gross motor skills', 'Rhythm and coordination']
      },
      {
        id: 'act8',
        title: 'Science Experiments',
        duration: 50,
        category: 'Understanding World',
        ageGroup: '4-5 years',
        description: 'Simple experiments to explore cause and effect',
        color: 'bg-indigo-100 border-indigo-300',
        resources: ['Experiment materials', 'Safety equipment', 'Recording sheets'],
        objectives: ['Scientific thinking', 'Observation skills']
      },
      {
        id: 'act9',
        title: 'Sensory Play',
        duration: 30,
        category: 'Physical Development',
        ageGroup: '2-4 years',
        description: 'Exploring textures and materials',
        color: 'bg-yellow-100 border-yellow-300',
        resources: ['Sensory bins', 'Various textures', 'Scoops'],
        objectives: ['Sensory development', 'Fine motor skills']
      },
      {
        id: 'act10',
        title: 'Dramatic Play',
        duration: 45,
        category: 'Creative Arts',
        ageGroup: '3-5 years',
        description: 'Role-playing and imaginative scenarios',
        color: 'bg-pink-100 border-pink-300',
        resources: ['Costumes', 'Props', 'Play area'],
        objectives: ['Imagination', 'Social skills']
      }
    ];

    // Planning templates
    const planTemplates = [
      {
        id: 'temp1',
        name: 'Balanced Daily Schedule',
        description: 'Mix of structured and free-play activities',
        schedule: {
          '09:00': { activity: 'act1', duration: 30 },
          '09:30': { activity: 'act5', duration: 45 },
          '10:15': { activity: 'act2', duration: 45 },
          '11:00': { activity: 'act4', duration: 60 }
        }
      },
      {
        id: 'temp2',
        name: 'Creative Focus Day',
        description: 'Emphasis on arts, crafts and creative expression',
        schedule: {
          '09:00': { activity: 'act1', duration: 30 },
          '09:30': { activity: 'act3', duration: 60 },
          '10:30': { activity: 'act7', duration: 35 },
          '11:05': { activity: 'act6', duration: 25 }
        }
      },
      {
        id: 'temp3',
        name: 'STEM Discovery Day',
        description: 'Science, technology, engineering and math focus',
        schedule: {
          '09:00': { activity: 'act8', duration: 50 },
          '09:50': { activity: 'act2', duration: 45 },
          '10:35': { activity: 'act5', duration: 40 },
          '11:15': { activity: 'act1', duration: 30 }
        }
      }
    ];

    setActivityBank(activities);
    setTemplates(planTemplates);
  };

  const tabs = [
    { id: 'planner', label: 'Weekly Planner', icon: FiCalendar },
    { id: 'templates', label: 'Plan Templates', icon: FiTarget }
  ];

  // Generate time slots based on settings
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = parseInt(timeSettings.dayStartTime.split(':')[0]);
    const startMinute = parseInt(timeSettings.dayStartTime.split(':')[1]);
    const endHour = parseInt(timeSettings.dayEndTime.split(':')[0]);
    const endMinute = parseInt(timeSettings.dayEndTime.split(':')[1]);
    
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    
    for (let minutes = startTotalMinutes; minutes < endTotalMinutes; minutes += timeSettings.sessionDuration) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(timeString);
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const weekDays = Array.from({ length: 5 }, (_, i) => {
    const date = addDays(startOfWeek(selectedWeek, { weekStartsOn: 1 }), i);
    return {
      date,
      dayName: format(date, 'EEEE'),
      dayShort: format(date, 'EEE'),
      dayNumber: format(date, 'd')
    };
  });

  // Check if a time slot is during a break
  const isBreakTime = (timeSlot, dayName) => {
    return timeSettings.breaks.some(breakItem => {
      if (!breakItem.days.includes(dayName)) return false;
      const slotTime = timeSlot.split(':').map(Number);
      const startTime = breakItem.startTime.split(':').map(Number);
      const endTime = breakItem.endTime.split(':').map(Number);
      
      const slotMinutes = slotTime[0] * 60 + slotTime[1];
      const startMinutes = startTime[0] * 60 + startTime[1];
      const endMinutes = endTime[0] * 60 + endTime[1];
      
      return slotMinutes >= startMinutes && slotMinutes < endMinutes;
    });
  };

  // Get break name for a time slot
  const getBreakName = (timeSlot, dayName) => {
    const breakItem = timeSettings.breaks.find(breakItem => {
      if (!breakItem.days.includes(dayName)) return false;
      const slotTime = timeSlot.split(':').map(Number);
      const startTime = breakItem.startTime.split(':').map(Number);
      const endTime = breakItem.endTime.split(':').map(Number);
      
      const slotMinutes = slotTime[0] * 60 + slotTime[1];
      const startMinutes = startTime[0] * 60 + startTime[1];
      const endMinutes = endTime[0] * 60 + endTime[1];
      
      return slotMinutes >= startMinutes && slotMinutes < endMinutes;
    });
    return breakItem?.name || '';
  };

  // Drag and Drop handlers
  const handleDragStart = (e, activity) => {
    setDraggedActivity(activity);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e, day, timeSlot) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOverSlot(`${day}-${timeSlot}`);
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  const handleDrop = (e, day, timeSlot) => {
    e.preventDefault();
    if (draggedActivity && !isBreakTime(timeSlot, day)) {
      const key = `${format(selectedWeek, 'yyyy-MM-dd')}-${day}-${timeSlot}`;
      setPlannerData(prev => ({
        ...prev,
        [key]: {
          ...draggedActivity,
          scheduledTime: timeSlot,
          day: day,
          id: `scheduled-${Date.now()}`
        }
      }));
    }
    setDraggedActivity(null);
    setDragOverSlot(null);
  };

  const removeScheduledActivity = (day, timeSlot) => {
    const key = `${format(selectedWeek, 'yyyy-MM-dd')}-${day}-${timeSlot}`;
    setPlannerData(prev => {
      const newData = { ...prev };
      delete newData[key];
      return newData;
    });
  };

  const getScheduledActivity = (day, timeSlot) => {
    const key = `${format(selectedWeek, 'yyyy-MM-dd')}-${day}-${timeSlot}`;
    return plannerData[key];
  };

  const applyTemplate = (template) => {
    weekDays.forEach(day => {
      Object.entries(template.schedule).forEach(([time, { activity, duration }]) => {
        const activityData = activityBank.find(act => act.id === activity);
        if (activityData) {
          const key = `${format(selectedWeek, 'yyyy-MM-dd')}-${day.dayName}-${time}`;
          setPlannerData(prev => ({
            ...prev,
            [key]: {
              ...activityData,
              scheduledTime: time,
              day: day.dayName,
              id: `scheduled-${Date.now()}-${Math.random()}`
            }
          }));
        }
      });
    });
  };

  // Import functions
  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split('\n').filter(line => line.trim());
        
        if (importType === 'activities') {
          importActivities(lines);
        } else if (importType === 'templates') {
          importTemplates(lines);
        } else if (importType === 'schedule') {
          importSchedule(lines);
        }
        
        setShowImportModal(false);
      } catch (error) {
        alert('Error importing file: ' + error.message);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const importActivities = (lines) => {
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const expectedHeaders = ['title', 'duration', 'category', 'ageGroup', 'description', 'resources', 'objectives'];
    
    if (!expectedHeaders.every(header => headers.includes(header))) {
      alert('CSV must have columns: title, duration, category, ageGroup, description, resources, objectives');
      return;
    }

    const newActivities = [];
    const categoryColors = {
      'Communication': 'bg-blue-100 border-blue-300',
      'Mathematics': 'bg-cyan-100 border-cyan-300',
      'Creative Arts': 'bg-pink-100 border-pink-300',
      'Understanding World': 'bg-green-100 border-green-300',
      'Physical Development': 'bg-yellow-100 border-yellow-300',
      'Literacy': 'bg-purple-100 border-purple-300'
    };

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      if (values.length >= expectedHeaders.length) {
        const activity = {
          id: `imported-${Date.now()}-${i}`,
          title: values[headers.indexOf('title')],
          duration: parseInt(values[headers.indexOf('duration')]) || 30,
          category: values[headers.indexOf('category')],
          ageGroup: values[headers.indexOf('ageGroup')],
          description: values[headers.indexOf('description')],
          resources: values[headers.indexOf('resources')].split(';').filter(r => r.trim()),
          objectives: values[headers.indexOf('objectives')].split(';').filter(o => o.trim()),
          color: categoryColors[values[headers.indexOf('category')]] || 'bg-gray-100 border-gray-300'
        };
        newActivities.push(activity);
      }
    }

    setActivityBank(prev => [...prev, ...newActivities]);
    alert(`Successfully imported ${newActivities.length} activities!`);
  };

  const importTemplates = (lines) => {
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const expectedHeaders = ['name', 'description', 'time', 'activity', 'duration'];
    
    if (!expectedHeaders.every(header => headers.includes(header))) {
      alert('CSV must have columns: name, description, time, activity, duration');
      return;
    }

    const templateMap = {};
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      if (values.length >= expectedHeaders.length) {
        const name = values[headers.indexOf('name')];
        const description = values[headers.indexOf('description')];
        const time = values[headers.indexOf('time')];
        const activity = values[headers.indexOf('activity')];
        const duration = parseInt(values[headers.indexOf('duration')]) || 30;

        if (!templateMap[name]) {
          templateMap[name] = {
            id: `template-${Date.now()}-${name}`,
            name,
            description,
            schedule: {}
          };
        }

        templateMap[name].schedule[time] = { activity, duration };
      }
    }

    const newTemplates = Object.values(templateMap);
    setTemplates(prev => [...prev, ...newTemplates]);
    alert(`Successfully imported ${newTemplates.length} templates!`);
  };

  const importSchedule = (lines) => {
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const expectedHeaders = ['day', 'time', 'activity'];
    
    if (!expectedHeaders.every(header => headers.includes(header))) {
      alert('CSV must have columns: day, time, activity');
      return;
    }

    let importedCount = 0;
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      if (values.length >= expectedHeaders.length) {
        const day = values[headers.indexOf('day')];
        const time = values[headers.indexOf('time')];
        const activityTitle = values[headers.indexOf('activity')];

        const activity = activityBank.find(act => act.title === activityTitle);
        if (activity) {
          const key = `${format(selectedWeek, 'yyyy-MM-dd')}-${day}-${time}`;
          setPlannerData(prev => ({
            ...prev,
            [key]: {
              ...activity,
              scheduledTime: time,
              day: day,
              id: `imported-${Date.now()}-${i}`
            }
          }));
          importedCount++;
        }
      }
    }

    alert(`Successfully imported ${importedCount} scheduled activities!`);
  };

  // Export functions
  const exportData = (type) => {
    let csvContent = '';
    let filename = '';

    if (type === 'activities') {
      csvContent = 'title,duration,category,ageGroup,description,resources,objectives\n';
      activityBank.forEach(activity => {
        const resources = activity.resources.join(';');
        const objectives = activity.objectives.join(';');
        csvContent += `"${activity.title}","${activity.duration}","${activity.category}","${activity.ageGroup}","${activity.description}","${resources}","${objectives}"\n`;
      });
      filename = 'activity-bank.csv';
    } else if (type === 'templates') {
      csvContent = 'name,description,time,activity,duration\n';
      templates.forEach(template => {
        Object.entries(template.schedule).forEach(([time, { activity, duration }]) => {
          csvContent += `"${template.name}","${template.description}","${time}","${activity}","${duration}"\n`;
        });
      });
      filename = 'plan-templates.csv';
    } else if (type === 'schedule') {
      csvContent = 'day,time,activity\n';
      Object.entries(plannerData).forEach(([key, activity]) => {
        csvContent += `"${activity.day}","${activity.scheduledTime}","${activity.title}"\n`;
      });
      filename = `weekly-schedule-${format(selectedWeek, 'yyyy-MM-dd')}.csv`;
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Download sample files
  const downloadSampleFile = (type) => {
    let content = '';
    let filename = '';

    if (type === 'activities') {
      content = `title,duration,category,ageGroup,description,resources,objectives
"Morning Circle Time",30,"Communication","3-5 years","Interactive group discussion and planning","Carpet area;Visual aids;Props","Listening skills;Speaking confidence;Social interaction"
"Water Exploration",45,"Mathematics","2-4 years","Hands-on exploration of volume and capacity","Water table;Measuring cups;Funnels;Towels","Understanding capacity;Fine motor skills;Mathematical concepts"
"Creative Art Station",60,"Creative Arts","2-5 years","Free expression through various art materials","Art supplies;Paper;Brushes;Aprons;Easels","Creativity;Fine motor development;Self-expression"`;
      filename = 'sample-activities.csv';
    } else if (type === 'templates') {
      content = `name,description,time,activity,duration
"Morning Routine","Structured start to the day","08:30","Morning Circle Time",30
"Morning Routine","Structured start to the day","09:00","Water Exploration",45
"Morning Routine","Structured start to the day","09:45","Creative Art Station",60
"Creative Day","Focus on arts and creativity","08:30","Morning Circle Time",30
"Creative Day","Focus on arts and creativity","09:00","Creative Art Station",90
"Creative Day","Focus on arts and creativity","10:30","Music and Movement",30
"STEM Focus","Science and math exploration","08:30","Morning Circle Time",30
"STEM Focus","Science and math exploration","09:00","Science Experiments",60
"STEM Focus","Science and math exploration","10:00","Building and Construction",45`;
      filename = 'sample-templates.csv';
    } else if (type === 'schedule') {
      content = `day,time,activity
"Monday","08:30","Morning Circle Time"
"Monday","09:00","Water Exploration"
"Monday","09:45","Creative Art Station"
"Tuesday","08:30","Morning Circle Time"
"Tuesday","09:00","Science Experiments"
"Tuesday","10:00","Building and Construction"
"Wednesday","08:30","Morning Circle Time"
"Wednesday","09:00","Music and Movement"
"Wednesday","09:30","Outdoor Nature Walk"`;
      filename = 'sample-schedule.csv';
    }

    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Filter activities
  const filteredActivities = activityBank.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(activityBank.map(activity => activity.category))];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <SafeIcon icon={FiCalendar} className="w-8 h-8 mr-3" />
                Activity Planner
              </h1>
              <p className="text-emerald-100 mt-2">Drag activities from the right panel to schedule your week</p>
              <div className="flex items-center space-x-6 mt-4 text-emerald-100">
                <span>🎯 {activityBank.length} Activities</span>
                <span>📋 {templates.length} Templates</span>
                <span>⏰ {timeSettings.dayStartTime} - {timeSettings.dayEndTime}</span>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 space-x-3">
              <button
                onClick={() => setShowSettings(true)}
                className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <SafeIcon icon={FiSettings} className="w-5 h-5 mr-2" />
                Settings
              </button>
              <button
                onClick={() => setShowImportModal(true)}
                className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <SafeIcon icon={FiUpload} className="w-5 h-5 mr-2" />
                Import
              </button>
              {activeTab === 'planner' && (
                <button
                  onClick={() => setShowCreatePlan(true)}
                  className="inline-flex items-center px-6 py-3 bg-white text-emerald-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <SafeIcon icon={FiPlus} className="w-5 h-5 mr-2" />
                  New Plan
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden p-6">
          {activeTab === 'planner' && (
            <div className="h-full space-y-6">
              {/* Week Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSelectedWeek(addWeeks(selectedWeek, -1))}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    ← Previous Week
                  </button>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Week of {format(startOfWeek(selectedWeek, { weekStartsOn: 1 }), 'MMMM dd, yyyy')}
                  </h2>
                  <button
                    onClick={() => setSelectedWeek(addWeeks(selectedWeek, 1))}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    Next Week →
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => exportData('schedule')}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <SafeIcon icon={FiDownload} className="w-4 h-4 mr-2" />
                    Export Schedule
                  </button>
                </div>
              </div>

              {/* Planning Grid */}
              <div className="grid grid-cols-6 gap-4 h-[calc(100vh-300px)] overflow-y-auto">
                {/* Time column */}
                <div className="col-span-1">
                  <div className="h-12 flex items-center justify-center font-medium text-gray-700 bg-gray-50 rounded-lg mb-2 sticky top-0 z-10">
                    Time
                  </div>
                  {timeSlots.map(timeSlot => (
                    <div key={timeSlot} className="h-16 flex items-center justify-center text-sm text-gray-600 border-r border-gray-200">
                      {timeSlot}
                    </div>
                  ))}
                </div>

                {/* Day columns */}
                {weekDays.map(day => (
                  <div key={day.date.toISOString()} className="col-span-1">
                    <div className="h-12 flex items-center justify-center font-medium text-gray-700 bg-gray-50 rounded-lg mb-2 sticky top-0 z-10">
                      <div className="text-center">
                        <div>{day.dayShort}</div>
                        <div className="text-xs text-gray-500">{day.dayNumber}</div>
                      </div>
                    </div>

                    {timeSlots.map(timeSlot => {
                      const scheduledActivity = getScheduledActivity(day.dayName, timeSlot);
                      const isDropZone = dragOverSlot === `${day.dayName}-${timeSlot}`;
                      const isBreak = isBreakTime(timeSlot, day.dayName);
                      const breakName = getBreakName(timeSlot, day.dayName);

                      return (
                        <div
                          key={timeSlot}
                          className={`h-16 border border-gray-200 rounded-lg mb-1 transition-all ${
                            isBreak
                              ? 'bg-orange-100 border-orange-300'
                              : isDropZone
                              ? 'bg-emerald-100 border-emerald-300 border-dashed'
                              : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                          onDragOver={(e) => !isBreak && handleDragOver(e, day.dayName, timeSlot)}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => !isBreak && handleDrop(e, day.dayName, timeSlot)}
                        >
                          {isBreak ? (
                            <div className="h-full flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-xs font-medium text-orange-800">{breakName}</div>
                                <SafeIcon icon={FiClock} className="w-4 h-4 text-orange-600 mx-auto" />
                              </div>
                            </div>
                          ) : scheduledActivity ? (
                            <div className={`h-full rounded-lg p-2 relative ${scheduledActivity.color} group`}>
                              <div className="text-xs font-medium text-gray-800 truncate">
                                {scheduledActivity.title}
                              </div>
                              <div className="text-xs text-gray-600">
                                {scheduledActivity.duration}min
                              </div>
                              <button
                                onClick={() => removeScheduledActivity(day.dayName, timeSlot)}
                                className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center text-gray-400 text-xs">
                              {isDropZone ? 'Drop here' : ''}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-gray-900">
                  Quick Start Templates
                </div>
                <button
                  onClick={() => exportData('templates')}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <SafeIcon icon={FiDownload} className="w-4 h-4 mr-2" />
                  Export Templates
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{template.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="text-sm font-medium text-gray-700">Schedule Preview:</div>
                      {Object.entries(template.schedule).map(([time, { activity }]) => {
                        const activityData = activityBank.find(act => act.id === activity);
                        return (
                          <div key={time} className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">{time}</span>
                            <span className="font-medium text-gray-800">{activityData?.title}</span>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => applyTemplate(template)}
                      className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Apply to Current Week
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-yellow-500">💡</div>
                  <div>
                    <div className="font-medium text-yellow-800">Template Tip</div>
                    <div className="text-yellow-700 text-sm">
                      Templates apply to all days of the current week. You can then customize individual days by dragging activities from the Activity Bank.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Activity Bank */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        {/* Activity Bank Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <SafeIcon icon={FiBook} className="w-5 h-5 mr-2" />
              Activity Bank
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => exportData('activities')}
                className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                title="Export Activities"
              >
                <SafeIcon icon={FiDownload} className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowCreateActivity(true)}
                className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <SafeIcon icon={FiPlus} className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="mt-3 text-xs text-emerald-600 bg-emerald-50 p-2 rounded">
            💡 Drag activities to the planner grid to schedule them
          </div>
        </div>

        {/* Activity List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              draggable
              onDragStart={(e) => handleDragStart(e, activity)}
              className={`${activity.color} rounded-lg p-4 cursor-move hover:shadow-md transition-all border-2 border-dashed`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2 flex-1">
                  <SafeIcon icon={FiGripVertical} className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <h4 className="font-semibold text-gray-900 text-sm leading-tight">{activity.title}</h4>
                </div>
                <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                  <SafeIcon icon={FiMoreVertical} className="w-4 h-4" />
                </button>
              </div>

              <p className="text-gray-700 text-xs mb-3 leading-relaxed">{activity.description}</p>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{activity.duration}min</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Age:</span>
                  <span className="font-medium">{activity.ageGroup}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{activity.category}</span>
                </div>
              </div>

              {activity.resources && activity.resources.length > 0 && (
                <div className="mt-3 pt-2 border-t border-gray-200">
                  <div className="text-xs text-gray-600 mb-1">Resources:</div>
                  <div className="flex flex-wrap gap-1">
                    {activity.resources.slice(0, 2).map((resource, idx) => (
                      <span key={idx} className="px-2 py-1 bg-white bg-opacity-50 text-xs rounded-full">
                        {resource}
                      </span>
                    ))}
                    {activity.resources.length > 2 && (
                      <span className="px-2 py-1 bg-white bg-opacity-50 text-xs rounded-full">
                        +{activity.resources.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {filteredActivities.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <SafeIcon icon={FiBook} className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No activities found</p>
              <p className="text-xs">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          timeSettings={timeSettings}
          onSave={setTimeSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Import Modal */}
      {showImportModal && (
        <ImportModal
          importType={importType}
          setImportType={setImportType}
          onClose={() => setShowImportModal(false)}
          onFileSelect={() => fileInputRef.current?.click()}
          onDownloadSample={downloadSampleFile}
        />
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        className="hidden"
        onChange={handleFileImport}
      />

      {/* Other Modals */}
      {showCreateActivity && (
        <CreateActivityModal
          onClose={() => setShowCreateActivity(false)}
          onSave={(activity) => {
            setActivityBank(prev => [...prev, { ...activity, id: `act-${Date.now()}` }]);
            setShowCreateActivity(false);
          }}
        />
      )}

      {showCreatePlan && (
        <CreatePlanModal
          onClose={() => setShowCreatePlan(false)}
          onSave={(plan) => {
            console.log('Saving plan:', plan);
            setShowCreatePlan(false);
          }}
        />
      )}
    </div>
  );
};

// Settings Modal Component
const SettingsModal = ({ timeSettings, onSave, onClose }) => {
  const [formData, setFormData] = useState(timeSettings);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const addBreak = () => {
    const newBreak = {
      id: Date.now(),
      name: 'New Break',
      startTime: '10:00',
      endTime: '10:15',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    };
    setFormData(prev => ({
      ...prev,
      breaks: [...prev.breaks, newBreak]
    }));
  };

  const updateBreak = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      breaks: prev.breaks.map(breakItem =>
        breakItem.id === id ? { ...breakItem, [field]: value } : breakItem
      )
    }));
  };

  const removeBreak = (id) => {
    setFormData(prev => ({
      ...prev,
      breaks: prev.breaks.filter(breakItem => breakItem.id !== id)
    }));
  };

  const toggleBreakDay = (breakId, day) => {
    setFormData(prev => ({
      ...prev,
      breaks: prev.breaks.map(breakItem =>
        breakItem.id === breakId
          ? {
              ...breakItem,
              days: breakItem.days.includes(day)
                ? breakItem.days.filter(d => d !== day)
                : [...breakItem.days, day]
            }
          : breakItem
      )
    }));
  };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <h2 className="text-2xl font-bold">Time Settings</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors">
            <SafeIcon icon={FiX} className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-8">
            {/* Basic Time Settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Day Start Time</label>
                <input
                  type="time"
                  value={formData.dayStartTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, dayStartTime: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Day End Time</label>
                <input
                  type="time"
                  value={formData.dayEndTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, dayEndTime: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Duration (minutes)</label>
                <select
                  value={formData.sessionDuration}
                  onChange={(e) => setFormData(prev => ({ ...prev, sessionDuration: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>60 minutes</option>
                </select>
              </div>
            </div>

            {/* Breaks Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Break Times</h3>
                <button
                  type="button"
                  onClick={addBreak}
                  className="inline-flex items-center px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
                  Add Break
                </button>
              </div>

              <div className="space-y-4">
                {formData.breaks.map((breakItem) => (
                  <div key={breakItem.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Break Name</label>
                        <input
                          type="text"
                          value={breakItem.name}
                          onChange={(e) => updateBreak(breakItem.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                        <input
                          type="time"
                          value={breakItem.startTime}
                          onChange={(e) => updateBreak(breakItem.id, 'startTime', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                        <input
                          type="time"
                          value={breakItem.endTime}
                          onChange={(e) => updateBreak(breakItem.id, 'endTime', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                        />
                      </div>

                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => removeBreak(breakItem.id)}
                          className="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Days</label>
                      <div className="flex flex-wrap gap-2">
                        {weekDays.map(day => (
                          <label key={day} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={breakItem.days.includes(day)}
                              onChange={() => toggleBreakDay(breakItem.id, day)}
                              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-sm text-gray-700">{day}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
            >
              <SafeIcon icon={FiSave} className="w-5 h-5 mr-2" />
              Save Settings
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Import Modal Component
const ImportModal = ({ importType, setImportType, onClose, onFileSelect, onDownloadSample }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <h2 className="text-2xl font-bold">Import Data</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors">
            <SafeIcon icon={FiX} className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Import Type</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'activities', label: 'Activity Bank', desc: 'Import activities to use in planning' },
                  { id: 'templates', label: 'Plan Templates', desc: 'Import pre-made planning templates' },
                  { id: 'schedule', label: 'Weekly Schedule', desc: 'Import scheduled activities for current week' }
                ].map(type => (
                  <label key={type.id} className={`relative flex flex-col cursor-pointer rounded-lg border p-4 hover:border-emerald-300 transition-colors ${
                    importType === type.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="importType"
                      value={type.id}
                      checked={importType === type.id}
                      onChange={(e) => setImportType(e.target.value)}
                      className="sr-only"
                    />
                    <div className="font-medium text-gray-900">{type.label}</div>
                    <div className="text-sm text-gray-600 mt-1">{type.desc}</div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">CSV Format Requirements:</h3>
              <div className="text-sm text-blue-800 space-y-1">
                {importType === 'activities' && (
                  <div>
                    <div><strong>Columns:</strong> title, duration, category, ageGroup, description, resources, objectives</div>
                    <div><strong>Resources/Objectives:</strong> Separate multiple items with semicolons</div>
                  </div>
                )}
                {importType === 'templates' && (
                  <div>
                    <div><strong>Columns:</strong> name, description, time, activity, duration</div>
                    <div><strong>Note:</strong> Multiple rows with same name will be grouped into one template</div>
                  </div>
                )}
                {importType === 'schedule' && (
                  <div>
                    <div><strong>Columns:</strong> day, time, activity</div>
                    <div><strong>Note:</strong> Activity names must match existing activities in the bank</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => onDownloadSample(importType)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <SafeIcon icon={FiFileText} className="w-5 h-5 mr-2" />
                Download Sample File
              </button>

              <div className="space-x-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onFileSelect}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
                >
                  <SafeIcon icon={FiUpload} className="w-5 h-5 mr-2" />
                  Select CSV File
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Create Activity Modal (keeping existing implementation)
const CreateActivityModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Communication',
    duration: 30,
    ageGroup: '3-4 years',
    resources: '',
    objectives: ''
  });

  const categories = [
    { value: 'Communication', color: 'bg-blue-100 border-blue-300' },
    { value: 'Mathematics', color: 'bg-cyan-100 border-cyan-300' },
    { value: 'Creative Arts', color: 'bg-pink-100 border-pink-300' },
    { value: 'Understanding World', color: 'bg-green-100 border-green-300' },
    { value: 'Physical Development', color: 'bg-yellow-100 border-yellow-300' },
    { value: 'Literacy', color: 'bg-purple-100 border-purple-300' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const category = categories.find(c => c.value === formData.category);
    onSave({
      ...formData,
      color: category.color,
      resources: formData.resources.split('\n').filter(r => r.trim()),
      objectives: formData.objectives.split('\n').filter(o => o.trim())
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <h2 className="text-2xl font-bold">Create New Activity</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors">
            <SafeIcon icon={FiX} className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Activity Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.value}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  min="5"
                  max="120"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
              <select
                value={formData.ageGroup}
                onChange={(e) => setFormData(prev => ({ ...prev, ageGroup: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="2-3 years">2-3 years</option>
                <option value="3-4 years">3-4 years</option>
                <option value="4-5 years">4-5 years</option>
                <option value="2-5 years">2-5 years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resources Needed</label>
              <textarea
                value={formData.resources}
                onChange={(e) => setFormData(prev => ({ ...prev, resources: e.target.value }))}
                rows={3}
                placeholder="List each resource on a new line"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Learning Objectives</label>
              <textarea
                value={formData.objectives}
                onChange={(e) => setFormData(prev => ({ ...prev, objectives: e.target.value }))}
                rows={3}
                placeholder="List each objective on a new line"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
            >
              <SafeIcon icon={FiSave} className="w-5 h-5 mr-2" />
              Create Activity
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Create Plan Modal (keeping existing implementation)
const CreatePlanModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    theme: '',
    classroom: 'Rainbow Room'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-lg"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <h2 className="text-2xl font-bold">Create Weekly Plan</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors">
            <SafeIcon icon={FiX} className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Plan Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Week 1 - Spring Term"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme (Optional)</label>
              <input
                type="text"
                value={formData.theme}
                onChange={(e) => setFormData(prev => ({ ...prev, theme: e.target.value }))}
                placeholder="e.g., Animals, Space, Seasons"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                placeholder="Brief description of the week's focus..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Classroom</label>
              <select
                value={formData.classroom}
                onChange={(e) => setFormData(prev => ({ ...prev, classroom: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="Rainbow Room">Rainbow Room</option>
                <option value="Sunshine Room">Sunshine Room</option>
                <option value="Stars Room">Stars Room</option>
                <option value="Moon Room">Moon Room</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
            >
              <SafeIcon icon={FiSave} className="w-5 h-5 mr-2" />
              Create Plan
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Planning;