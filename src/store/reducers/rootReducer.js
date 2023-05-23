import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { userReducer } from './userReducer.js';
import { activeModuleReducer } from './activeModuleReducer.js';
import { bookReducer } from './bookReducer.js';
import { theoryReducer } from "./theoryReducer.js";
import { levelReducer } from './levelReducer.js';

export const rootReducer = combineReducers({
    user: userReducer,
    activeModule: activeModuleReducer,
    books: bookReducer,
    form: formReducer,
    theories: theoryReducer,
    level: levelReducer,
})