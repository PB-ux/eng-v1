import React from 'react';
// import cn from 'classnames';

// import {LEVEL_LANGUAGE} from '../../constansts/LibraryConstants';

function GrammaItem({ level, title }) {
    // const levelClassName = cn('module__item-thumbnail', {
    //     'module-gramma__item-thumbnail_a1': level === LEVEL_LANGUAGE.A1,
    //     'module-gramma__item-thumbnail_a2': level === LEVEL_LANGUAGE.A2,
    //     'module-gramma__item-thumbnail_b1': level === LEVEL_LANGUAGE.B1,
    //     'module-gramma__item-thumbnail_b2': level === LEVEL_LANGUAGE.B2,
    //     'module-gramma__item-thumbnail_c1': level === LEVEL_LANGUAGE.C1,
    // });

    return <div className="module__item">
        <div className="module__item-container">
            <div className="module__item-thumbnail">{level}</div>
            <div className="module__item-title">{title}</div>
        </div>
    </div>;
}

export default GrammaItem;