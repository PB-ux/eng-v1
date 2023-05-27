import jwt_decode from 'jwt-decode';

import {
    signInUserAction,
    registrationUserAction,
    setIsAuth,
    logOutAction,
    uploadPhotoAction,
    addPointsAction,
    changeLevelAction, editAction
} from '../actionCreators/userActionCreator';
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
        }).catch((e) => console.log(e));
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

export const edit = (payload) => {
    return (dispatch) => {
        UserRepository.edit(payload).then((response) => {
            const dataUser = jwt_decode(response.token);
            console.log(dataUser);
            dataUser.isAuth = true;
            localStorage.setItem('token', response.token);
            dispatch(editAction(dataUser));
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

export const addPoints = (payload) => {
    return (dispatch) => {
        UserRepository.addPoints(payload)
            .then((response) => {
                const dataUser = jwt_decode(response.token);
                dataUser.isAuth = true;
                localStorage.setItem('token', response.token);
                dispatch(addPointsAction(dataUser));
            }).catch((e) => console.log(e));
    }
}

export const changeLevel = (payload) => {
    return (dispatch) => {
        UserRepository.changeLevel(payload)
            .then((response) => {
                const dataUser = jwt_decode(response.token);
                dataUser.isAuth = true;
                localStorage.setItem('token', response.token);
                dispatch(changeLevelAction(dataUser));
            }).catch((e) => console.log(e));
    }
}

