// Role definitions and permissions for EYFS Tracker

export const PERMISSIONS = {
  // Children management
  CHILDREN_VIEW: 'children:view',
  CHILDREN_CREATE: 'children:create',
  CHILDREN_EDIT: 'children:edit',
  CHILDREN_DELETE: 'children:delete',

  // Observations
  OBSERVATIONS_VIEW: 'observations:view',
  OBSERVATIONS_CREATE: 'observations:create',
  OBSERVATIONS_EDIT: 'observations:edit',
  OBSERVATIONS_DELETE: 'observations:delete',
  OBSERVATIONS_SHARE: 'observations:share',

  // Assessments
  ASSESSMENTS_VIEW: 'assessments:view',
  ASSESSMENTS_CREATE: 'assessments:create',
  ASSESSMENTS_EDIT: 'assessments:edit',
  ASSESSMENTS_DELETE: 'assessments:delete',

  // Reports
  REPORTS_VIEW: 'reports:view',
  REPORTS_GENERATE: 'reports:generate',
  REPORTS_EXPORT: 'reports:export',

  // Planning
  PLANNING_VIEW: 'planning:view',
  PLANNING_CREATE: 'planning:create',
  PLANNING_EDIT: 'planning:edit',
  PLANNING_DELETE: 'planning:delete',

  // User management
  USERS_VIEW: 'users:view',
  USERS_CREATE: 'users:create',
  USERS_EDIT: 'users:edit',
  USERS_DELETE: 'users:delete',
  USERS_MANAGE_ROLES: 'users:manage_roles',

  // Settings
  SETTINGS_VIEW: 'settings:view',
  SETTINGS_EDIT: 'settings:edit',
  SETTINGS_SYSTEM: 'settings:system',

  // Parent communication
  COMMUNICATION_VIEW: 'communication:view',
  COMMUNICATION_SEND: 'communication:send',

  // Data management
  DATA_EXPORT: 'data:export',
  DATA_IMPORT: 'data:import',
  DATA_BACKUP: 'data:backup',
};

export const ROLES = {
  PRACTITIONER: {
    id: 'practitioner',
    name: 'Early Years Practitioner',
    description: 'Front-line staff working directly with children',
    color: 'bg-blue-100 text-blue-800',
    permissions: [
      PERMISSIONS.CHILDREN_VIEW,
      PERMISSIONS.CHILDREN_CREATE,
      PERMISSIONS.CHILDREN_EDIT,
      PERMISSIONS.OBSERVATIONS_VIEW,
      PERMISSIONS.OBSERVATIONS_CREATE,
      PERMISSIONS.OBSERVATIONS_EDIT,
      PERMISSIONS.OBSERVATIONS_SHARE,
      PERMISSIONS.ASSESSMENTS_VIEW,
      PERMISSIONS.ASSESSMENTS_CREATE,
      PERMISSIONS.ASSESSMENTS_EDIT,
      PERMISSIONS.REPORTS_VIEW,
      PERMISSIONS.PLANNING_VIEW,
      PERMISSIONS.COMMUNICATION_VIEW,
      PERMISSIONS.COMMUNICATION_SEND,
      PERMISSIONS.SETTINGS_VIEW,
    ]
  },

  ROOM_LEADER: {
    id: 'room_leader',
    name: 'Room Leader',
    description: 'Senior practitioner responsible for a specific room/age group',
    color: 'bg-green-100 text-green-800',
    permissions: [
      PERMISSIONS.CHILDREN_VIEW,
      PERMISSIONS.CHILDREN_CREATE,
      PERMISSIONS.CHILDREN_EDIT,
      PERMISSIONS.CHILDREN_DELETE,
      PERMISSIONS.OBSERVATIONS_VIEW,
      PERMISSIONS.OBSERVATIONS_CREATE,
      PERMISSIONS.OBSERVATIONS_EDIT,
      PERMISSIONS.OBSERVATIONS_DELETE,
      PERMISSIONS.OBSERVATIONS_SHARE,
      PERMISSIONS.ASSESSMENTS_VIEW,
      PERMISSIONS.ASSESSMENTS_CREATE,
      PERMISSIONS.ASSESSMENTS_EDIT,
      PERMISSIONS.ASSESSMENTS_DELETE,
      PERMISSIONS.REPORTS_VIEW,
      PERMISSIONS.REPORTS_GENERATE,
      PERMISSIONS.PLANNING_VIEW,
      PERMISSIONS.PLANNING_CREATE,
      PERMISSIONS.PLANNING_EDIT,
      PERMISSIONS.COMMUNICATION_VIEW,
      PERMISSIONS.COMMUNICATION_SEND,
      PERMISSIONS.SETTINGS_VIEW,
      PERMISSIONS.SETTINGS_EDIT,
    ]
  },

  MANAGER: {
    id: 'manager',
    name: 'Nursery Manager',
    description: 'Senior management with oversight of operations',
    color: 'bg-purple-100 text-purple-800',
    permissions: [
      PERMISSIONS.CHILDREN_VIEW,
      PERMISSIONS.CHILDREN_CREATE,
      PERMISSIONS.CHILDREN_EDIT,
      PERMISSIONS.CHILDREN_DELETE,
      PERMISSIONS.OBSERVATIONS_VIEW,
      PERMISSIONS.OBSERVATIONS_CREATE,
      PERMISSIONS.OBSERVATIONS_EDIT,
      PERMISSIONS.OBSERVATIONS_DELETE,
      PERMISSIONS.OBSERVATIONS_SHARE,
      PERMISSIONS.ASSESSMENTS_VIEW,
      PERMISSIONS.ASSESSMENTS_CREATE,
      PERMISSIONS.ASSESSMENTS_EDIT,
      PERMISSIONS.ASSESSMENTS_DELETE,
      PERMISSIONS.REPORTS_VIEW,
      PERMISSIONS.REPORTS_GENERATE,
      PERMISSIONS.REPORTS_EXPORT,
      PERMISSIONS.PLANNING_VIEW,
      PERMISSIONS.PLANNING_CREATE,
      PERMISSIONS.PLANNING_EDIT,
      PERMISSIONS.PLANNING_DELETE,
      PERMISSIONS.USERS_VIEW,
      PERMISSIONS.USERS_CREATE,
      PERMISSIONS.USERS_EDIT,
      PERMISSIONS.COMMUNICATION_VIEW,
      PERMISSIONS.COMMUNICATION_SEND,
      PERMISSIONS.SETTINGS_VIEW,
      PERMISSIONS.SETTINGS_EDIT,
      PERMISSIONS.DATA_EXPORT,
      PERMISSIONS.DATA_IMPORT,
    ]
  },

  ADMINISTRATOR: {
    id: 'administrator',
    name: 'System Administrator',
    description: 'Full system access and user management',
    color: 'bg-red-100 text-red-800',
    permissions: Object.values(PERMISSIONS)
  },

  SENCO: {
    id: 'senco',
    name: 'SENCO',
    description: 'Special Educational Needs Coordinator',
    color: 'bg-orange-100 text-orange-800',
    permissions: [
      PERMISSIONS.CHILDREN_VIEW,
      PERMISSIONS.CHILDREN_EDIT,
      PERMISSIONS.OBSERVATIONS_VIEW,
      PERMISSIONS.OBSERVATIONS_CREATE,
      PERMISSIONS.OBSERVATIONS_EDIT,
      PERMISSIONS.OBSERVATIONS_SHARE,
      PERMISSIONS.ASSESSMENTS_VIEW,
      PERMISSIONS.ASSESSMENTS_CREATE,
      PERMISSIONS.ASSESSMENTS_EDIT,
      PERMISSIONS.REPORTS_VIEW,
      PERMISSIONS.REPORTS_GENERATE,
      PERMISSIONS.REPORTS_EXPORT,
      PERMISSIONS.PLANNING_VIEW,
      PERMISSIONS.PLANNING_CREATE,
      PERMISSIONS.PLANNING_EDIT,
      PERMISSIONS.COMMUNICATION_VIEW,
      PERMISSIONS.COMMUNICATION_SEND,
      PERMISSIONS.SETTINGS_VIEW,
    ]
  },

  DEPUTY_MANAGER: {
    id: 'deputy_manager',
    name: 'Deputy Manager',
    description: 'Senior leadership role with most management permissions',
    color: 'bg-indigo-100 text-indigo-800',
    permissions: [
      PERMISSIONS.CHILDREN_VIEW,
      PERMISSIONS.CHILDREN_CREATE,
      PERMISSIONS.CHILDREN_EDIT,
      PERMISSIONS.CHILDREN_DELETE,
      PERMISSIONS.OBSERVATIONS_VIEW,
      PERMISSIONS.OBSERVATIONS_CREATE,
      PERMISSIONS.OBSERVATIONS_EDIT,
      PERMISSIONS.OBSERVATIONS_DELETE,
      PERMISSIONS.OBSERVATIONS_SHARE,
      PERMISSIONS.ASSESSMENTS_VIEW,
      PERMISSIONS.ASSESSMENTS_CREATE,
      PERMISSIONS.ASSESSMENTS_EDIT,
      PERMISSIONS.ASSESSMENTS_DELETE,
      PERMISSIONS.REPORTS_VIEW,
      PERMISSIONS.REPORTS_GENERATE,
      PERMISSIONS.REPORTS_EXPORT,
      PERMISSIONS.PLANNING_VIEW,
      PERMISSIONS.PLANNING_CREATE,
      PERMISSIONS.PLANNING_EDIT,
      PERMISSIONS.PLANNING_DELETE,
      PERMISSIONS.USERS_VIEW,
      PERMISSIONS.USERS_EDIT,
      PERMISSIONS.COMMUNICATION_VIEW,
      PERMISSIONS.COMMUNICATION_SEND,
      PERMISSIONS.SETTINGS_VIEW,
      PERMISSIONS.SETTINGS_EDIT,
      PERMISSIONS.DATA_EXPORT,
    ]
  },
};

export const getRoleById = (roleId) => {
  return Object.values(ROLES).find(role => role.id === roleId);
};

export const hasPermission = (userRole, permission) => {
  const role = getRoleById(userRole);
  return role ? role.permissions.includes(permission) : false;
};

export const hasAnyPermission = (userRole, permissions) => {
  return permissions.some(permission => hasPermission(userRole, permission));
};

export const hasAllPermissions = (userRole, permissions) => {
  return permissions.every(permission => hasPermission(userRole, permission));
};

export const getUserPermissions = (userRole) => {
  const role = getRoleById(userRole);
  return role ? role.permissions : [];
};

export const canAccessRoute = (userRole, routePermissions) => {
  if (!routePermissions || routePermissions.length === 0) return true;
  return hasAnyPermission(userRole, routePermissions);
};