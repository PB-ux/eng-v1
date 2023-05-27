import React, { useEffect, useState } from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

import { present } from 'src/lib/RamdaHelpers.js';

import Input from "src/components/UI/Input.jsx";
import Button from "src/components/UI/Button.jsx";
import {edit} from "src/store/asyncActions/users";
import Spinner from "src/components/UI/Spinner.jsx";

function EditInfoAccount({ handleEditAccount }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
            lastName: '',
            firstName: '',
        },
    });

    const [isLoading, setLoading] = useState(false);

    const validations = {
        firstName: { required: 'Это поле обязательное!', minLength: { value: 2, message: 'Имя должно быть длинее 1 символа' } },
        lastName: { required: 'Это поле обязательное!', minLength: { value: 2, message: 'Фамилия должна быть длинее 1 символа' } },
        email: { required: 'Это поле обязательное!', pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Невалидный email!' } },
        password: { required: 'Это поле обязательное!', minLength: { value: 7, message: 'Пароль должен быть длинее 6 символов' } }
    }

    useEffect(() => {
        if(present(user)) {
            const defaultValue = { email: user.email, password: user.password, lastName: user.lastName, firstName: user.firstName };
            reset(defaultValue);
        }
    }, [user]);

    if (isLoading) return <Spinner isLoading={isLoading} />

    return <div>
        <form className="form" onSubmit={handleSubmit(handleEditAccount)}>
            <div className="account__inputs">
                <Input register={register} errors={errors} name="firstName" validationSchema={validations.firstName} className="account__label" inputClassName="account__input" textLabel="Имя" text="Владимир" required />
                <Input register={register} errors={errors} name="lastName" validationSchema={validations.lastName} className="account__label" inputClassName="account__input" textLabel="Фамилия" text="Попов" required />
            </div>
            <div className="account__inputs">
                <Input register={register} errors={errors} name="email" validationSchema={validations.email} className="account__label" inputClassName="account__input" textLabel="Email" text="example@gmail.com" type="email" required />
                <Input register={register} errors={errors} name="password" validationSchema={validations.password} className="account__label" inputClassName="account__input" textLabel="Пароль" text="Adfj1232A" type="password" required />
            </div>
            <Button type="submit" className="auth-form__btn account__btn">Отправить</Button>
        </form>
    </div>
}

export default EditInfoAccount;