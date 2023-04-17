export default {
    get(url) {
        return fetch(url)
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
        }).then(response => response).catch(e => console.log(e));
    }
}