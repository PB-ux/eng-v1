import React from 'react';

function NavItem({ onClick, children, text, icon }) {

    return <div className="sidebar__nav-item" onClick={onClick}>
        {children}
        <div className="sidebar__nav-icon">{icon}</div>
        <div className="sidebar__nav-text">{text}</div>
    </div>
}

export default NavItem;