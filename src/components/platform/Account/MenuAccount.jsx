import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { logOut } from '../../../store/asyncActions/users';

import Dropdown from '../../UI/Dropdown.jsx';

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
        return <div className="account__menu-logout" onClick={handleLogOut}>
            <MdExitToApp className="account__menu-icon_logout" />
            Logout
        </div>
    }

    return <div className="account__menu">
        <div className="account__menu-avatar">{shortUserName}</div>
        <div className="account__menu-name">{user.firstName}</div>
        <Dropdown trigger="click" overlay={renderDropdownOverlay} overlayStyle={{ position: 'absolute', zIndex: 200 }} overlayClassName="account__menu-dropdown" destroyPopupOnHide>
            <div className="account__menu-chevron"><BsChevronDown /></div>
        </Dropdown>
    </div>;
}

export default MenuAccount;