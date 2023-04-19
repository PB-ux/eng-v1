import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import Card from './Card.jsx';

import BookPreview from '../../../assets/book-preview.png';

const data = [
    {
        level: 'A1',
        preview: BookPreview,
        title: 'Lord of the Rings',
        author: 'JRR Tolkien',
    },
    {
        level: 'A2',
        preview: BookPreview,
        title: 'Lord of the Rings',
        author: 'JRR Tolkien',
    },
    {
        level: 'B1',
        preview: BookPreview,
        title: 'Lord of the Rings',
        author: 'JRR Tolkien',
    },
    {
        level: 'B2',
        preview: BookPreview,
        title: 'Lord of the Rings',
        author: 'JRR Tolkien',
    },
    {
        level: 'C1',
        preview: BookPreview,
        title: 'Lord of the Rings',
        author: 'JRR Tolkien',
    },
    {
        level: 'A1',
        preview: BookPreview,
        title: 'Lord of the Rings',
        author: 'JRR Tolkien',
    },
    {
        level: 'A1',
        preview: BookPreview,
        title: 'Lord of the Rings',
        author: 'JRR Tolkien',
    },
    {
        level: 'A1',
        preview: BookPreview,
        title: 'Lord of the Rings',
        author: 'JRR Tolkien',
    },
    {
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
            { data.map((book) => <Card level={book.level} preview={book.preview} title={book.title} author={book.author} />) }
        </div>
    </div>
}

export default Library;