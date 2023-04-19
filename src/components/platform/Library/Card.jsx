import React from 'react';
import cn from 'classnames';

import LevelCard from '../../UI/LevelCard.jsx';

import { FcLike } from 'react-icons/Fc';
import {LEVEL_LANGUAGE} from "../../constansts/LibraryConstants";

function Card({ level, preview, title, author, tooltip }) {
    const levelClassName = cn('library__card-content', {
        'library__card_a1': level === LEVEL_LANGUAGE.A1,
        'library__card_a2': level === LEVEL_LANGUAGE.A2,
        'library__card_b1': level === LEVEL_LANGUAGE.B1,
        'library__card_b2': level === LEVEL_LANGUAGE.B2,
        'library__card_c1': level === LEVEL_LANGUAGE.C1,
    });

    return <div className="library__card">
        <div className={levelClassName}>
            <div className="library__card-icon"><FcLike /></div>
            <img className="library__card-preview" src={preview} alt={title} />
            <LevelCard level={level} />
        </div>
        <div className="library__card-title">{title}</div>
        <div className="library__card-author">{author}</div>
    </div>
}

export default Card;