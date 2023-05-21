import React from 'react';
import { useNavigate } from 'react-router-dom';
import MDEditor from "@uiw/react-md-editor";

function GrammaItem({ title, date, level, description }) {
    const navigate = useNavigate();
    const formatter = new Intl.DateTimeFormat("ru-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    });

    const handleClickItem = (e) => {
        e.preventDefault();

        navigate(`/gramma/item/${1}`);
    }

    return <div className="gramma-post">
        <a className="gramma-post__title" onClick={handleClickItem}>{title}</a>
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