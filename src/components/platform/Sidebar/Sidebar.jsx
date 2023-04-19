import React from 'react';
import { NavLink } from 'react-router-dom';

import NavList from './NavList.jsx';

function Sidebar({}) {

    return <div className="sidebar__content">
        <NavLink to="/home" className="sidebar__logo">Eng.</NavLink>
        <NavList />
    </div>;
}

export default Sidebar;