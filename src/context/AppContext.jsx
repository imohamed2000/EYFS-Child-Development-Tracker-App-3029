import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AppContext = createContext();

const initialState = {
  children: [],
  observations: [],
  classes: [], // Add classes to state
  currentUser: {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Early Years Practitioner',
    email: 'sarah.johnson@nursery.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  settings: {
    notifications: true,
    autoSave: true,
    theme: 'light'
  }
};

// Sample data with enhanced child profiles and more comprehensive observations
const sampleChildren = [
  {
    id: '1',
    firstName: 'Emma',
    lastName: 'Thompson',
    dateOfBirth: '2020-03-15',
    gender: 'female',
    photo: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=200&h=200&fit=crop&crop=face',
    parentName: 'Lisa Thompson',
    parentEmail: 'lisa.thompson@email.com',
    parentPhone: '+44 7123 456789',
    medicalInfo: 'No known allergies',
    dietaryRequirements: 'None',
    startDate: '2023-09-01',
    keyWorker: 'Sarah Johnson',
    room: 'Rainbow Room',
    emergencyContact: 'John Thompson - +44 7987 654321',
    attendanceDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  },
  {
    id: '2',
    firstName: 'Oliver',
    lastName: 'Smith',
    dateOfBirth: '2019-11-22',
    gender: 'male',
    photo: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=200&h=200&fit=crop&crop=face',
    parentName: 'Michael Smith',
    parentEmail: 'michael.smith@email.com',
    parentPhone: '+44 7234 567890',
    medicalInfo: 'Mild asthma - inhaler available',
    dietaryRequirements: 'Vegetarian',
    startDate: '2023-09-01',
    keyWorker: 'Sarah Johnson',
    room: 'Rainbow Room',
    emergencyContact: 'Sarah Smith - +44 7876 543210',
    attendanceDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  },
  {
    id: '3',
    firstName: 'Sophia',
    lastName: 'Davis',
    dateOfBirth: '2020-07-08',
    gender: 'female',
    photo: 'https://images.unsplash.com/photo-1518295751914-a770e3e8e8e1?w=200&h=200&fit=crop&crop=face',
    parentName: 'Rachel Davis',
    parentEmail: 'rachel.davis@email.com',
    parentPhone: '+44 7345 678901',
    medicalInfo: 'Nut allergy - EpiPen available',
    dietaryRequirements: 'Nut-free diet',
    startDate: '2023-09-01',
    keyWorker: 'Sarah Johnson',
    room: 'Rainbow Room',
    emergencyContact: 'David Davis - +44 7765 432109',
    attendanceDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  }
];

// Sample classes data
const sampleClasses = [
  { 
    id: 'rainbow', 
    name: 'Rainbow Room', 
    ageGroup: '2-3 years', 
    capacity: 12, 
    color: 'bg-red-400',
    description: 'Our youngest learners explore through sensory play and discovery',
    staff: ['Sarah Johnson', 'Emma Davis'],
    schedule: {
      openTime: '08:00',
      closeTime: '18:00',
      lunchTime: '12:00',
      napTime: '13:30'
    },
    facilities: ['Sensory area', 'Quiet corner', 'Art station', 'Book corner'],
    status: 'active',
    createdDate: '2023-09-01'
  },
  { 
    id: 'sunshine', 
    name: 'Sunshine Room', 
    ageGroup: '3-4 years', 
    capacity: 16, 
    color: 'bg-yellow-400',
    description: 'Developing independence and social skills through structured play',
    staff: ['Michael Brown', 'Lisa Wilson'],
    schedule: {
      openTime: '08:00',
      closeTime: '18:00',
      lunchTime: '12:00',
      napTime: '13:00'
    },
    facilities: ['Construction area', 'Role play corner', 'Music station', 'Outdoor access'],
    status: 'active',
    createdDate: '2023-09-01'
  },
  { 
    id: 'stars', 
    name: 'Stars Room', 
    ageGroup: '4-5 years', 
    capacity: 20, 
    color: 'bg-blue-400',
    description: 'School readiness focus with structured learning activities',
    staff: ['David Taylor', 'Rachel Green'],
    schedule: {
      openTime: '08:00',
      closeTime: '18:00',
      lunchTime: '12:30',
      napTime: null
    },
    facilities: ['Writing station', 'Math corner', 'Science area', 'Library corner'],
    status: 'active',
    createdDate: '2023-09-01'
  },
  { 
    id: 'moon', 
    name: 'Moon Room', 
    ageGroup: '3-5 years', 
    capacity: 18, 
    color: 'bg-indigo-400',
    description: 'Mixed age group focusing on peer learning and collaboration',
    staff: ['Alex Thompson'],
    schedule: {
      openTime: '08:00',
      closeTime: '18:00',
      lunchTime: '12:15',
      napTime: '13:15'
    },
    facilities: ['Collaborative space', 'Technology corner', 'Garden access', 'Workshop area'],
    status: 'active',
    createdDate: '2023-10-15'
  }
];

const sampleObservations = [
  {
    id: '1',
    childId: '1',
    date: '2024-01-15',
    time: '10:30',
    type: 'Learning Story',
    title: 'Emma\'s Creative Expression Through Art',
    description: 'Emma spent 20 minutes at the art table, carefully selecting different colored paints. She demonstrated excellent fine motor control while painting and explained her artwork to peers, saying "This is my house and this is my garden with flowers." She mixed colors independently, discovering that blue and yellow make green, and was excited to share this discovery with others.',
    eyfsAreas: ['Expressive Arts and Design', 'Communication and Language', 'Mathematics'],
    eyfsAssessments: [
      {
        area: 'Expressive Arts and Design',
        subcategories: [
          {
            name: 'Exploring and Using Media and Materials',
            level: 'secure',
            comments: 'Shows excellent control with paintbrush and demonstrates understanding of color mixing. Creates detailed artwork with intention.',
            evidence: 'Independently selected colors and created detailed artwork showing house and garden'
          }
        ]
      },
      {
        area: 'Communication and Language',
        subcategories: [
          {
            name: 'Speaking',
            level: 'secure',
            comments: 'Uses descriptive language to explain artwork. Shares discoveries enthusiastically with peers.',
            evidence: 'Explained artwork in detail and shared color mixing discovery'
          }
        ]
      }
    ],
    developmentStage: '30-50 months',
    mediaFiles: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
        name: 'emma-artwork.jpg'
      }
    ],
    nextSteps: 'Encourage Emma to write her name on her artwork. Introduce more complex color mixing activities. Support her in teaching other children about color mixing.',
    sharedWithParents: true,
    tags: ['creative', 'independent', 'confident', 'color-mixing']
  },
  {
    id: '2',
    childId: '2',
    date: '2024-01-14',
    time: '14:15',
    type: 'Snapshot',
    title: 'Oliver\'s Problem Solving with Construction',
    description: 'Oliver worked with building blocks for 25 minutes, creating a tall tower. When it fell down, he didn\'t get frustrated but instead analyzed what went wrong. He tried different approaches to make it more stable, including making a wider base and using different sized blocks. He showed persistence and mathematical thinking throughout.',
    eyfsAreas: ['Mathematics', 'Physical Development', 'Personal, Social and Emotional Development'],
    eyfsAssessments: [
      {
        area: 'Mathematics',
        subcategories: [
          {
            name: 'Shape, Space and Measures',
            level: 'secure',
            comments: 'Shows understanding of balance and spatial relationships when building. Demonstrates problem-solving skills.',
            evidence: 'Attempted multiple approaches to create stable structure, understood need for wider base'
          }
        ]
      }
    ],
    developmentStage: '40-60+ months',
    mediaFiles: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        name: 'oliver-building.jpg'
      }
    ],
    nextSteps: 'Introduce more complex construction challenges. Provide different materials for building. Encourage Oliver to teach problem-solving strategies to other children.',
    sharedWithParents: false,
    tags: ['persistent', 'problem-solving', 'mathematical', 'resilient']
  },
  {
    id: '3',
    childId: '3',
    date: '2024-01-13',
    time: '09:45',
    type: 'Learning Story',
    title: 'Sophia\'s Leadership in Group Play',
    description: 'During outdoor play, Sophia took on a leadership role in organizing a group game of "rescue the teddy." She assigned roles to different children, explained the rules clearly, and ensured everyone was included. When one child felt left out, Sophia created a special role for them. She demonstrated excellent social skills and empathy.',
    eyfsAreas: ['Personal, Social and Emotional Development', 'Communication and Language', 'Physical Development'],
    eyfsAssessments: [
      {
        area: 'Personal, Social and Emotional Development',
        subcategories: [
          {
            name: 'Making Relationships',
            level: 'exceeding',
            comments: 'Shows exceptional leadership skills and empathy. Includes all children and resolves conflicts positively.',
            evidence: 'Organized group game, assigned roles, ensured inclusion of all children'
          }
        ]
      }
    ],
    developmentStage: '30-50 months',
    mediaFiles: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=400&h=300&fit=crop',
        name: 'sophia-group-play.jpg'
      }
    ],
    nextSteps: 'Continue to encourage Sophia\'s leadership skills. Provide opportunities for her to mentor younger children. Support her in developing conflict resolution strategies.',
    sharedWithParents: true,
    tags: ['leadership', 'empathy', 'social', 'inclusive']
  },
  {
    id: '4',
    childId: '1',
    date: '2024-01-12',
    time: '11:20',
    type: 'Assessment',
    title: 'Emma\'s Phonics Progress Assessment',
    description: 'Emma participated in a phonics session where she demonstrated her understanding of initial sounds. She correctly identified 8 out of 10 initial sounds and was able to think of words that start with each sound. She showed particular strength with \'s\', \'t\', \'p\', and \'n\' sounds.',
    eyfsAreas: ['Literacy', 'Communication and Language'],
    eyfsAssessments: [
      {
        area: 'Literacy',
        subcategories: [
          {
            name: 'Reading',
            level: 'secure',
            comments: 'Demonstrates good understanding of initial sounds. Can identify most letter sounds and think of corresponding words.',
            evidence: 'Identified 8/10 initial sounds correctly, provided examples of words for each sound'
          }
        ]
      }
    ],
    developmentStage: '30-50 months',
    mediaFiles: [],
    nextSteps: 'Continue phonics work focusing on the sounds Emma found challenging. Introduce simple CVC words for blending practice.',
    sharedWithParents: true,
    tags: ['phonics', 'literacy', 'assessment', 'progress']
  },
  {
    id: '5',
    childId: '2',
    date: '2024-01-11',
    time: '15:30',
    type: 'Snapshot',
    title: 'Oliver\'s Caring Nature During Snack Time',
    description: 'During snack time, Oliver noticed that a younger child had dropped their apple slices. Without being asked, Oliver helped pick them up and offered to share his own snack. He gently comforted the upset child and helped them feel better.',
    eyfsAreas: ['Personal, Social and Emotional Development'],
    eyfsAssessments: [
      {
        area: 'Personal, Social and Emotional Development',
        subcategories: [
          {
            name: 'Making Relationships',
            level: 'secure',
            comments: 'Shows genuine care and empathy for others. Offers help spontaneously and comforts upset friends.',
            evidence: 'Helped younger child, shared snack, provided comfort without being prompted'
          }
        ]
      }
    ],
    developmentStage: '40-60+ months',
    mediaFiles: [],
    nextSteps: 'Continue to acknowledge Oliver\'s caring nature. Provide opportunities for him to be a buddy to younger children.',
    sharedWithParents: true,
    tags: ['caring', 'empathy', 'helpful', 'kind']
  },
  {
    id: '6',
    childId: '3',
    date: '2024-01-10',
    time: '10:15',
    type: 'Learning Story',
    title: 'Sophia\'s Mathematical Thinking in the Garden',
    description: 'While in the garden, Sophia became fascinated with counting and sorting the leaves she collected. She sorted them by size, color, and shape, creating clear categories. She counted up to 15 accurately and began to make patterns with the leaves, showing advanced mathematical thinking.',
    eyfsAreas: ['Mathematics', 'Understanding the World'],
    eyfsAssessments: [
      {
        area: 'Mathematics',
        subcategories: [
          {
            name: 'Numbers',
            level: 'secure',
            comments: 'Counts accurately to 15 and beyond. Shows understanding of sorting and categorizing.',
            evidence: 'Sorted leaves by multiple criteria, counted accurately, created patterns'
          }
        ]
      }
    ],
    developmentStage: '30-50 months',
    mediaFiles: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
        name: 'sophia-leaf-sorting.jpg'
      }
    ],
    nextSteps: 'Extend mathematical learning with more complex sorting activities. Introduce simple addition and subtraction using natural materials.',
    sharedWithParents: false,
    tags: ['mathematical', 'sorting', 'patterns', 'nature']
  }
];

function appReducer(state, action) {
  switch (action.type) {
    case 'LOAD_SAMPLE_DATA':
      return {
        ...state,
        children: sampleChildren,
        observations: sampleObservations,
        classes: sampleClasses
      };

    case 'ADD_CHILD':
      return {
        ...state,
        children: [...state.children, { ...action.payload, id: uuidv4() }]
      };

    case 'UPDATE_CHILD':
      return {
        ...state,
        children: state.children.map(child =>
          child.id === action.payload.id ? { ...child, ...action.payload } : child
        )
      };

    case 'DELETE_CHILD':
      return {
        ...state,
        children: state.children.filter(child => child.id !== action.payload)
      };

    case 'ADD_OBSERVATION':
      return {
        ...state,
        observations: [...state.observations, { ...action.payload, id: uuidv4() }]
      };

    case 'UPDATE_OBSERVATION':
      return {
        ...state,
        observations: state.observations.map(obs =>
          obs.id === action.payload.id ? { ...obs, ...action.payload } : obs
        )
      };

    case 'DELETE_OBSERVATION':
      return {
        ...state,
        observations: state.observations.filter(obs => obs.id !== action.payload)
      };

    // Class management actions
    case 'ADD_CLASS':
      return {
        ...state,
        classes: [...state.classes, { ...action.payload, id: action.payload.id || uuidv4() }]
      };

    case 'UPDATE_CLASS':
      return {
        ...state,
        classes: state.classes.map(cls =>
          cls.id === action.payload.id ? { ...cls, ...action.payload } : cls
        )
      };

    case 'DELETE_CLASS':
      return {
        ...state,
        classes: state.classes.filter(cls => cls.id !== action.payload)
      };

    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Load sample data on app start
    dispatch({ type: 'LOAD_SAMPLE_DATA' });
  }, []);

  const value = {
    ...state,
    dispatch
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}