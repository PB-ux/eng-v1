import userActions from '../actionConstants/userActions.js';

const defaultState = {
   user: {
       id: '',
       firstName: '',
       lastName: '',
       email: '',
       role: '',
       isAuth: false,
   }
}

export const userReducer = (state = defaultState, action) => {
    switch(action.type) {
        case userActions.SING_IN_USER:
            return {...state, isAuth: action.payload}
        default:
            return state;
    }
}