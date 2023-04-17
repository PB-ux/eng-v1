import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import Card from './Card.jsx';

import BookPreview from '../../../assets/book-preview.png';

function Library(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);

    return <div className={cn('library', { 'library_offset': activeModule === 'categoryBook' })}>
        <div className="library__genre">Жанр</div>
        <Card level="A1" preview={BookPreview} title="Lord of the Rings" author="JRR Tolkien" tooltip=""/>
    </div>
}

export default Library;