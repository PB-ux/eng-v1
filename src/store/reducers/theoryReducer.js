import theoryActions from "src/store/actionConstants/theoryActions";

const defaultState = {
    theories: []
}

export const theoryReducer = (state = defaultState, action) => {
    switch(action.type) {
        case theoryActions.GET_THEORIES:
            return {...state, theories: [...action.payload]};
        case theoryActions.SET_THEORIES:
            return {...state, theories: [...action.payload]};
        default:
            return state;
    }
}