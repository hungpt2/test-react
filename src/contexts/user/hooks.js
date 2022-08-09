import { useContext } from 'react';

import { UserContext } from './UserContext';

export const useUserContext = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return userContext;
};

export const useUserState = () => useUserContext().state;

export const useUserDispatch = () => useUserContext().dispatch;
