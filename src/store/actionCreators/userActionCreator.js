import userActions from '../actionConstants/userActions.js';

export const signInUserAction = (payload) => ({ type: userActions.SING_IN_USER, payload });

export const registrationUserAction = (payload) => ({ type: userActions.REGISTRATION_USER, payload});

export const setIsAuth = (payload) => ({ type: userActions.SET_IS_AUTH, payload });

export const logOutAction = (payload) => ({ type: userActions.LOGOUT, payload });

export const uploadPhotoAction = (payload) => ({ type: userActions.UPLOAD_PHOTO, payload });

export const addPointsAction = (payload) => ({ type: userActions.ADD_POINTS, payload });

export const changeLevelAction = (payload) => ({ type: userActions.CHANGE_LEVEL, payload });

export const editAction = (payload) => ({ type: userActions.EDIT, payload });