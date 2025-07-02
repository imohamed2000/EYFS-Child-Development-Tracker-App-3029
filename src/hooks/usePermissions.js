import { useApp } from '../context/AppContext';
import { hasPermission, hasAnyPermission, hasAllPermissions, getUserPermissions } from '../data/roles';

export const usePermissions = () => {
  const { currentUser } = useApp();
  
  const checkPermission = (permission) => {
    return hasPermission(currentUser.role, permission);
  };
  
  const checkAnyPermission = (permissions) => {
    return hasAnyPermission(currentUser.role, permissions);
  };
  
  const checkAllPermissions = (permissions) => {
    return hasAllPermissions(currentUser.role, permissions);
  };
  
  const getPermissions = () => {
    return getUserPermissions(currentUser.role);
  };
  
  return {
    hasPermission: checkPermission,
    hasAnyPermission: checkAnyPermission,
    hasAllPermissions: checkAllPermissions,
    getPermissions,
    currentRole: currentUser.role,
  };
};