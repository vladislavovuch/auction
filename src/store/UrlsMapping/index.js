const BASE_URL = 'http://localhost:3000/';

function getLotsPreviewUrl() {
    return `LotsPreview/`;
}

function lotsDetailsUrl(id) {
    return 'LotsDetails/' + id;
}

function postLotsPreviewUrl(id) {
    return `LotsPreview/${id}`;
}

export default {
    lotsDetailsUrl,
    postLotsPreviewUrl,
    getLotsPreviewUrl,
}
