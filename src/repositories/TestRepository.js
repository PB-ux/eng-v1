import FetchHelper from "../lib/FetchHelper";

export function getTest() {
    const url = 'http://localhost:5000';
    return FetchHelper.get(url);
}

