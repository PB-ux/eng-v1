import FetchHelper from '../lib/FetchHelper';

const getCategories = () => {
    const url = 'http://localhost:5000/api/category/show';
    // Auth headers ?
    return FetchHelper.get(url);
}

const getOnlyCategories = () => {
    const url = 'http://localhost:5000/api/category/all';
    // Auth headers ?
    return FetchHelper.get(url);
}


const getCategory = (id) => {
    const url = `http://localhost:5000/api/category/${id}`;

    return FetchHelper.get(url);
}

export default {
    getCategories,
    getCategory,
    getOnlyCategories,
}
