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

export default {
    getBooks,
    getBook,
    getBooksCategory
}