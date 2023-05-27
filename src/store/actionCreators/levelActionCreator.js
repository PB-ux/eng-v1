import levelActions from "src/store/actionConstants/levelActions";

export const getLevelAction = (payload) => ({ type: levelActions.GET_LEVEL, payload });

export const getLevelsAction = (payload) => ({ type: levelActions.GET_LEVELS, payload });