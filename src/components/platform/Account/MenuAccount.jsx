import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { logOut } from '../../../store/asyncActions/users';

import Dropdown from '../../UI/Dropdown.jsx';

import { BsChevronDown } from 'react-icons/Bs';
import { MdExitToApp } from 'react-icons/Md';

import userAvatar from '../../../assets/user-avatar.png';


function MenuAccount(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const pathAvatar = user.photo ? `http://localhost:5000/${user.photo}` : userAvatar

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

    const renderAvatar = () => {
        return  <div className="account__menu-avatar">
            { shortUserName }
        </div>;
    }

    return <div className="account__menu">
        <img className="account__menu-img" alt="avatar" src={pathAvatar} />
        <div className="account__menu-name">{user.firstName}</div>
        <Dropdown trigger="click" overlay={renderDropdownOverlay} overlayStyle={{ position: 'absolute', zIndex: 200 }} overlayClassName="account__menu-dropdown" destroyPopupOnHide>
            <div className="account__menu-chevron"><BsChevronDown /></div>
        </Dropdown>
    </div>;
}

export default MenuAccount;