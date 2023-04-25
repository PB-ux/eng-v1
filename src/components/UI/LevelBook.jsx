import React from 'react';

function LevelBook(props) {
    return <div className="page-book__level">
        <p>Начальный уровень ({props.level})</p>
    </div>
}

export default LevelBook;