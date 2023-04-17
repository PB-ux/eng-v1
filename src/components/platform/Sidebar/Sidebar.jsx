import React from 'react';
import { NavLink } from 'react-router-dom';

import NavList from './NavList.jsx';

function Sidebar({ isActiveCategory, setIsActiveCategory }) {

    return <div className="sidebar__content">
        <NavLink to="/home" className="sidebar__logo">Eng.</NavLink>
        <NavList onActiveCategory={setIsActiveCategory} isActiveCategory={isActiveCategory} />
    </div>;
}

export default Sidebar;