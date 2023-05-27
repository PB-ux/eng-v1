import exerciseAction from "src/store/actionConstants/exerciseAction";

export const getExerciseAction = (payload) => ({ type: exerciseAction.GET_EXERCISE, payload });

export const resetExerciseAction = () => ({ type: exerciseAction.RESET_EXERCISE });
