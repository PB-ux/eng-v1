import React, {useState} from 'react';
import cn from 'classnames';

import {LEVEL_LANGUAGE} from '../../constansts/LibraryConstants';

import LevelCard from '../../UI/LevelCard.jsx';

import { AiFillHeart } from 'react-icons/Ai';
import {Link} from "react-router-dom";

function Card({ id, level, preview, title, author, tooltip }) {
    const levelClassName = cn('library__card-content', {
        'library__card_a1': level === LEVEL_LANGUAGE.A1,
        'library__card_a2': level === LEVEL_LANGUAGE.A2,
        'library__card_b1': level === LEVEL_LANGUAGE.B1,
        'library__card_b2': level === LEVEL_LANGUAGE.B2,
        'library__card_c1': level === LEVEL_LANGUAGE.C1,
    });
    const [isActive, setActive] = useState(false);

    return <div className="library__card">
        <div className={levelClassName}>
            <div className={cn("library__card-icon", {"library__card-icon_active": isActive})} onClick={() => setActive(!isActive) }><AiFillHeart /></div>
            <img className="library__card-preview" src={preview} alt={title} />
            <LevelCard level={level} />
        </div>
        <Link className="library__card-title" to={`book/${id}`}>{title}</Link>
        <div className="library__card-author">{author}</div>
    </div>
}
export default Card;