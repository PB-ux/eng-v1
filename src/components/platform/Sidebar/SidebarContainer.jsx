import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import ModuleCategory from './ModuleCategory.jsx';
import Sidebar from './Sidebar.jsx';

function SidebarContainer(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule)

    return <div className="sidebar">
        <Sidebar  />
        <ModuleCategory className={cn('sidebar__module-category', { 'sidebar__module-category_open': activeModule === 'categoryBook' })} />
    </div>;
}

export default SidebarContainer;