import React from 'react';
import cn from "classnames";
import { useSelector } from 'react-redux';

import { ACTIVE_MODULE } from '../constansts/activeModuleConstant.js';

function Gramma({}) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);

    return <div className={cn('gramma pages', { 'pages_offset': activeModule === ACTIVE_MODULE.gramma })}>
        gramma
    </div>;
}

export default Gramma;