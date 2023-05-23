import levelActions from "src/store/actionConstants/levelActions";

export const getLevelAction = (payload) => ({ type: levelActions.GET_LEVEL, payload });