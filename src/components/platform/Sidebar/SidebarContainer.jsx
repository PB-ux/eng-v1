import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { ACTIVE_MODULE } from '../../constansts/activeModuleConstant.js';

import Sidebar from './Sidebar.jsx';
import ModuleCategory from './ModuleCategory/ModuleCategory.jsx';
import ModuleGramma from './ModuleGramma/ModuleGramma.jsx';
import ModuleAdmin from './ModuleAdmin/ModuleAdmin.jsx';

function SidebarContainer(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule)

    return <div className="sidebar">
        <Sidebar  />
        <ModuleCategory className={cn('sidebar__module', { 'sidebar__module_open': activeModule === ACTIVE_MODULE.categoryBooks })} />
        <ModuleGramma className={cn('sidebar__module', { 'sidebar__module_open': activeModule === ACTIVE_MODULE.gramma })} />
        <ModuleAdmin className={cn('sidebar__module', { 'sidebar__module_open': activeModule === ACTIVE_MODULE.admin })} />
    </div>;
}

export default SidebarContainer;