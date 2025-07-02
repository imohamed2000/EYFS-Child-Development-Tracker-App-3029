import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { questConfig } from './config/questConfig';
import Layout from './components/Layout/Layout';
import LoginPage from './components/Auth/LoginPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import Children from './pages/Children/Children';
import ChildProfile from './pages/Children/ChildProfile';
import Observations from './pages/Observations/Observations';
import AdminDashboard from './pages/Observations/AdminDashboard';
import CreateObservation from './pages/Observations/CreateObservation';
import LearningJourneys from './pages/LearningJourneys/LearningJourneys';
import LearningJourneyDetail from './pages/LearningJourneys/LearningJourneyDetail';
import Assessments from './pages/Assessments/Assessments';
import Planning from './pages/Planning/Planning';
import Milestones from './pages/Milestones/Milestones';
import ClassManagement from './pages/ClassManagement/ClassManagement';
import ParentCommunication from './pages/ParentCommunication/ParentCommunication';
import CohortTracker from './pages/CohortTracker/CohortTracker';
import UserManagement from './pages/UserManagement/UserManagement';
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';
import GetStarted from './pages/GetStarted/GetStarted';
import ParentPortal from './pages/ParentPortal/ParentPortal';
import { PERMISSIONS } from './data/roles';
import './App.css';

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/parent-portal" element={<ParentPortal />} />
        <Route path="/parent-portal/:childId" element={<ParentPortal />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="children"
            element={
              <ProtectedRoute requiredPermission={PERMISSIONS.CHILDREN_VIEW}>
                <Children />
              </ProtectedRoute>
            }
          />
          <Route
            path="children/:id"
            element={
              <ProtectedRoute requiredPermission={PERMISSIONS.CHILDREN_VIEW}>
                <ChildProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="observations"
            element={
              <ProtectedRoute requiredPermission={PERMISSIONS.OBSERVATIONS_VIEW}>
                <Observations />
              </ProtectedRoute>
            }
          />
          <Route
            path="observations/admin"
            element={
              <ProtectedRoute requiredPermission={PERMISSIONS.SETTINGS_SYSTEM}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="observations/create"
            element={
              <ProtectedRoute requiredPermission={PERMISSIONS.OBSERVATIONS_CREATE}>
                <CreateObservation />
              </ProtectedRoute>
            }
          />
          <Route
            path="observations/create/:childId"
            element={
              <ProtectedRoute requiredPermission={PERMISSIONS.OBSERVATIONS_CREATE}>
                <CreateObservation />
              </ProtectedRoute>
            }
          />
          <Route
            path="learning-journeys"
            element={
              <ProtectedRoute requiredPermission={PERMISSIONS.OBSERVATIONS_VIEW}>
                <LearningJourneys />
              </ProtectedRoute>
            }
          />
          <Route
            path="learning-journeys/:childId"
            element={
              <ProtectedRoute requiredPermission={PERMISSIONS.OBSERVATIONS_VIEW}>
                <LearningJourneyDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="assessments"
            element={
              <ProtectedRoute requiredPermission={PERMISSIONS.ASSESSMENTS_VIEW}>
                <Assessments />
              </ProtectedRoute>
            }
          />
          <Route
            path="planning"
            element={
              <ProtectedRoute requiredPermission={PERMISSIONS.PLANNING_VIEW}>
                <Planning />
              </ProtectedRoute>
            }
          />
          <Route
            path="milestones"
            element={
              <ProtectedRoute requiredPermission={PERMISSIONS.ASSESSMENTS_VIEW}>
                <Milestones />
              </ProtectedRoute>
            }
          />
          <Route
            path="class-management"
            element={
              <ProtectedRoute requiredPermission={PERMISSIONS.CHILDREN_VIEW}>
                <ClassManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="parent-communication"
            element={
              <ProtectedRoute requiredPermission={PERMISSIONS.COMMUNICATION_VIEW}>
                <ParentCommunication />
              </ProtectedRoute>
            }
          />
          <Route
            path="cohort-tracker"
            element={
              <ProtectedRoute requiredPermission={PERMISSIONS.REPORTS_VIEW}>
                <CohortTracker />
              </ProtectedRoute>
            }
          />
          <Route
            path="user-management"
            element={
              <ProtectedRoute requiredPermission={PERMISSIONS.USERS_VIEW}>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="reports"
            element={
              <ProtectedRoute requiredPermission={PERMISSIONS.REPORTS_VIEW}>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="get-started"
            element={
              <ProtectedRoute>
                <GetStarted />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute requiredPermission={PERMISSIONS.SETTINGS_VIEW}>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* Public routes */}
        <Route path="/parent-portal" element={<ParentPortal />} />
        <Route path="/parent-portal/:childId" element={<ParentPortal />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <QuestProvider
          apiKey={questConfig.APIKEY}
          entityId={questConfig.ENTITYID}
          apiType="PRODUCTION"
        >
          <Router>
            <div className="min-h-screen bg-gray-50">
              <AppContent />
            </div>
          </Router>
        </QuestProvider>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;