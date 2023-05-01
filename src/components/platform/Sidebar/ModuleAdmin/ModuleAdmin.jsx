import React from 'react';
import cn from 'classnames';

import AdminItem from './AdminItem.jsx';

function ModuleAdmin({ className }) {
    return <div className={cn('module', className)}>
        <div className="module__title">Админ</div>
        <AdminItem link="/admin/book/show" title="Книги" />
        <AdminItem link="/admin/book/create" title="Добавить книгу" />
    </div>
}

export default ModuleAdmin;