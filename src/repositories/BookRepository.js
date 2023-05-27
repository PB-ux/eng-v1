import FetchHelper from '../lib/FetchHelper';

const getBooks = () => {
    const url = 'http://localhost:5000/api/book/show';
    // Auth headers ?
    return FetchHelper.get(url);
}

const getBook = (id) => {
    const url = `http://localhost:5000/api/book/${id}`;

    return FetchHelper.get(url);
}

const getBooksCategory = (title) => {
    const url = `http://localhost:5000/api/book/category`;

    return FetchHelper.post(url, title);
}

const createBook = (params) => {
    const url = 'http://localhost:5000/api/book/create';

    return FetchHelper.create(url, params);
}

const deleteBook = (id) => {
    const url = `http://localhost:5000/api/book/delete/${id}`;

    return FetchHelper.delete(url);
}

const updateBook = (id, params) => {
    const url = `http://localhost:5000/api/book/update/${id}`;

    return FetchHelper.patch(url, params);
}

const setFavoriteBook = (params) => {
    const url = `http://localhost:5000/api/book/favorite`;

    return FetchHelper.post(url, params);
}

const getFavoriteBook = (params) => {
    const url = `http://localhost:5000/api/book/favorite/show`;

    return FetchHelper.post(url, params);
}

const deleteFavoriteBook = (params) => {
    const url = `http://localhost:5000/api/book/favorite/delete`;

    return FetchHelper.post(url, params);
}

const addCurrentBooks = (params) => {
    const url = 'http://localhost:5000/api/book/current';

    return FetchHelper.post(url, params);
}

const completedCurrentBooks = (params) => {
    console.log('params', params);
    const url = 'http://localhost:5000/api/book/current/completed';

    return FetchHelper.post(url, params);
}

const getCurrentBooks = (params) => {
    const url = 'http://localhost:5000/api/book/current/show';

    return FetchHelper.post(url, params);
}

export default {
    getBooks,
    getBook,
    getBooksCategory,
    createBook,
    deleteBook,
    updateBook,
    setFavoriteBook,
    getFavoriteBook,
    deleteFavoriteBook,
    addCurrentBooks,
    getCurrentBooks,
    completedCurrentBooks
}
