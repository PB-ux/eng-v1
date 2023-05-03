import FetchHelper from '../lib/FetchHelper';

const getAuthor = (id) => {
    const url = `http://localhost:5000/api/author/${id}`;

    return FetchHelper.get(url);
}

const getOnlyAuthors = () => {
    const url = 'http://localhost:5000/api/author/all';
    // Auth headers ?
    return FetchHelper.get(url);
}

const createAuthor = (params) => {
    const url = 'http://localhost:5000/api/author/create';

    return FetchHelper.create(url, params);
}

const deleteAuthor = (id) => {
    const url = `http://localhost:5000/api/author/delete/${id}`;

    return FetchHelper.delete(url);
}

const updateAuthor = (id, params) => {
    const url = `http://localhost:5000/api/author/update/${id}`;

    return FetchHelper.patch(url, params);
}

export default {
    getOnlyAuthors,
    deleteAuthor,
    getAuthor,
    updateAuthor,
    createAuthor
}
