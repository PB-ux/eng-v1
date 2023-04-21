import userActions from '../actionConstants/userActions.js';

const defaultState = {
   user: {
       id: '',
       firstName: '',
       lastName: '',
       email: '',
       role: '',
       photo: '',
       level: '',
       points: 0,
       isAuth: false,
   }
}

export const userReducer = (state = defaultState, action) => {
    switch(action.type) {
        case userActions.SING_IN_USER:
            return {user: action.payload}
        case userActions.REGISTRATION_USER:
            return {user: action.payload}
        case userActions.SET_IS_AUTH:
            return {user: action.payload}
        case userActions.LOGOUT:
            return {user: action.payload}
        case userActions.UPLOAD_PHOTO:
            return {user: action.payload}
        default:
            return state;
    }
}