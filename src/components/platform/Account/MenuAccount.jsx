import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Menu, { MenuItem } from 'rc-menu';

import { logOut } from 'src/store/asyncActions/users.js';

import Dropdown from 'src/components/UI/Dropdown.jsx';

import { BsChevronDown } from 'react-icons/Bs';
import { MdExitToApp } from 'react-icons/Md';

function MenuAccount(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const shortUserName = user.firstName.slice(0, 2);

    const handleLogOut = () => {
        dispatch(logOut());
        navigate('/login');
    }

    const renderDropdownOverlay = () => {
        return <Menu className="menu account__menu_margin">
            <MenuItem onClick={handleLogOut}>
                <MdExitToApp className="account__menu-icon_logout" />
                Logout
            </MenuItem>
        </Menu>
    }

    const renderAvatar = () => {
        return  <div className="account__menu-avatar">
            { shortUserName }
        </div>;
    }

    return <div className="account__menu">
        { user.photo ? <img src={`http://localhost:5000/${user.photo}`} alt="avatar" className="account__menu-img" /> : renderAvatar() }
        <div className="account__menu-name">{user.firstName}</div>
        <Dropdown trigger="click" overlay={renderDropdownOverlay} overlayStyle={{ position: 'absolute', zIndex: 200 }} destroyPopupOnHide>
            <div className="account__menu-chevron"><BsChevronDown /></div>
        </Dropdown>
    </div>;
}

export default MenuAccount;