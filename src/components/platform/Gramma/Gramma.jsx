import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';

import { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant.js';

import { present } from 'src/lib/RamdaHelpers';

import { getTheories } from 'src/store/asyncActions/theories.js';

import GrammaItem from 'src/components/platform/Gramma/GrammaItem.jsx';
import Spinner from "src/components/UI/Spinner.jsx";
import EmptyContent from "src/components/UI/EmptyContent.jsx";

import { FaLock } from 'react-icons/Fa';

function Gramma({}) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const theories = useSelector((state) => state.theories.theories);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            dispatch(getTheories())
            setLoading(false);
        }, 1000);
    }, []);

    if (isLoading) return <Spinner isLoading={isLoading} />

    return <div className={cn('gramma pages', { 'pages_offset': activeModule === ACTIVE_MODULE.gramma })}>
        <h4 className="gramma__title">Уроки по грамматике</h4>
        <div className="gramma__container">
            { present(theories) ? theories.map((theory) => <GrammaItem title={theory.title} date={theory.createdAt} level={theory.level.title} description={theory.description} />) : <EmptyContent title="Уроки недоступны" icon={<FaLock className="empty-book__icon" />} /> }
        </div>
    </div>;
}

export default Gramma;