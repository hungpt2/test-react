import React, { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import mockUserData from './mocks/user';
import './App.scss';

const App404Page = lazy(() => import('./pages/404/404'));
const DashboardPage = lazy(() => import('./pages/dashboard/Dashboard'));

export const App = () => {
  const userData = localStorage.getItem('userData');
  if (!userData) {
    localStorage.setItem('userData', JSON.stringify(mockUserData));
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Navigate to='/dashboard' />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/404-page' element={<App404Page />} />
      </Routes>
    </BrowserRouter>
  );
}
