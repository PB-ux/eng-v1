import React from 'react';
import cn from 'classnames';

import { LEVEL_LANGUAGE } from '../constansts/LibraryConstants';

function LevelCard({ level, className }) {
    const levelClassName = cn('level', {
        'level_a1': level === LEVEL_LANGUAGE.A1,
        'level_a2': level === LEVEL_LANGUAGE.A2,
        'level_b1': level === LEVEL_LANGUAGE.B1,
        'level_b2': level === LEVEL_LANGUAGE.B2,
        'level_c1': level === LEVEL_LANGUAGE.C1,
    }, className);

    return <div className={levelClassName}>
        {level}
    </div>;
}

export default LevelCard;