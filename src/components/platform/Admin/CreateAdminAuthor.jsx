import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import cn from "classnames";

import {ACTIVE_MODULE} from "src/components/constansts/activeModuleConstant";

import AuthorRepository from "src/repositories/AuthorRepository";

import Spinner from "src/components/UI/Spinner.jsx";
import Success from "src/components/UI/Success.jsx";
import Input from "src/components/UI/Input.jsx";
import Button from "src/components/UI/Button.jsx";

function CreateAdminAuthor(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            fullName: '',
        }
    });

    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    const validations = {
        req: { required: 'Это обязательное поле!'}
    }

    const handleSendForm = (data) => {
        const formData = new FormData();
        formData.append('fullName', data.fullName);

        setLoading(true);
        setTimeout(() => {
            AuthorRepository.createAuthor(formData)
                .then((response) => {
                    setLoading(false);
                    setSuccess(true);
                }).catch((e) => console.log(e));
        }, 1500);

        reset();
    };

    if (isLoading) return <Spinner isLoading={isLoading} />;
    if (isSuccess) return <Success successText="Автор успешно создан!" successBtnText="Вернуться к авторам" link="/admin/author/show"/>

    return <div className={cn('admin__book pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
        <h3 className="admin__book-title">Добавить автора</h3>
        <form className="admin__book-form" onSubmit={handleSubmit(handleSendForm)}>
            <div className="admin__book-container">
                <Input register={register} errors={errors} name="fullName" validationSchema={validations.req} textLabel="Имя автора" className="admin__book-input_label" text="Neil Philip" required />
                <Button className="admin__book-btn" type="submit">Отправить</Button>
            </div>
        </form>
    </div>
}

export default CreateAdminAuthor;