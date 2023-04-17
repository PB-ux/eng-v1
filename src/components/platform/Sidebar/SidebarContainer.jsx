import React, { useState } from 'react';
import cn from 'classnames';

import ModuleCategory from './ModuleCategory.jsx';
import Sidebar from './Sidebar.jsx';

function SidebarContainer(props) {
    const [isActiveCategory, setIsActiveCategory] = useState(false);

    return <div className="sidebar">
        <Sidebar isActiveCategory={isActiveCategory} setIsActiveCategory={setIsActiveCategory} />
        <ModuleCategory className={cn('sidebar__module-category', { 'sidebar__module-category_open': isActiveCategory })} />
    </div>;
}

export default SidebarContainer;