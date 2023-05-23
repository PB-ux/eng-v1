import levelActions from "src/store/actionConstants/levelActions";

const defaultState = {
    level: ''
}

export const levelReducer = (state = defaultState, action) => {
    switch(action.type) {
        case levelActions.GET_LEVEL:
            return { level: action.payload }
        default:
            return state;
    }
}