import TheoryRepository from "src/repositories/TheoryRepository";
import {getTheoriesAction, setTheoriesAction} from "src/store/actionCreators/theoryActionCreateor";


export const getTheories = () => {
    return (dispatch) => {
        TheoryRepository.getTheories()
            .then((response) => {
                const { theories } = response;
                dispatch(getTheoriesAction(theories));
            }).catch((e) => console.log(e));
    }
}

export const setTheories = (payload) => {
    return (dispatch) => {
        TheoryRepository.getLevelTheories(payload)
            .then((response) => {
                const { theories } = response;
                dispatch(setTheoriesAction(theories));
            }).catch((e) => console.log(e));
    }
}