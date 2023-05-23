import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import MDEditor from "@uiw/react-md-editor";
import Tooltip from "rc-tooltip";
import {BsFillCheckCircleFill} from "react-icons/Bs";
import { present } from "src/lib/RamdaHelpers";

function GrammaItem({ id, title, date, level, description, currentExercise }) {
    const navigate = useNavigate();
    const formatter = new Intl.DateTimeFormat("ru-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    });

    const filterCurrentExercise = currentExercise.filter((item) => item.id === id && item.current_exercises.status === 'completed');

    const handleClickItem = (e) => {
        e.preventDefault();

        navigate(`/gramma/item/${id}`);
    }

    const renderOverlayCompleted = () => {
        return <div>
            Это урок вы уже прошли
        </div>
    }

    const renderTitle = () => {
        return <div className="gramma-post__title-container">
            {title}
            <div className="gramma-post__title-icon">
                <BsFillCheckCircleFill />
            </div>
        </div>
    }

    return <div className="gramma-post">
        <a className="gramma-post__title" onClick={handleClickItem}>
            { present(filterCurrentExercise)
                ? <Tooltip overlay={renderOverlayCompleted}>
                    { renderTitle() }
                </Tooltip>
                : title
            }
        </a>
        <div className="gramma-post__info">
            <div className="gramma-post__date">{formatter.format(Date.parse(date))}</div>
            <div className="gramma-post__divider"></div>
            <div className="gramma-post__level">{level}</div>
        </div>
        <div className="container" data-color-mode="light">
            <MDEditor.Markdown className='gramma-post__description' source={description} />
        </div>
    </div>
}

export default GrammaItem;