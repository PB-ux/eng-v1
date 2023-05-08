import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';

import { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant.js';

import Sidebar from './Sidebar.jsx';
import ModuleCategory from './ModuleCategory/ModuleCategory.jsx';
import ModuleGramma from './ModuleGramma/ModuleGramma.jsx';
import ModuleAdmin from './ModuleAdmin/ModuleAdmin.jsx';

function SidebarContainer(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule)

    return <div className="sidebar">
        <Sidebar  />
        <CSSTransition in={activeModule === ACTIVE_MODULE.categoryBooks} timeout={300} classNames="sidebar-fade" unmountOnExit>
            <ModuleCategory />
        </CSSTransition>
        <ModuleGramma className={cn('sidebar__module', { 'sidebar__module_open': activeModule === ACTIVE_MODULE.gramma })} />
        <ModuleAdmin className={cn('sidebar__module', { 'sidebar__module_open': activeModule === ACTIVE_MODULE.admin })} />
    </div>;
}

export default SidebarContainer;