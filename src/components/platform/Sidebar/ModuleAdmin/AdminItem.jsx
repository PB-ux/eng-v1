import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminItem({ to, title }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/admin/books');
    }

    return <div className="module__item">
        <div className="module__item-container">
            <div onClick={handleNavigate} className="module__item-title">{title}</div>
        </div>
    </div>;
}

export default AdminItem;