import React from 'react';
import  { useDispatch } from 'react-redux';

import { setBooks } from 'src/store/asyncActions/books';

function CategoryItem({ title, countBook }) {
    const dispatch = useDispatch();

    const shortTitle = title.slice(0, 2);

    const handleClickCategory = () => {
        const payload = { titleCategory: title };
        dispatch(setBooks(payload));
    };

    return <div className="module__item" onClick={handleClickCategory}>
        <div className="module__item-container">
            <div className="module__item-thumbnail">{shortTitle}</div>
            <div className="module__item-title">{title}</div>
        </div>
        <div className="module__item-count">{countBook}</div>
    </div>;
}

export default CategoryItem;