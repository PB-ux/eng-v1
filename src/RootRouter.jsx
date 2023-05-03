import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { publicRouters } from './router';

import Auth from './components/Auth.jsx';
import Dashboard from './components/platform/Dashboard.jsx';
import Admin from './components/platform/Admin/Admin.jsx';
import AdminBooks from './components/platform/Admin/AdminBooks.jsx';
import AdminBook from './components/platform/Admin/AdminBook.jsx';
import EditBook from './components/platform/Admin/EditBook.jsx';
import CreateAdminBook from './components/platform/Admin/CreateAdminBook.jsx';
import AdminGenries from "src/components/platform/Admin/AdminGenries.jsx";
import CreateAdminGenre from "src/components/platform/Admin/CreateAdminGenre.jsx";
import EditGenre from "src/components/platform/Admin/EditGenre.jsx";
import AdminAuthors from "src/components/platform/Admin/AdminAuthors.jsx";
import CreateAdminAuthor from "src/components/platform/Admin/CreateAdminAuthor.jsx";
import EditAuthor from "src/components/platform/Admin/EditAuthor.jsx";

function RootRouter() {
  const user = useSelector((state) => state.user.user);
  const isAuth = user.isAuth;

  return <div className="d-flex">
    { isAuth ? <Dashboard /> : null }
    <Routes>
      { publicRouters.map(({ path, element }) => <Route key={path} path={path} element={element} exact />) }
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/book/show" element={<AdminBooks />} />
      <Route path="/admin/book/create" element={<CreateAdminBook />} />
      <Route path="/admin/book/:id" element={<AdminBook />} />
      <Route path="/admin/book/update/:id" element={<EditBook />} />
      <Route path="/admin/genre/show" element={<AdminGenries />} />
      <Route path="/admin/genre/create" element={<CreateAdminGenre />} />
      <Route path="/admin/genre/update/:id" element={<EditGenre />} />
      <Route path="/admin/author/show" element={<AdminAuthors />} />
      <Route path="/admin/author/update/:id" element={<EditAuthor />} />
      <Route path="/admin/author/create" element={<CreateAdminAuthor />} />
      { !isAuth ? <Route path="/login"  element={<Auth />} exact /> : null }
      { !isAuth ? <Route path="/registration" element={<Auth />} exact /> : null }

      {/*<Route path="*" element={<NotFoundPage />} />*/}
    </Routes>
</div>
}

export default RootRouter;
