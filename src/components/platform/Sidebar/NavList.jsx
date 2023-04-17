import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { changeActiveModuleAction } from '../../../store/actionCreators/changeActiveModuleAction.js';

import NavItem from "./NavItem.jsx";

import { TbBrandGrammarly } from 'react-icons/Tb';
import { AiFillHome } from 'react-icons/Ai';
import { RiBookLine } from 'react-icons/Ri';

function NavList({ onActiveCategory, isActiveCategory }) {
    const dispatch = useDispatch();
    const activeModule = useSelector((state) => state.activeModule.activeModule)
    const navigate = useNavigate();

    const onClickMenuItemBook = () => {
        if (isActiveCategory) onActiveCategory(false);
        if (!isActiveCategory) onActiveCategory(true);
        if (activeModule === 'categoryBook') dispatch(changeActiveModuleAction(''));
        if (activeModule !== 'categoryBook') dispatch(changeActiveModuleAction('categoryBook'));

        navigate('/library');
    }

    const onClickMenuItem = (route) => {
        navigate(route);
        onActiveCategory(false);
    }

    return <div className="sidebar__nav">
        <NavItem onClick={() => onClickMenuItem('/account')} text="Главная" icon={<AiFillHome />}></NavItem>
        <NavItem onClick={onClickMenuItemBook} text="Чтение" icon={<RiBookLine />}></NavItem>
        <NavItem onClick={() => onClickMenuItem('/gramma')} text="Грамматика" icon={<TbBrandGrammarly />}></NavItem>
    </div>;
}

export default NavList;