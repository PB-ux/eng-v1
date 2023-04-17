import ActiveModuleAction from '../actionConstants/activeModuleAction.js';

const defaultState = {
    activeModule: ''
}

export const activeModuleReducer = (state = defaultState, action) => {
    switch(action.type) {
        case ActiveModuleAction.CHANGE_MODULE:
            return {...state, activeModule: action.payload}
        default:
            return state;
    }
}