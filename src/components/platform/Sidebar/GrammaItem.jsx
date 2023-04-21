import React from 'react';

function GrammaItem({ level, title }) {

    return <div className="module-gramma__item">
        <div className="module-gramma__item-container">
            <div className="module-gramma__item-thumbnail">{level}</div>
            <div className="module-gramma__item-title">{title}</div>
        </div>
    </div>;
}

export default GrammaItem;