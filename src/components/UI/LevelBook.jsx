import React from 'react';
import cn from 'classnames';

import { LEVEL_LANGUAGE } from '../constansts/LibraryConstants';

function LevelBook({ level }) {
    const levels = {
        A1: `Элементарный уровень (${level})`,
        A2: `Слабый средний уровень (${level})`,
        B1: `Средний уровень (${level})`,
        B2: `Выше среднего уровень (${level})`,
        C1: `Продвинутый уровень (${level})`,
    }
    const levelClassName = cn('library__card-level_page', {
        'library__card-level_a1': level === LEVEL_LANGUAGE.A1,
        'library__card-level_a2': level === LEVEL_LANGUAGE.A2,
        'library__card-level_b1': level === LEVEL_LANGUAGE.B1,
        'library__card-level_b2': level === LEVEL_LANGUAGE.B2,
        'library__card-level_c1': level === LEVEL_LANGUAGE.C1,
    });

    return <div className={levelClassName}>
        { levels[level] }
    </div>
}

export default LevelBook;