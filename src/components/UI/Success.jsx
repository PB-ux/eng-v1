import React from 'react';
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import {ACTIVE_MODULE} from "src/components/constansts/activeModuleConstant";
import {useSelector} from "react-redux";

import Button from 'src/components/UI/Button.jsx';

import { AiFillCheckCircle } from 'react-icons/Ai';

function Success({ successText, successBtnText, link }) {
    const navigate = useNavigate();
    const activeModule = useSelector((state) => state.activeModule.activeModule);

    const handleClickBtn = () => {
        navigate(link, {replace: true});
    }

    return <div className={cn('success pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
        <AiFillCheckCircle className="success__icon"/>
        <div className="success__text">{successText}</div>
        <Button className="success__btn" onClick={handleClickBtn}>{successBtnText}</Button>
    </div>
}

export default Success;