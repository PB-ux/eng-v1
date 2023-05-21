import theoryActions from "src/store/actionConstants/theoryActions";

export const getTheoriesAction = (payload) => ({ type: theoryActions.GET_THEORIES, payload });

export const setTheoriesAction = (payload) => ({ type: theoryActions.SET_THEORIES, payload });