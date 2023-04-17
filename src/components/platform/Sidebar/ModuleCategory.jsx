import React from 'react';
import cn from 'classnames';

import CategoryItem from './CategoryItem.jsx';

function ModuleCategory({ className }) {

    return <div className={cn('module-category', className)}>
        <div className="module-category__title">Категории</div>
        <CategoryItem title="Все книги" countBook={3000} />
        <CategoryItem title="Приключения" countBook={300} />
        <CategoryItem title="Фантастика" countBook={300} />
    </div>;
}

export default ModuleCategory;