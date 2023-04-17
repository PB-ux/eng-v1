import React from 'react';
import cn from 'classnames';

import { FcLike } from 'react-icons/Fc';

function Card({ level, preview, title, author, tooltip }) {

    return <div className="library__card">
        <div className={cn('library__card-content', {'library__card_a1': level === 'A1'})}>
            <div className="library__card-icon"><FcLike /></div>
            <img className="library__card-preview" src={preview} alt={title} />
            <div className="library__card-level">{level}</div>
        </div>
        <div className="library__card-title">{title}</div>
        <div className="library__card-author">{author}</div>
    </div>
}

export default Card;