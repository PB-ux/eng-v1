import React from 'react';
import  { useDispatch } from 'react-redux';
import { setBooks } from '../../../store/asyncActions/books';

function CategoryItem({ title, countBook }) {
    const dispatch = useDispatch();

    const shortTitle = title.slice(0, 2);

    const handleClickCategory = () => {
        const payload = { titleCategory: title };
        dispatch(setBooks(payload));
    };

    return <div className="module-category__item" onClick={handleClickCategory}>
        <div className="module-category__item-container">
            <div className="module-category__item-thumbnail">{shortTitle}</div>
            <div className="module-category__item-title">{title}</div>
        </div>
        <div className="module-category__item-count">{countBook}</div>
    </div>;
}

export default CategoryItem;