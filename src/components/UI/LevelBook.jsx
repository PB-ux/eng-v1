import React from 'react';
import cn from 'classnames';

import { LEVEL_LANGUAGE } from '../constansts/LibraryConstants';

function LevelBook({ level, className }) {
    const levels = {
        A1: `Элементарный уровень (${level})`,
        A2: `Слабый средний уровень (${level})`,
        B1: `Средний уровень (${level})`,
        B2: `Выше среднего уровень (${level})`,
        C1: `Продвинутый уровень (${level})`,
    }
    const levelClassName = cn('level_page', {
        'level_a1': level === LEVEL_LANGUAGE.A1,
        'level_a2': level === LEVEL_LANGUAGE.A2,
        'level_b1': level === LEVEL_LANGUAGE.B1,
        'level_b2': level === LEVEL_LANGUAGE.B2,
        'level_c1': level === LEVEL_LANGUAGE.C1,
    }, className);

    return <div className={levelClassName}>
        { levels[level] }
    </div>
}

export default LevelBook;