import ExerciseRepository from "src/repositories/ExerciseRepository";
import { getExerciseAction } from "src/store/actionCreators/exerciseActionCreator";

export const getExercise = (payload) => {
    return (dispatch) => {
        ExerciseRepository.getExercise(payload)
            .then((response) => {
                const { exercise } = response;
                exercise.level = { value: exercise.level.id, label: exercise.level.title }
                dispatch(getExerciseAction(exercise));
            }).catch((e) => console.log(e));
    }
}