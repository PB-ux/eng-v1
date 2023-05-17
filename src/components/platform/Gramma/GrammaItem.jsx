import React from 'react';
import { useNavigate } from 'react-router-dom';

function GrammaItem({ title, date, level, description }) {
    const navigate = useNavigate();

    const handleClickItem = (e) => {
        e.preventDefault();

        navigate(`/gramma/item/${1}`);
    }

    return <div className="gramma-post">
        <a className="gramma-post__title" onClick={handleClickItem}>{title}</a>
        <div className="gramma-post__info">
            <div className="gramma-post__date">{date}</div>
            <div className="gramma-post__divider"></div>
            <div className="gramma-post__level">{level}</div>
        </div>
        <div className="gramma-post__description">{description}</div>
    </div>
}

export default GrammaItem;