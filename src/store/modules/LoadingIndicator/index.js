export default {
    state: {
        isShownIndicator: false,
        msg: '',
    },
    getters: {
        isShownIndicator(state) {
            return state.isShownIndicator;
        },
        indicatorMsg(state) {
            return state.msg;
        }
    },
    mutations: {
        toggleIndicator(state, msg = 'Wait a little, data is uploading') {
            state.isShownIndicator = !state.isShownIndicator;
            state.msg = msg;
        }
    }
}
