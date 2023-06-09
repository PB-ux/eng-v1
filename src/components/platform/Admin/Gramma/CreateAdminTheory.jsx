import React, { useState, useEffect } from 'react';
import cn from "classnames";
import {ACTIVE_MODULE} from "src/components/constansts/activeModuleConstant";
import {useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";

import SelectOptionsPresenter from "src/presenters/SelectOptionsPresenter";

import LevelRepository from "src/repositories/LevelRepository";
import ExerciseRepository from "src/repositories/ExerciseRepository";
import TheoryRepository from "src/repositories/TheoryRepository";

import Button from 'src/components/UI/Button.jsx';
import Input from "src/components/UI/Input.jsx";
import Select from "src/components/UI/Select.jsx";
import MDEditor from "src/components/UI/MDEditor.jsx";
import Spinner from "src/components/UI/Spinner.jsx";
import Success from "src/components/UI/Success.jsx";

function CreateAdminTheory(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            description: '',
            level: '',
            exercise: '',
        }
    });

    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [optionsLevel, setOptionsLevel] = useState([]);
    const [optionsExercise, setOptionsExercise] = useState([]);

    const validations = {
        req: { required: 'Это обязательное поле!'}
    }

    useEffect(() => {
        LevelRepository.getLevels()
            .then(({ levels }) => {
                const options = SelectOptionsPresenter.optionsValueLevel(levels);
                setOptionsLevel(options);
            }).catch((e) => console.log(e));

        ExerciseRepository.getExercises()
            .then(({ exercises }) => {
                console.log(exercises);
                const options = SelectOptionsPresenter.optionsValueExercise(exercises);
                setOptionsExercise(options);
            }).catch((e) => console.log(e));
    }, [])

    const handleSendForm = (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('levelId', data.level.value);
        formData.append('exerciseId', data.exercise.value);

        setLoading(true);
        setTimeout(() => {
            TheoryRepository.createTheory(formData)
                .then((response) => {
                    setLoading(false);
                    setSuccess(true);
                }).catch((e) => console.log(e));
        }, 1500);

        reset();
    };

    if (isLoading) return <Spinner isLoading={isLoading} />;
    if (isSuccess) return <Success successText="Урок успешно создан!" successBtnText="Вернуться к урокам" link="/admin/theory"/>

    return <div data-color-mode="light" className={cn('admin__theory pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
       <h4 className="admin__theory-title">Создание материала по грамматике</h4>
        <form className="admin__theory-form" onSubmit={handleSubmit(handleSendForm)}>
            <Input register={register} errors={errors} name="title" validationSchema={validations.req} textLabel="Заголовок урока" className="admin__theory-input" text="Заголово урока" required />
            <Select control={control} rules={{ required: 'Это обязательное поле!' }} name="level" errors={errors} options={optionsLevel} placeholder="Выберите уровень" textLabel="Уровень урока" className="admin__theory-input" required />
            <Select control={control} errors={errors} name="exercise" options={optionsExercise} placeholder="Выберите упражнение" textLabel="Упражнение урока" className="admin__theory-input" />
            <div className="admin__theory-markdown">
                <MDEditor control={control} errors={errors} name="description" rules={{ required: 'Это обязательное поле!' }} />
            </div>
            <Button type="submit" className="admin__theory-btn">Отправить</Button>
        </form>
    </div>
}

export default CreateAdminTheory;