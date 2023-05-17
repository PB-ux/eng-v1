import jwt_decode from 'jwt-decode';

import { signInUserAction, registrationUserAction, setIsAuth, logOutAction, uploadPhotoAction } from '../actionCreators/userActionCreator';
import UserRepository from '../../repositories/UserRepository';

export const registrationUser = (payload) => {
    return (dispatch) => {
        UserRepository.registration(payload).then(response => {
            const dataUser = jwt_decode(response.token);
            dataUser.isAuth = true;
            localStorage.setItem('token', response.token);
            dispatch(registrationUserAction(dataUser));
        })
    }
}

export const signInUser = (payload) => {
    return (dispatch) => {
        UserRepository.login(payload).then(response => {
            const dataUser = jwt_decode(response.token);
            dataUser.isAuth = true;
            localStorage.setItem('token', response.token);
            dispatch(signInUserAction(dataUser))
        })
    }
}

export const checkAuth = () => {
    return (dispatch) => {
        UserRepository.check().then((response) => {
            const dataUser = jwt_decode(response.token);
            console.log(dataUser);
            dataUser.isAuth = true;
            localStorage.setItem('token', response.token);
            dispatch(setIsAuth(dataUser));
        }).catch((e) => console.log(e));
    }
}

export const logOut = () => {
    return (dispatch) => {
        UserRepository.check().then((response) => {
            const dataUser = jwt_decode(response.token);
            dataUser.isAuth = false;
            localStorage.removeItem('token');
            dispatch(logOutAction(dataUser));
        })
    }
}

export const uploadPhoto = (payload) => {
    return (dispatch) => {
        UserRepository.uploadPhoto(payload).then((response) => {
            const dataUser = jwt_decode(response.token);
            dataUser.isAuth = true;
            localStorage.setItem('token', response.token);
            dispatch(uploadPhotoAction(dataUser));
        })
    }
}

