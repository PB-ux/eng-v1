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

const createCategory = (params) => {
    const url = `http://localhost:5000/api/category/create`;

    return FetchHelper.create(url, params);
}

const deleteCategory = (id) => {
    const url = `http://localhost:5000/api/category/delete/${id}`;

    return FetchHelper.delete(url);
}

const updateCategory = (id, params) => {
    const url = `http://localhost:5000/api/category/update/${id}`;

    return FetchHelper.patch(url, params);
}

export default {
    getCategories,
    getCategory,
    getOnlyCategories,
    deleteCategory,
    createCategory,
    updateCategory
}
