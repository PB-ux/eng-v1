import React from 'react';
import cn from 'classnames';

import { LEVEL_LANGUAGE } from '../constansts/LibraryConstants';

function LevelCard({ level }) {
    const levelClassName = cn('library__card-level', {
        'library__card-level_a1': level === LEVEL_LANGUAGE.A1,
        'library__card-level_a2': level === LEVEL_LANGUAGE.A2,
        'library__card-level_b1': level === LEVEL_LANGUAGE.B1,
        'library__card-level_b2': level === LEVEL_LANGUAGE.B2,
        'library__card-level_c1': level === LEVEL_LANGUAGE.C1,
    });

    return <div className={levelClassName}>
        {level}
    </div>;
}

export default LevelCard;