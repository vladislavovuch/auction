const BASE_URL = 'http://localhost:3000/';

function lotsPreviewUrl() {
    return `LotsPreview/`;
}

function lotsDetailsUrl(id) {
    return 'LotsDetails/' + id;
}

export default {
    lotsDetailsUrl,
    lotsPreviewUrl,
}
