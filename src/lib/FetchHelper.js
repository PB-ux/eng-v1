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
    }
}