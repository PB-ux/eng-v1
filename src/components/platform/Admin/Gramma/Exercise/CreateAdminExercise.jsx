import React, {useEffect, useState} from 'react';
import QuizForm from 'src/components/platform/Admin/Gramma/Exercise/QuizForm.jsx';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant';

import { present } from 'src/lib/RamdaHelpers.js';

import { getLevels } from 'src/store/asyncActions/level.js';
import { resetExerciseAction } from 'src/store/actionCreators/exerciseActionCreator.js';

import ExerciseRepository from 'src/repositories/ExerciseRepository.js';

import Spinner from 'src/components/UI/Spinner.jsx';
import Success from 'src/components/UI/Success.jsx';

function CreateAdminExercise(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            dispatch(resetExerciseAction());
            dispatch(getLevels());
            setLoading(false);
        }, 1000);
    }, []);

    const handleSubmit = (data) => {
        if (present(data)) {
            const params = {
                title: data.title,
                review: data.review,
                levelId: data.level.value,
                numberQuestions: data.questions.length,
                questions: data.questions,
            }

            setLoading(true);
            setTimeout(() => {
                ExerciseRepository.createExercise(params)
                    .then((response) => {
                        setLoading(false);
                        setSuccess(true);
                    }).catch((e) => console.log(e));
            }, 1000);
        }
    }

    if (isLoading) return <Spinner isLoading={isLoading} />;
    if (isSuccess) return <Success successText="Упражнение успешно создано!" successBtnText="Вернуться к урокам" link="/admin/exercise"/>

    return <div className={cn('page-theory pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
        <h4>Создание упражнения</h4>
        <QuizForm onSubmit={handleSubmit} />
        {/*<QuizFormResult result={result} />*/}
    </div>
}

export default CreateAdminExercise;