export default {
    methods: {
        validateForm() {
            return Promise.all(
                this.$children.map(item => {
                    return item.$validator.validateAll()
                        .then(result => {
                            if (!result) {
                                console.log(item.$validator.errors.items[0].field);
                                this.$el.querySelector('#' + item.$validator.errors.items[0].field).scrollIntoView({
                                    behavior: "smooth",
                                    block: "center",
                                });
                                return false;
                            } else {
                                return true;
                            }
                        })
                        .catch(err => console.error(err))
                }))
                .then(result => {
                    return result.filter(item => !item);
                })
        },
    }
}
