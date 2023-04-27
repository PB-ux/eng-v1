import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { ACTIVE_MODULE } from '../../constansts/activeModuleConstant.js';

import { getBooks } from '../../../store/asyncActions/books';

import CardBook from './CardBook.jsx';

function Library(props) {
    const dispatch = useDispatch();
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const books = useSelector((state) => state.books.books);

    useEffect(() => {
       dispatch(getBooks())
    }, []);

    return <div className={cn('library', { 'library_offset': activeModule === ACTIVE_MODULE.categoryBooks })}>
        <div className="library__genre">Категории</div>
        <div className="library__container">
            { books.map((book) => <CardBook key={book.id} id={book.id} level={book.level} cover={book.cover} title={book.title} authors={book.authors} />) }
        </div>
    </div>
}

export default Library;