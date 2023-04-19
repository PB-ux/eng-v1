import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { registrationUser, signInUser } from '../store/asyncActions/users';

import Input from './UI/Input.jsx';
import Button from './UI/Button.jsx';
import Checkbox from './UI/Checkbox.jsx';

import authImage from '../assets/auth-background.png';

function Auth() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user)
    const location = useLocation();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName]  = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);

    const isLogin = location.pathname === '/login';

    const handleAuthRegistration = () => {
        if (isLogin) {
            const params = { email, password };
            dispatch(signInUser(params));
        } else {
            const params = { firstName, lastName, email, password };
            dispatch(registrationUser(params));
        }

        navigate('/library');
    }

    return <div className="auth">
        <div className="auth-welcome">
            <img className="auth-welcome__background" src={authImage} alt="auth-image" />
            <h1 className="auth-welcome__logo">EngX</h1>
            <p className="auth-welcome__title">Добро пожаловать на нашу платформу!</p>
        </div>

        {/* Вынести в комонент */}
        <div className="auth-form">
            <span className="auth-form__icon  auth-form__icon_right"></span>
            <h1>{ isLogin ? 'Вход' : 'Регистрация' }</h1>
            <p>Начните абсолютно бесплатно</p>
            { isLogin
                ? <>
                    <Input className="auth-form__field" textLabel="Email" text="example@gmail.com" type="email" onChange={setEmail} value={email} autoFocus />
                    <Input className="auth-form__field" textLabel="Пароль" text="Adfj1232A" type="password" onChange={setPassword} value={password} />
                </>
                : <>
                    <Input className="auth-form__field" textLabel="Имя" text="Владимир" onChange={setFirstName} value={firstName} autoFocus />
                    <Input className="auth-form__field" textLabel="Фамилия" text="Попов" onChange={setLastName} value={lastName} />
                    <Input className="auth-form__field" textLabel="Email" text="example@gmail.com" type="email" onChange={setEmail} value={email} />
                    <Input className="auth-form__field" textLabel="Пароль" text="Adfj1232A" type="password" onChange={setPassword} value={password} />
                    <Checkbox className="auth-form__checkbox" label="Creating an account means you’re okay with our Terms of Service, Privacy Policy, and default Notification Settings" onChange={setChecked} />
                </>
            }
            <Button className="auth-form__btn" onClick={handleAuthRegistration}>{ isLogin ? 'Вход' : 'Зарегистрироваться' }</Button>

            { isLogin ? <NavLink to="/registration" className="auth-form__link">Еще не зарегистрированы?</NavLink> : <NavLink to="/login" className="auth-form__link">Уже есть аккаунт?</NavLink> }
            <span className="auth-form__icon auth-form__icon_left"></span>
        </div>
    </div>;
}

export default Auth;