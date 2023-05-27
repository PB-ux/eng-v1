import LevelRepository from "src/repositories/LevelRepository";
import {getLevelsAction} from "src/store/actionCreators/levelActionCreator";

export const getLevels = () => {
    return (dispatch) => {
        LevelRepository.getLevels()
            .then((response) => {
                const { levels } = response;
                dispatch(getLevelsAction(levels));
            }).catch((e) => console.log(e));
    }
}