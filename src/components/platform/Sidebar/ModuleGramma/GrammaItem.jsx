import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setTheories} from "src/store/asyncActions/theories";
// import cn from 'classnames';

// import {LEVEL_LANGUAGE} from '../../constansts/LibraryConstants';
import { FaLock } from 'react-icons/Fa';
import {getLevelAction} from "src/store/actionCreators/levelActionCreator";
import LevelRepository from "src/repositories/LevelRepository";

function GrammaItem({ level, title }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    // const levelClassName = cn('module__item-thumbnail', {
    //     'module-gramma__item-thumbnail_a1': level === LEVEL_LANGUAGE.A1,
    //     'module-gramma__item-thumbnail_a2': level === LEVEL_LANGUAGE.A2,
    //     'module-gramma__item-thumbnail_b1': level === LEVEL_LANGUAGE.B1,
    //     'module-gramma__item-thumbnail_b2': level === LEVEL_LANGUAGE.B2,
    //     'module-gramma__item-thumbnail_c1': level === LEVEL_LANGUAGE.C1,
    // });
    const [levels, setLevels] = useState([]);

    const availableLevels = levels.filter((item) => user.level >= item.title).map((item) => item.title);

    useEffect(() => {
        LevelRepository.getLevels()
            .then(({ levels }) => {
                setLevels(levels);
            }).catch((e) => console.log(e));
    }, []);

    const handleClickGramma = () => {
        const payload = { levelTitle: level };
        dispatch(setTheories(payload));
        dispatch(getLevelAction(level));

        navigate('/gramma');
    };

    return <div className="module__item" onClick={handleClickGramma}>
        <div className="module__item-container">
            <div className="module__item-thumbnail">{level}</div>
            <div className="module__item-title">{title}</div>
        </div>
        { !availableLevels.includes(level) ? <div className="module__item-icon"><FaLock /></div> : null }
    </div>;
}

export default GrammaItem;