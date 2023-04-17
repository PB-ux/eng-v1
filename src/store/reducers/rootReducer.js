import { combineReducers } from 'redux';

import { userReducer } from './userReducer.js';
import { activeModuleReducer } from './activeModuleReducer.js';

export const rootReducer = combineReducers({
    user: userReducer,
    activeModule: activeModuleReducer,
})