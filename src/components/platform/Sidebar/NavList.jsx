import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { USER_ROLE } from '../../constansts/userConstant.js';
import { ACTIVE_MODULE } from '../../constansts/activeModuleConstant.js';

import { changeActiveModuleAction } from '../../../store/actionCreators/changeActiveModuleAction.js';

import NavItem from "./NavItem.jsx";

import { TbBrandGrammarly } from 'react-icons/Tb';
import { AiFillHome } from 'react-icons/Ai';
import { RiBookLine } from 'react-icons/Ri';
import { RiAdminFill } from 'react-icons/Ri';

function NavList({}) {
    const dispatch = useDispatch();
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    const onClickMenuItemBook = () => {
        if (activeModule === ACTIVE_MODULE.categoryBooks) dispatch(changeActiveModuleAction(''));
        if (activeModule !== ACTIVE_MODULE.categoryBooks) dispatch(changeActiveModuleAction(ACTIVE_MODULE.categoryBooks));

        navigate('/library');
    }

    const onClickMenuItemGramma = () => {
        if (activeModule === ACTIVE_MODULE.gramma) dispatch(changeActiveModuleAction(''));
        if (activeModule !== ACTIVE_MODULE.gramma) dispatch(changeActiveModuleAction(ACTIVE_MODULE.gramma));

        navigate('/gramma');
    }

    const onClickMenuItem = (route) => {
        navigate(route);
        dispatch(changeActiveModuleAction(''));
    }

    return <div className="sidebar__nav">
        <NavItem onClick={() => onClickMenuItem('/account')} text="Главная" icon={<AiFillHome />} />
        <NavItem onClick={onClickMenuItemBook} text="Чтение" icon={<RiBookLine />} />
        <NavItem onClick={onClickMenuItemGramma} text="Грамматика" icon={<TbBrandGrammarly />} />
        { user.role === USER_ROLE.admin ? <NavItem text="Админ" onClick={() => onClickMenuItem('/admin')} icon={<RiAdminFill />} /> : null }
    </div>;
}

export default NavList;