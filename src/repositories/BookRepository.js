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

    return FetchHelper.createBook(url, params);
}

const deleteBook = (id) => {
    const url = `http://localhost:5000/api/book/delete/${id}`;

    return FetchHelper.delete(url);
}

const updateBook = (id, params) => {
    const url = `http://localhost:5000/api/book/update/${id}`;

    return FetchHelper.patch(url, params);
}

export default {
    getBooks,
    getBook,
    getBooksCategory,
    createBook,
    deleteBook,
    updateBook
}
