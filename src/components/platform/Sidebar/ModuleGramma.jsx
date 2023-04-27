import React from 'react';
import cn from 'classnames';

import GrammaItem from './GrammaItem.jsx';

function ModuleGramma({ className }) {
    return <div className={cn('module', className)}>
        <div className="module__title">Грамматика</div>
        <GrammaItem level="A1" title="Начальный уровень" />
        <GrammaItem level="A1" title="Элементарный уровень" />
        <GrammaItem level="A2" title="Слабый средний уровень" />
        <GrammaItem level="B1" title="Средний уровень" />
        <GrammaItem level="B2" title="Выше среднего уровень" />
        <GrammaItem level="C1" title="Продвинутый уровень" />
    </div>;
}

export default ModuleGramma;