import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Menu, { MenuItem } from 'rc-menu';
import cn from 'classnames';

import { logOut } from 'src/store/asyncActions/users.js';

import Dropdown from 'src/components/UI/Dropdown.jsx';

import { BsChevronDown } from 'react-icons/Bs';
import { MdExitToApp } from 'react-icons/Md';

function MenuAccount(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const [isOverlayClick, setOverlayClick] = useState(false);

    const shortUserName = user.firstName.slice(0, 2);

    const handleLogOut = () => {
        dispatch(logOut());
        navigate('/login');
    }

    const renderDropdownOverlay = () => {
        return <Menu className="account__menu-dropdown">
            <MenuItem className="account__menu-item" onClick={handleLogOut}>
                <MdExitToApp className="account__menu-icon_logout" />
                Выйти
            </MenuItem>
        </Menu>
    }

    const renderAvatar = () => {
        return  <div className="account__menu-avatar">
            { shortUserName }
        </div>;
    }

    return <Dropdown trigger="click" overlay={renderDropdownOverlay} onVisibleChange={() => setOverlayClick((prev) =>  !prev)} overlayStyle={{ position: 'absolute', zIndex: 200 }} destroyPopupOnHide>
        <div className="account__menu">
            { user.photo ? <img src={`http://localhost:5000/${user.photo}`} alt="avatar" className="account__menu-img" /> : renderAvatar() }
            <div className="account__menu-name">{user.firstName}</div>
            <div className={cn('account__menu-chevron', { 'account__menu-chevron_rotate': isOverlayClick })}><BsChevronDown /></div>
        </div>
    </Dropdown>
}

export default MenuAccount;