import bookActions from '../actionConstants/bookActions.js';

const defaultState = {
    books: []
}

export const bookReducer = (state = defaultState, action) => {
    switch(action.type) {
        case bookActions.GET_BOOKS:
            return {...state, books: [...action.payload]};
        case bookActions.SET_BOOKS:
            return {...state, books: [...action.payload]};
        default:
            return state;
    }
}