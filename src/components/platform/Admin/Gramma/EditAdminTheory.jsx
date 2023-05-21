import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import cn from "classnames";

import {ACTIVE_MODULE} from "src/components/constansts/activeModuleConstant";

import {present} from "src/lib/RamdaHelpers";
import SelectOptionsPresenter from "src/presenters/SelectOptionsPresenter";

import TheoryRepository from "src/repositories/TheoryRepository";
import ExerciseRepository from "src/repositories/ExerciseRepository";
import LevelRepository from "src/repositories/LevelRepository";

import Spinner from "src/components/UI/Spinner.jsx";
import Success from "src/components/UI/Success.jsx";
import Input from "src/components/UI/Input.jsx";
import Select from "src/components/UI/Select.jsx";
import MDEditor from "src/components/UI/MDEditor.jsx";
import Button from "src/components/UI/Button.jsx";

function EditAdminTheory(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const params = useParams();
    const { id } = params;
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
    const [theory, setTheory] = useState({});

    const validations = {
        req: { required: 'Это обязательное поле!'}
    }

    useEffect(() => {
        TheoryRepository.getTheory(id)
            .then(({ theory }) => {
                setTheory(theory);
            }).catch((e) => console.log(e));

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
    }, []);

    useEffect(() => {
        if (present(theory)) {
            const optionsLevel = { value: theory.level.id, label: theory.level.title };
            const optionsExercise = { value: theory.exercise.id, label: theory.exercise.title };
            const defaultValues = {
                title: theory.title,
                description: theory.description,
                level: optionsLevel,
                exercise: optionsExercise,
            };

            reset(defaultValues);
        }
    }, [theory])

    const handleSendForm = (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('levelId', data.level.value);
        formData.append('exerciseId', data.exercise.value);

        setLoading(true);
        setTimeout(() => {
            TheoryRepository.updateTheory(formData, id)
                .then((response) => {
                    setLoading(false);
                    setSuccess(true);
                }).catch((e) => console.log(e));
        }, 1500);

        reset();
    };

    if (isLoading) return <Spinner isLoading={isLoading} />
    if (isSuccess) return <Success successText="Поля успешно обновились!" successBtnText="Вернуться к урокам" link="/admin/theory"/>

    return <div className={cn('book-edit pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
        <h4>Редактирования урока</h4>
        <form className="admin__theory-form" onSubmit={handleSubmit(handleSendForm)}>
            <Input register={register} errors={errors} name="title" validationSchema={validations.req} textLabel="Заголовок урока" className="admin__theory-input" text="Заголово урока" required />
            <Select control={control} rules={{ required: 'Это обязательное поле!' }} name="level" errors={errors} options={optionsLevel} placeholder="Выберите уровень" textLabel="Уровень урока" className="admin__theory-input" required />
            <Select control={control} errors={errors} name="exercise" options={optionsExercise} placeholder="Выберите упражнение" textLabel="Упражнение урока" className="admin__theory-input" />
            <div className="admin__theory-markdown" data-color-mode="light">
                <MDEditor control={control} errors={errors} name="description" rules={{ required: 'Это обязательное поле!' }} />
            </div>
            <Button type="submit" className="admin__theory-btn">Отправить</Button>
        </form>
    </div>
}

export default EditAdminTheory;