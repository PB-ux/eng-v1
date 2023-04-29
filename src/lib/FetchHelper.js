export default {
    get(url, options) {
        return fetch(url, options)
            .then(response => response.json())
            .catch(e => console.log(e));
    },

    post(url, params) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify(params)
        }).then(response => response.json()).catch(e => console.log(e));
    },

    createBook(url, params) {
        return fetch(url, {
            method: 'POST',
            body: params,
        }).then((res) => res.json()).catch((err) => console.log(err));
    },

    uploadFile(url, file) {
        return fetch(url, {
            method: 'POST',
            body: file,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((res) => res.json()).catch((err) => console.log(err));
    }
}