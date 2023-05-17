import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant.js';

import LevelBook from "src/components/UI/LevelBook.jsx";

function AdminTheory(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const params = useParams();
    const { id } = params;

    const data = {
        id: 1,
        title: 'Adjectives (Прилагательные в английском языке)',
        level: {id: 1, title: 'A1'},
        description: 'Прилагательное (Adjective) – это самостоятельная часть речи, которая указывает на признак лица, предмета или понятия и отвечает на вопрос «какой?». В английском языке они не имеют категории рода и числа, поэтому не меняют своей формы.'
    };

    return <div className={cn('page-theory pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
       <h4>{data.title}</h4>
       <LevelBook className="page-theory__level" level={data.level.title}/>
       <div className="page-theory__description">{data.description}</div>
    </div>;
}

export default AdminTheory;