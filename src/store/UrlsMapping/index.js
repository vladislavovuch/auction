const BASE_URL = 'http://localhost:3000/';

function getLotsUrl(id) {
    return `${BASE_URL}lotsDetails?id=${id}`;
}

export default {
    getLotsUrl,
}
