import FetchHelper from '../lib/FetchHelper';

const getTheories = () => {
    const url = 'http://localhost:5000/api/theory/show';

    return FetchHelper.get(url);
}

const getTheory = (id) => {
    const url = `http://localhost:5000/api/theory/${id}`;

    return FetchHelper.get(url);
}

const getLevelTheories = (params) => {
    const url = `http://localhost:5000/api/theory/level`;

    return FetchHelper.post(url, params);
}

const createTheory = (params) => {
    const url = 'http://localhost:5000/api/theory/create';

    return FetchHelper.create(url, params);
}

const updateTheory = (params, id) => {
    const url = `http://localhost:5000/api/theory/${id}`;

    return FetchHelper.patch(url, params);
}

const deleteTheory = (id) => {
    const url = `http://localhost:5000/api/theory/${id}`;

    return FetchHelper.delete(url);
}

export default {
    getTheories,
    getTheory,
    getLevelTheories,
    createTheory,
    updateTheory,
    deleteTheory
}