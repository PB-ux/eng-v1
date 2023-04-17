import FetchHelper from "../lib/FetchHelper";

const registration = (params) => {
    const url = 'http://localhost:5000/api/user/registration';

    return FetchHelper.post(url, params);
}

const login = (params) => {
    const url = 'http://localhost:5000/api/user/login';

    return FetchHelper.post(url, params);
}

export default {
    registration,
    login
}