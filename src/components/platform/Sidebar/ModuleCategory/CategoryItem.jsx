import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getBooks, getFavoriteBook, setBooks} from 'src/store/asyncActions/books';
import {useNavigate} from "react-router-dom";

function CategoryItem({ title, countBook }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user.user);

    const shortTitle = title.slice(0, 2);

    const handleClickCategory = () => {
        if (title === 'Понравившиеся книги') {
            const payload = { userId: user.id };

            dispatch(getFavoriteBook(payload));
        } else if (title === 'Все книги') {
            dispatch(getBooks());
        } else {
            const payload = { titleCategory: title };
            dispatch(setBooks(payload));
        }

        navigate('/library');
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