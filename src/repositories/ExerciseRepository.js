import FetchHelper from '../lib/FetchHelper';

const getExercises = () => {
    const url = 'http://localhost:5000/api/exercise/show';

    return FetchHelper.get(url);
}

export default {
    getExercises
}