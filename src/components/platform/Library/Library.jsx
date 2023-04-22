import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import CardBook from './CardBook.jsx';

import BookPreview from '../../../assets/book-preview.png';

const data = [
    {
        id: 1,
        level: 'A1',
        preview: BookPreview,
        title: 'Lord of the Rings',
        author: 'JRR Tolkien',
    },
    {
        id: 2,
        level: 'A2',
        preview: BookPreview,
        title: 'Lord of the Rings',
        author: 'JRR Tolkien',
    },
    {
        id: 3,
        level: 'B1',
        preview: BookPreview,
        title: 'Lord of the Rings',
        author: 'JRR Tolkien',
    },
    {
        id: 4,
        level: 'B2',
        preview: BookPreview,
        title: 'Lord of the Rings',
        author: 'JRR Tolkien',
    },
    {
        id: 5,
        level: 'C1',
        preview: BookPreview,
        title: 'Lord of the Rings',
        author: 'JRR Tolkien',
    },
    {
        id: 6,
        level: 'A1',
        preview: BookPreview,
        title: 'Lord of the Rings',
        author: 'JRR Tolkien',
    },
    {
        id: 7,
        level: 'A1',
        preview: BookPreview,
        title: 'Lord of the Rings',
        author: 'JRR Tolkien',
    },
    {
        id: 8,
        level: 'A1',
        preview: BookPreview,
        title: 'Lord of the Rings',
        author: 'JRR Tolkien',
    },
    {
        id: 9,
        level: 'A1',
        preview: BookPreview,
        title: 'Lord of the Rings',
        author: 'JRR Tolkien',
    }
]

function Library(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const user = useSelector((state) => state.user.user);

    return <div className={cn('library', { 'library_offset': activeModule === 'categoryBook' })}>
        <div className="library__genre">Жанр</div>
        <div className="library__container">
            { data.map((book) => <CardBook key={book.id} id={book.id} level={book.level} preview={book.preview} title={book.title} author={book.author} />) }
        </div>
    </div>
}

export default Library;