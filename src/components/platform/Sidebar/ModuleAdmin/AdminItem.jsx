import React from 'react';

function AdminItem({ title }) {
    return <div className="module__item">
        <div className="module__item-container">
            <div className="module__item-title">{title}</div>
        </div>
    </div>;
}

export default AdminItem;