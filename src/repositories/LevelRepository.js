import FetchHelper from '../lib/FetchHelper';

const getLevels = () => {
    const url = 'http://localhost:5000/api/level/show';

    return FetchHelper.get(url);
}

export default {
    getLevels
}