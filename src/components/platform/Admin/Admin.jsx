import React from 'react';
import cn from "classnames";
import { useSelector } from 'react-redux';

import { ACTIVE_MODULE } from '../../constansts/activeModuleConstant.js';

function Admin(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);

    return <div className={cn('admin pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
        admin
    </div>;
}

export default Admin;