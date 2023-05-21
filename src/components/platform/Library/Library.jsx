import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import cn from 'classnames';

import { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant.js';

import { present } from 'src/lib/RamdaHelpers.js';

import { getBooks } from 'src/store/asyncActions/books';

import EmptyBook from 'src/components/UI/EmptyBook.jsx';
import CardBook from './CardBook.jsx';

import Spinner from 'src/components/UI/Spinner.jsx';
import BookRepository from "src/repositories/BookRepository";

function Library(props) {
    const dispatch = useDispatch();
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const books = useSelector((state) => state.books.books);
    const user = useSelector((state) => state.user.user, shallowEqual);
    const [isLoading, setLoading] = useState(false);
    const [currentBooks, setCurrentBooks] = useState([]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            dispatch(getBooks())
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        const params = { userId: user.id };

        if (present(user)) {
            BookRepository.getCurrentBooks(params)
                .then((response) => {
                    const { booksCurrent } = response.user;
                    setCurrentBooks(booksCurrent);
                }).catch((e) => console.log(e));
        }
    }, [user])

    if (isLoading) return <Spinner isLoading={isLoading} />

    return <div className={cn('library pages', { 'pages_offset': activeModule === ACTIVE_MODULE.categoryBooks })}>
        <div className="library__genre">Жанры</div>
        <div className="library__container">
            { present(books) ? books.map((book) => <CardBook key={book.id} id={book.id} level={book.level.title} cover={book.cover} title={book.title} authors={book.authors} currentBooks={currentBooks} favoriteBooks={book.favorite_books} />) : <EmptyBook /> }
        </div>
    </div>
}

export default Library;