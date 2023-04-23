import React from 'react';

import GrammaPageItem from './GrammaPageItem.jsx';


function GrammaPage(props) {
    return <div className="gramma-page">
        <div className="gramma-page__title">
            <p>{props.title}</p>
        </div>
        <GrammaPageItem></GrammaPageItem>
        <GrammaPageItem></GrammaPageItem>
        <GrammaPageItem></GrammaPageItem>
    </div>
}

export default GrammaPage;