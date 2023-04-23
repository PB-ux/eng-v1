import React from 'react';

function GrammaPageItem(props) {
    return <div className="gramma-page__item">
        <div className="gramma-page__item-name">name</div>
        <div className="gramma-page__item-description">
            <p>Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “It's not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.” </p>
        </div>
        <div className="gramma-page__item-link">
            <a href="#" className="">Перейти</a>
        </div>
    </div>
}

export default GrammaPageItem;