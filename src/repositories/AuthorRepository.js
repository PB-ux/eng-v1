import FetchHelper from '../lib/FetchHelper';

const getOnlyAuthors = () => {
    const url = 'http://localhost:5000/api/author/all';
    // Auth headers ?
    return FetchHelper.get(url);
}

export default {
    getOnlyAuthors,
}
