import levelActions from "src/store/actionConstants/levelActions";

const defaultState = {
    level: '',
    levels: [],
}

export const levelReducer = (state = defaultState, action) => {
    switch(action.type) {
        case levelActions.GET_LEVEL:
            return {...state, level: action.payload }
        case levelActions.GET_LEVELS:
            return {...state, levels: action.payload }
        default:
            return state;
    }
}