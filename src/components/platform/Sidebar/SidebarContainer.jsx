import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { ACTIVE_MODULE } from '../../constansts/activeModuleConstant.js';

import ModuleCategory from './ModuleCategory.jsx';
import ModuleGramma from './ModuleGramma.jsx';
import Sidebar from './Sidebar.jsx';

function SidebarContainer(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule)

    return <div className="sidebar">
        <Sidebar  />
        <ModuleCategory className={cn('sidebar__module', { 'sidebar__module_open': activeModule === ACTIVE_MODULE.categoryBooks })} />
        <ModuleGramma className={cn('sidebar__module', { 'sidebar__module_open': activeModule === ACTIVE_MODULE.gramma })} />
    </div>;
}

export default SidebarContainer;