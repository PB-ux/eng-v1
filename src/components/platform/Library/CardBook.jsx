import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { LEVEL_LANGUAGE } from '../../constansts/LibraryConstants';
import { changeActiveModuleAction } from '../../../store/actionCreators/changeActiveModuleAction';

import LevelCard from '../../UI/LevelCard.jsx';
import Tooltip from '../../UI/Tooltip.jsx';

import { AiFillHeart } from 'react-icons/Ai';
import { HiLockClosed } from 'react-icons/Hi';

function Card({ id, level, cover, title, authors, tooltip }) {
    const dispatch = useDispatch();
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const user = useSelector((state) => state.user.user);

    const [isActive, setActive] = useState(false);

    const shortTitle = title.length > 25 ? `${title.slice(0, 22)}...` : title;
    const levelClassName = cn('library__card-content', {
        'library__card_a1': level === LEVEL_LANGUAGE.A1,
        'library__card_a2': level === LEVEL_LANGUAGE.A2,
        'library__card_b1': level === LEVEL_LANGUAGE.B1,
        'library__card_b2': level === LEVEL_LANGUAGE.B2,
        'library__card_c1': level === LEVEL_LANGUAGE.C1,
    });


    const handleClickTitle = () => {
        dispatch(changeActiveModuleAction(''));
    }

    const renderOverlay = () => {
        return <div>
            Это книга доступна с уровня {level}
        </div>
    }
    return <div className="library__card">
        <div className={levelClassName}>
            <div className={cn("library__card-icon", {"library__card-icon_active": isActive})} onClick={() => setActive(!isActive) }><AiFillHeart /></div>
            <div className="library__card-container">
                <img className="library__card-cover" src={`http://localhost:5000/${cover}`} alt={title} />
            </div>
            <LevelCard level={level} className="library__card-level"/>
            { user.level !== level
                ? <Tooltip overlay={renderOverlay}>
                    <div className="library__card-icon_lock"><HiLockClosed /></div>
                </Tooltip>
                : null
            }
        </div>
        <Link onClick={handleClickTitle} className={cn('library__card-title', { 'library__card-title_disabled': user.level !== level})} to={`/library/${id}`}>{shortTitle}</Link>
        <div className="library__card-author">{authors.map((author) => author.fullName)}</div>
    </div>
}
export default Card;