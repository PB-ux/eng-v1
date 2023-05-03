import React, { useState, useEffect } from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import cn from "classnames";

import {ACTIVE_MODULE} from "src/components/constansts/activeModuleConstant";

import {present} from "src/lib/RamdaHelpers";

import CategoryRepository from "src/repositories/CategoryRepository";

import Input from "src/components/UI/Input.jsx";
import Button from "src/components/UI/Button.jsx";
import Spinner from "src/components/UI/Spinner.jsx";
import Success from "src/components/UI/Success.jsx";

function EditGenre(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const params = useParams();
    const { id } = params;
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
        }
    });

    const [category, setCategory] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    const validations = {
        req: { required: 'Это обязательное поле!'}
    }

    useEffect(() => {
        if (present(category)) {
            const defaultValues = { title: category.title };
            reset(defaultValues);
        }
    }, [category])

    useEffect(() => {
        CategoryRepository.getCategory(id)
            .then(({ category }) => {
                setCategory(category);
            }).catch((e) => console.log(e));
    }, []);

    const handleSendForm = (data) => {
        const formData = new FormData();
        formData.append('title', data.title);

        setLoading(true);
        setTimeout(() => {
            CategoryRepository.updateCategory(id, formData)
                .then((response) => {
                    setLoading(false);
                    setSuccess(true);
                }).catch((e) => console.log(e));
        }, 1500);

        reset();
    };

    if (isLoading) return <Spinner isLoading={isLoading} />
    if (isSuccess) return <Success successText="Поля успешно обновились!" successBtnText="Вернуться к жанрам" link="/admin/genre/show"/>

    return <div className={cn('book-edit pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
        <h4>Редактирования жанра</h4>
        <form className="admin__book-form" onSubmit={handleSubmit(handleSendForm)}>
            <div className="admin__book-container">
                <Input register={register} errors={errors} name="title" validationSchema={validations.req} textLabel="Название жанра" className="admin__book-input_label" text="Приключения" required />
                <Button className="admin__book-btn" type="submit">Отправить</Button>
            </div>
        </form>
    </div>
}

export default EditGenre;