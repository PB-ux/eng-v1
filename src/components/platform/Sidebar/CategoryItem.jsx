import React from 'react';

function CategoryItem({ title, countBook }) {
    const shortTitle = title.slice(0, 2);

    return <div className="module-category__item">
        <div className="module-category__item-container">
            <div className="module-category__item-thumbnail">{shortTitle}</div>
            <div className="module-category__item-title">{title}</div>
        </div>
        <div className="module-category__item-count">{countBook}</div>
    </div>;
}

export default CategoryItem;