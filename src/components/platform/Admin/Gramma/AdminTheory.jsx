import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MDEditor from '@uiw/react-md-editor';
import cn from 'classnames';

import { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant.js';

import { present } from 'src/lib/RamdaHelpers.js';

import TheoryRepository from "src/repositories/TheoryRepository";

import LevelBook from "src/components/UI/LevelBook.jsx";
import Spinner from "src/components/UI/Spinner.jsx";

function AdminTheory(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const params = useParams();
    const { id } = params;

    const [isLoading, setLoading] = useState(false);
    const [theory, setTheory] = useState({});


    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            TheoryRepository.getTheory(id)
                .then((response) => {
                    const {theory} = response;

                    setTheory(theory);
                    setLoading(false);
                })
        }, 1000);
    }, []);

    if (isLoading) return <Spinner isLoading={isLoading} />

    return <div className={cn('page-theory pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
       <h4>{theory.title}</h4>
        { present(theory.title) ? <LevelBook className="page-theory__level" level={theory.level.title}/> : null }
        <div className="container" data-color-mode="light">
            <MDEditor.Markdown source={theory.description} />
        </div>
    </div>;
}

export default AdminTheory;