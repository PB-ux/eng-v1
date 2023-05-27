import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import cn from "classnames";

import { ACTIVE_MODULE } from "src/components/constansts/activeModuleConstant";
import { getExercise } from "src/store/asyncActions/exercise";
import { present } from 'src/lib/RamdaHelpers';

import QuizForm from "src/components/platform/Admin/Gramma/Exercise/QuizForm.jsx";
import ExerciseRepository from "src/repositories/ExerciseRepository";
import Spinner from "src/components/UI/Spinner.jsx";
import Success from "src/components/UI/Success.jsx";
import {getLevels} from "src/store/asyncActions/level";

function EditAdminExercise(props) {
    const dispatch = useDispatch();
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const exercise = useSelector((state) => state.exercise.exercise);
    const params = useParams();
    const { id } = params;

    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            dispatch(getExercise(id));
            dispatch(getLevels());
            setLoading(false);
        }, 1000);
    }, []);

    const handleSubmit = (data) => {
        const params = {
            title: data.title,
            review: data.review,
            levelId: data.level.value,
            numberQuestions: data.questions.length,
            questions: data.questions,
        }

        setLoading(true);
        setTimeout(() => {
            ExerciseRepository.updateExercise(params, id)
                .then((response) => {
                    setLoading(false);
                    setSuccess(true);
                }).catch((e) => console.log(e));
        }, 1000);
    }

    if (isLoading) return <Spinner isLoading={isLoading} />;
    if (isSuccess) return <Success successText="Поля успешно обновлены!" successBtnText="Вернуться к урокам" link="/admin/exercise"/>

    return <div className={cn('page-theory pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
        <h4>Редактирование упражнения</h4>
        { present(exercise) ? <QuizForm onSubmit={handleSubmit} /> : null }
    </div>
}

export default EditAdminExercise;