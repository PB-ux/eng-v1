import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import cn from "classnames";

import {ACTIVE_MODULE} from "src/components/constansts/activeModuleConstant";

import {present} from "src/lib/RamdaHelpers";

import AuthorRepository from "src/repositories/AuthorRepository";

import Spinner from "src/components/UI/Spinner.jsx";
import Success from "src/components/UI/Success.jsx";
import Input from "src/components/UI/Input.jsx";
import Button from "src/components/UI/Button.jsx";

function EditAuthor(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const params = useParams();
    const { id } = params;
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            fullName: '',
        }
    });

    const [author, setAuthor] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    const validations = {
        req: { required: 'Это обязательное поле!'}
    }

    useEffect(() => {
        if (present(author)) {
            const defaultValues = { fullName: author.fullName };
            reset(defaultValues);
        }
    }, [author])

    useEffect(() => {
        AuthorRepository.getAuthor(id)
            .then(({ author }) => {
                setAuthor(author);
            }).catch((e) => console.log(e));
    }, []);

    const handleSendForm = (data) => {
        const formData = new FormData();
        formData.append('fullName', data.fullName);

        setLoading(true);
        setTimeout(() => {
            AuthorRepository.updateAuthor(id, formData)
                .then((response) => {
                    setLoading(false);
                    setSuccess(true);
                }).catch((e) => console.log(e));
        }, 1500);

        reset();
    };

    if (isLoading) return <Spinner isLoading={isLoading} />
    if (isSuccess) return <Success successText="Поля успешно обновились!" successBtnText="Вернуться к авторам" link="/admin/author/show"/>

    return <div className={cn('book-edit pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
        <h4>Редактирования автора</h4>
        <form className="admin__book-form" onSubmit={handleSubmit(handleSendForm)}>
            <div className="admin__book-container">
                <Input register={register} errors={errors} name="fullName" validationSchema={validations.req} textLabel="Имя автора" className="admin__book-input_label" text="Neil Philip" required />
                <Button className="admin__book-btn" type="submit">Отправить</Button>
            </div>
        </form>
    </div>
}

export default EditAuthor;