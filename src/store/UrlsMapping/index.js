const BASE_URL = 'http://localhost:3000/';

function getLotsUrl(id) {
    return `${BASE_URL}lotsDetails?id=${id}`;
}

function lotsDetailsUrl() {
    return `${BASE_URL}lotsDetails`;
}

function lotsPreviewUrl() {
    return `${BASE_URL}lotsShortList`;
}

export default {
    getLotsUrl,
    lotsDetailsUrl,
    lotsPreviewUrl,

}
