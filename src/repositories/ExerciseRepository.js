import FetchHelper from '../lib/FetchHelper';

const getExercises = () => {
    const url = 'http://localhost:5000/api/exercise/show';

    return FetchHelper.get(url);
}

const getExercise = (id) => {
    const url = `http://localhost:5000/api/exercise/${id}`;

    return FetchHelper.get(url);
}

const createExercise = (params) => {
    const url = 'http://localhost:5000/api/exercise/create';

    return FetchHelper.post(url, params);
}

const updateExercise = (params, id) => {
    const url = `http://localhost:5000/api/exercise/${id}`;

    return FetchHelper.post(url, params);
}

const deleteExercise = (id) => {
    const url = `http://localhost:5000/api/exercise/${id}`;

    return FetchHelper.delete(url);
}

const addCurrentExercise = (params) => {
    const url = 'http://localhost:5000/api/exercise/current/completed';

    return FetchHelper.post(url, params);
}

const getCurrentExercise = (params) => {
    const url = 'http://localhost:5000/api/exercise/current/show';

    return FetchHelper.post(url, params);
}

export default {
    getExercises,
    addCurrentExercise,
    getCurrentExercise,
    getExercise,
    deleteExercise,
    createExercise,
    updateExercise
}