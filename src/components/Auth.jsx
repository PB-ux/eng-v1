import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { registrationUser, signInUser } from '../store/asyncActions/users';

import Input from './UI/Input.jsx';
import Button from './UI/Button.jsx';
import Checkbox from './UI/Checkbox.jsx';

import authImage from '../assets/auth-background.png';

function Auth() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
            lastName: '',
            firstName: '',
        },
    });

    const [checked, setChecked] = useState(false);

    const isLogin = location.pathname === '/login';

    const validations = {
        firstName: { required: 'Это поле обязательное!', minLength: { value: 2, message: 'Имя должно быть длинее 1 символа' } },
        lastName: { required: 'Это поле обязательное!', minLength: { value: 2, message: 'Фамилия должна быть длинее 1 символа' } },
        email: { required: 'Это поле обязательное!', pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Невалидный email!' } },
        password: { required: 'Это поле обязательное!', minLength: { value: 7, message: 'Пароль должен быть длинее 6 символов' } }
    }

    const handleAuthRegistration = (data) => {
        if (isLogin) {
            const params = { email: data.email, password: data.password };
            dispatch(signInUser(params));
        } else {
            const params = { firstName: data.firstName, lastName: data.lastName, email: data.email, password: data.password };
            dispatch(registrationUser(params));
        }

        navigate('/account');
    }

    const handleClickLink = () => {
        if (isLogin) navigate('/registration');
        if (!isLogin) navigate('/login');

        reset();
    }

    return <div className="auth">
        <div className="auth-welcome">
            <img className="auth-welcome__background" src={authImage} alt="auth-image" />
            <h1 className="auth-welcome__logo">EngX</h1>
            <p className="auth-welcome__title">Добро пожаловать на нашу платформу!</p>
        </div>

        <div className="auth-form">
            <span className="auth-form__icon  auth-form__icon_right"></span>
            <h1>{ isLogin ? 'Вход' : 'Регистрация' }</h1>
            <p>Начните абсолютно бесплатно</p>

            <form className="form" onSubmit={handleSubmit(handleAuthRegistration)}>
                { isLogin
                    ? <>
                        <Input register={register} errors={errors} name="email" validationSchema={{ required: 'Это поле обязательное!'}} className="auth-form__field" textLabel="Email" text="example@gmail.com" type="email" required />
                        <Input register={register} errors={errors} name="password" validationSchema={{ required: 'Это поле обязательное!'}} className="auth-form__field" textLabel="Пароль" text="Adfj1232A" type="password" required />
                    </>
                    : <>
                        <Input register={register} errors={errors} name="firstName" validationSchema={validations.firstName} className="auth-form__field" textLabel="Имя" text="Владимир" required />
                        <Input register={register} errors={errors} name="lastName" validationSchema={validations.lastName} className="auth-form__field" textLabel="Фамилия" text="Попов" required />
                        <Input register={register} errors={errors} name="email" validationSchema={validations.email} className="auth-form__field" textLabel="Email" text="example@gmail.com" type="email" required />
                        <Input register={register} errors={errors} name="password" validationSchema={validations.password} className="auth-form__field" textLabel="Пароль" text="Adfj1232A" type="password" required />
                        <Checkbox className="auth-form__checkbox" label="Отправляя данную форму вы соглашаетесь с политикой конфиденциальности" onChange={setChecked} isLink />
                    </>
                }
                <Button type="submit" className="auth-form__btn">{ isLogin ? 'Вход' : 'Зарегистрироваться' }</Button>
            </form>

            { isLogin ? <a onClick={handleClickLink} className="auth-form__link">Еще не зарегистрированы?</a> : <a onClick={handleClickLink} className="auth-form__link">Уже есть аккаунт?</a> }
            <span className="auth-form__icon auth-form__icon_left"></span>
        </div>
    </div>;
}

export default Auth;