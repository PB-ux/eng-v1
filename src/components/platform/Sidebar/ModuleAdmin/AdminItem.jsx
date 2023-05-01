import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminItem({ link, title }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(link);
    }

    return <div className="module__item">
        <div className="module__item-container">
            <div onClick={handleNavigate} className="module__item-title">{title}</div>
        </div>
    </div>;
}

export default AdminItem;