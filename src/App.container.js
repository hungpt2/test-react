import React from 'react';

import { App } from './App';
import { UserProvider } from './contexts/user';

import { i18n } from 'element-react';
import locale from 'element-react/src/locale/lang/en';
i18n.use(locale);

const AppContainer = () => {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
};

export default AppContainer;