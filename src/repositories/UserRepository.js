import FetchHelper from '../lib/FetchHelper';

const registration = (params) => {
    const url = 'http://localhost:5000/api/user/registration';

    return FetchHelper.post(url, params);
}

const login = (params) => {
    const url = 'http://localhost:5000/api/user/login';

    return FetchHelper.post(url, params);
}

const check = () => {
    const url = 'http://localhost:5000/api/user/auth';
    const options = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    return FetchHelper.get(url, options);
}

const uploadPhoto = (file) => {
    const url = 'http://localhost:5000/api/user/uploadPhoto';

    return FetchHelper.uploadFile(url, file);
}

const addPoints = (params) => {
    const url = 'http://localhost:5000/api/user/add/points';

    return FetchHelper.post(url, params);
}

export default {
    registration,
    login,
    check,
    uploadPhoto,
    addPoints
}