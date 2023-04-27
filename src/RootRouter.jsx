import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { publicRouters } from './router';

import Auth from './components/Auth.jsx';
import Dashboard from './components/platform/Dashboard.jsx';
import Admin from './components/platform/Admin/Admin.jsx';
import AdminBook from './components/platform/Admin/AdminBook.jsx';

function RootRouter() {
  const user = useSelector((state) => state.user.user);
  const isAuth = user.isAuth;

  return <div className="d-flex">
    { isAuth ? <Dashboard /> : null }
    <Routes>
      { publicRouters.map(({ path, element }) => <Route key={path} path={path} element={element} exact />) }
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/books" element={<AdminBook />} />
      { !isAuth ? <Route path="/login"  element={<Auth />} exact /> : null }
      { !isAuth ? <Route path="/registration" element={<Auth />} exact /> : null }

      {/*<Route path="*" element={<NotFoundPage />} />*/}
    </Routes>
</div>
}

export default RootRouter;
