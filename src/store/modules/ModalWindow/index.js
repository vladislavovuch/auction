export default {
    state: {
        isShownModal: false,
        msg: {
            title: '',
            info: '',
        }
    },
    getters: {
        isShownModal(state) {
            return state.isShownModal;
        },
        modalMsg(state) {
            return state.msg;
        }
    },
    mutations: {
        toggleModalWindow(state, {title = 'Something went wrong', info ='Try later or reload page'}) {
            state.isShownModal = !state.isShownModal;
            state.msg.title = title;
            state.msg.info = info;
        }
    }
}
