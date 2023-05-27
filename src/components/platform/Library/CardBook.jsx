import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import cn from 'classnames';

import { LEVEL_LANGUAGE } from 'src/components/constansts/LibraryConstants.js';

import { changeActiveModuleAction } from 'src/store/actionCreators/changeActiveModuleAction.js';

import { present } from 'src/lib/RamdaHelpers.js';

import BookRepository from "src/repositories/BookRepository";

import LevelCard from 'src/components/UI/LevelCard.jsx';
import Tooltip from 'src/components/UI/Tooltip.jsx';

import { AiFillHeart } from 'react-icons/Ai';
import { HiLockClosed } from 'react-icons/Hi';
import { BsFillCheckCircleFill } from 'react-icons/Bs';
import { MdDeleteOutline } from 'react-icons/Md';
import {deleteFavoriteBook, setFavoriteBook} from "src/store/asyncActions/books";
import LevelRepository from "src/repositories/LevelRepository";


function Card({ id, level, cover, title, authors, favoriteBooks, currentBooks }) {
    const dispatch = useDispatch();
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const user = useSelector((state) => state.user.user);

    const [isActive, setActive] = useState(false);
    const [levels, setLevels] = useState([]);

    const availableLevels = levels.filter((item) => user.level >= item.title).map((item) => item.title);
    const shortTitle = title.length > 25 ? `${title.slice(0, 22)}...` : title;
    const levelClassName = cn('library__card-content', {
        'library__card_a1': level === LEVEL_LANGUAGE.A1,
        'library__card_a2': level === LEVEL_LANGUAGE.A2,
        'library__card_b1': level === LEVEL_LANGUAGE.B1,
        'library__card_b2': level === LEVEL_LANGUAGE.B2,
        'library__card_c1': level === LEVEL_LANGUAGE.C1,
    });

    useEffect(() => {
        LevelRepository.getLevels()
            .then(({ levels }) => {
                setLevels(levels);
            }).catch((e) => console.log(e));
    }, []);

    const handleAddFavoriteBook = () => {
        if (!isActive) {
            const params = { userId: user.id, bookId: id};

            setActive(true);

            dispatch(setFavoriteBook(params));
        }
    }

    const handleDeleteFavoriteBook = () => {
        const params = { userId: user.id, bookId: id };

        setActive(false);

        dispatch(deleteFavoriteBook(params));
    }

    const handleClickTitle = () => {
        dispatch(changeActiveModuleAction(''));
    }

    const renderOverlay = () => {
        return <div>
            Это книга доступна с уровня {level}
        </div>
    }

    const renderOverlayCompleted = () => {
        return <div>
            Вы прочли эту книгу
        </div>
    }

    const renderOverlayFavoriteBook = () => {
        return <div>
            Удалить из понравившихся
        </div>
    }

    const renderFavoriteBookTooltip = () => {
        return <Tooltip overlay={renderOverlayFavoriteBook}>
            <div className="library__card-icon" onClick={handleDeleteFavoriteBook}><MdDeleteOutline /></div>
        </Tooltip>
    }

    const renderCompletedBook = () => {
        const filterBooks = currentBooks.filter((item) => item.id == id && item.current_books.status === 'completed');
        console.log(filterBooks);
        return  <>
            { filterBooks.length > 0
                ? <Tooltip overlay={renderOverlayCompleted}>
                    <div className="library__card-icon_lock"><BsFillCheckCircleFill /></div>
                </Tooltip>
                : null
            }
        </>
    }

    const renderLock = () => {
        return <>
            { !availableLevels.includes(level)
                ? <Tooltip overlay={renderOverlay}>
                    <div className="library__card-icon_lock"><HiLockClosed /></div>
                </Tooltip>
                : null
            }
        </>
    }

    return <div className="library__card">
        <div className={levelClassName}>
            { present(favoriteBooks) ? renderFavoriteBookTooltip() : <div className={cn("library__card-icon", {"library__card-icon_active": isActive})} onClick={handleAddFavoriteBook}><AiFillHeart /></div> }
            <div className="library__card-container">
                <img className="library__card-cover" src={`http://localhost:5000/${cover}`} alt={title} />
            </div>
            <LevelCard level={level} className="library__card-level"/>
            { !availableLevels.includes(level) ? renderLock() : renderCompletedBook() }
        </div>
        <Link onClick={handleClickTitle} className={cn('library__card-title', { 'library__card-title_disabled': !availableLevels.includes(level)})} to={`/library/${id}`}>{shortTitle}</Link>
        <div className="library__card-author">{authors.map((author) => author.fullName)}</div>
    </div>
}
export default Card;