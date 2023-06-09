import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant.js';

import { present } from 'src/lib/RamdaHelpers.js';

import BookRepository from 'src/repositories/BookRepository.js';
import LevelBook from 'src/components/UI/LevelBook.jsx';
import Spinner from 'src/components/UI/Spinner.jsx';

import EmptyCover from 'src/assets/empty-cover.jpg';

function AdminBook(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const params = useParams();
    const { id } = params;

    const [book, setBook] = useState({});
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            BookRepository.getBook(id)
                .then((response) => {
                    const { book } = response;
                    setBook(book);
                    setLoading(false);
                }).catch((e) => console.log(e));
        }, 1000);
    }, []);

    if (isLoading) return <Spinner isLoading={isLoading} />

    return <div className={cn('page-book pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
        <div className="page-book__cover">
            <img src={ book.cover ? `http://localhost:5000/${book.cover}` : EmptyCover } alt="book cover" className="page-book__cover-img"/>
        </div>
        <div className="page-book__content">
            { present(book) ? <LevelBook level={book.level.title}></LevelBook> : null }
            <div className="page-book__name">
                <h2>{book.title}</h2>
            </div>
            <div className="page-book__description">
                {book.description}
            </div>
            { present(book.categories)
                ? <div className="page-book__categories">
                    Жанры: {book.categories.map((category) => category.title).join(',')}
                </div>
                : null
            }
            { present(book.authors)
                ? <div className="page-book__authors">
                    Авторы: {book.authors.map((author) => author.fullName).join(',')}
                </div>
                : null
            }
        </div>
    </div>
}

export default AdminBook;