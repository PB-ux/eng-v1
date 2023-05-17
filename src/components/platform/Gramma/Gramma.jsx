import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant.js';

import GrammaItem from 'src/components/platform/Gramma/GrammaItem.jsx';

function Gramma({}) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);

    return <div className={cn('gramma pages', { 'pages_offset': activeModule === ACTIVE_MODULE.gramma })}>
        <h4 className="gramma__title">Уроки по грамматике</h4>
        <GrammaItem title="Adjectives (Прилагательные в английском языке)" date="12 Мая 2023" level="A1" description="Прилагательное (Adjective) – это самостоятельная часть речи, которая указывает на признак лица, предмета или понятия и отвечает на вопрос «какой?». В английском языке они не имеют категории рода и числа, поэтому не меняют своей формы." />
        <GrammaItem title="Adverbs (Наречия в английском языке)" date="12 Мая 2023" level="A1" description="Наречие (Adverb) – это самостоятельная часть речи, которая указывает на определенный признак действия, признак другого признака или обстоятельство, при котором выполняется действие." />
        <GrammaItem title="Article (Артикль в английском языке)" date="12 Мая 2023" level="A1" description="Артикли – это особые частицы, которые используются с существительными и помогают отличать их от глаголов, прилагательных и других частей речи." />
    </div>;
}

export default Gramma;