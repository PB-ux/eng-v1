import exerciseAction from "src/store/actionConstants/exerciseAction";

const defaultState = {
    exercise: {}
}

export const exerciseReducer = (state = defaultState, action) => {
    switch(action.type) {
        case exerciseAction.GET_EXERCISE:
            return { exercise: action.payload }
        case exerciseAction.RESET_EXERCISE:
            return { exercise: {} }
        default:
            return state;
    }
}