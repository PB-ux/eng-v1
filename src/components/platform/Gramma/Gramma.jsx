import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';

import { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant.js';

import { present } from 'src/lib/RamdaHelpers';

import { setTheories } from 'src/store/asyncActions/theories.js';
import { changeLevel } from "src/store/asyncActions/users";

import UserRepository from "src/repositories/UserRepository";
import LevelRepository from "src/repositories/LevelRepository";
import ExerciseRepository from "src/repositories/ExerciseRepository";

import GrammaItem from 'src/components/platform/Gramma/GrammaItem.jsx';
import Spinner from "src/components/UI/Spinner.jsx";
import Button from 'src/components/UI/Button.jsx';
import EmptyContent from "src/components/UI/EmptyContent.jsx";
import Success from "src/components/UI/Success.jsx";

import { FaLock } from 'react-icons/Fa';
import { getLevelAction } from "src/store/actionCreators/levelActionCreator";


function Gramma({}) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const theories = useSelector((state) => state.theories.theories);
    const user = useSelector((state) => state.user.user);
    const level = useSelector( (state) => state.level.level);
    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [currentExercise, setCurrentExercise] = useState([]);
    const [levels, setLevels] = useState([]);

    const filterLevelExercise = currentExercise.filter((item) => item.level.title === user.level);
    const filterTheoriesExercise = theories.filter((item) => item.level.title === user.level);
    const availableLevels = levels.filter((item) => user.level >= item.title).map((item) => item.title);

    useEffect(() => {
        LevelRepository.getLevels()
            .then(({ levels }) => {
                setLevels(levels);
            }).catch((e) => console.log(e));
    }, []);

    useEffect(() => {
        if (present(user)) {
            const payload = { levelTitle: user.level };
            setTimeout(() => {
                dispatch(setTheories(payload));
            }, 1000);
            dispatch(getLevelAction(user.level));
        }
    }, [user]);

    useEffect(() => {
        const params = { userId: user.id };

        if (present(user)) {
            ExerciseRepository.getCurrentExercise(params)
                .then(({ user } ) => {
                    const { currentExercise } = user;
                    setCurrentExercise(currentExercise);
                }).catch((e) => console.log(e));
        }
    }, [user]);

    const renderFinishButton = () => {
        return <>
            { filterLevelExercise.length !== filterTheoriesExercise.length
                ?  <Button disabled onClick={() => console.log(1)}>Закончить модуль</Button>
                : <Button onClick={handleFinishModule}>Закончить модуль</Button>
            }
        </>
    }

    const handleFinishModule = () => {
        const filterLevels = levels.filter((item) => !availableLevels.includes(item.title));
        const params = { level: filterLevels[0].title };

        setLoading(true);
        setTimeout(() => {
            dispatch(changeLevel(params));
            setLoading(false);
            setSuccess(true);
        }, 1000);
    }

    if (isLoading) return <Spinner isLoading={isLoading} />
    if (isSuccess) return <Success successText="Поздравяем с повышением уровня!" successBtnText="Перейти в аккаунт" link="/account"/>

    return <div className={cn('gramma pages', { 'pages_offset': activeModule === ACTIVE_MODULE.gramma })}>
        <h4 className="gramma__title">Уроки по грамматике</h4>
        <div className="gramma__container">
            { present(theories) && availableLevels.includes(level) ? theories.map((theory) => <GrammaItem key={theory.id} id={theory.id} title={theory.title} date={theory.createdAt} level={theory.level.title} description={theory.description} currentExercise={currentExercise} />) : <EmptyContent title="Уроки недоступны" icon={<FaLock className="empty-book__icon" />} /> }
        </div>
        { user.level === level ? renderFinishButton() : null }
    </div>;
}

export default Gramma;