import React from 'react';
import cn from 'classnames';

import AdminItem from './AdminItem.jsx';

function ModuleAdmin({ className }) {
    return <div className={cn('module', className)}>
        <div className="module__title">Админ</div>
        <AdminItem link="/admin/book/show" title="Книги" />
        <AdminItem link="/admin/book/create" title="Добавить книгу" />
        <AdminItem link="/admin/genre/show" title="Жанры" />
        <AdminItem link="/admin/genre/create" title="Добавить жанр" />
        <AdminItem link="/admin/author/show" title="Авторы" />
        <AdminItem link="/admin/theory" title="Теория по грамматике" />
        <AdminItem link="/admin/theory/create" title="Создать теорию по грамматике" />
        <AdminItem link="/admin/exercise" title="Упражнения к грамматике" />
        <AdminItem link="/admin/exercise/create" title="Создать упражнения к грамматике" />
    </div>
}

export default ModuleAdmin;