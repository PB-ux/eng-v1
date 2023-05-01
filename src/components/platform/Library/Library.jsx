import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant.js';

import { getBooks } from 'src/store/asyncActions/books';

import CardBook from './CardBook.jsx';

import Spinner from 'src/components/UI/Spinner.jsx';

function Library(props) {
    const dispatch = useDispatch();
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const books = useSelector((state) => state.books.books);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            dispatch(getBooks())
            setLoading(false);
        }, 1000);
    }, []);

    if (isLoading) return <Spinner isLoading={isLoading} />

    return <div className={cn('library pages', { 'pages_offset': activeModule === ACTIVE_MODULE.categoryBooks })}>
        <div className="library__genre">Книги</div>
        <div className="library__container">
            { books.map((book) => <CardBook key={book.id} id={book.id} level={book.level} cover={book.cover} title={book.title} authors={book.authors} />) }
        </div>
    </div>
}

export default Library;