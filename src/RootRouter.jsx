import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import { publicRouters } from './router';

import Auth from './components/Auth.jsx';
import Dashboard from './components/platform/Dashboard.jsx';

function RootRouter() {
  const isAuth = true;

  return <div className="d-flex">
    { isAuth ? <Dashboard /> : null }
    <Routes>
      { publicRouters.map(({ path, element }) => <Route key={path} path={path} element={ isAuth ? element : <Navigate to="/login" /> } exact />) }
      <Route path="/login"  element={<Auth />} exact />
      <Route path="/registration" element={<Auth />} exact />

      {/*<Route path="*" element={<NotFoundPage />} />*/}
    </Routes>
</div>
}

export default RootRouter;
