
import BaseInput from '../../components/BaseComponents/BaseInput'
import BaseButton from '../../components/BaseComponents/BaseButton'
import BaseSelect from '../../components/BaseComponents/BaseSelect'
import BaseTextarea from '../../components/BaseComponents/BaseTextarea'
import BaseMultilist from '../../components/BaseComponents/BaseMultilist'
import ImageUpload from '../../components/ImageUpload'
import ImagePreview from '../../components/ImageUpload/ImagePreview'

import {mapActions} from 'vuex'
import ImageHandler from './mixins/ImageHandler'
import FormValidation from '../../mixins/FormValidation'

export default {
    mixins: [
        ImageHandler,
        FormValidation,
    ],
    components: {
        BaseInput,
        BaseButton,
        BaseSelect,
        BaseTextarea,
        BaseMultilist,
        ImageUpload,
        ImagePreview,
    },
    data() {
        return {
            imageNumber: 0,
            ukrTextValidation: {
                regex: /^[А-Яа-я іїєґ,.]+$/i,
                required: true,
            },
            phoneNumber: {
                required: true,
                regex: /^[+0-9 -]{13,17}$/
            },
            numbersValidation: {
                required: true,
                numeric: true,
                min_value: 1,
            },
            id: null,
            imageListMaxSize: 5,
            publicedImages: 0,
            deliveryServicesList: [
                'Nova poshta',
                'Urk poshta',
                'In time',
                'Alliexpress',
            ],
            imagesPreviewList: [],
            // request: null,
            lot: {
                title: "",
                imagesList: [],
                description: '',
                price: 0,
                minStep: 0,
                finishDate: '',
                lotsNumber: 1,
                deliveryServices: [],
                author: {
                    name: "Jon Show",
                    contacts: {
                        email: "12345crazysailer@gmail.com",
                        phoneNumber: "+380969913199"
                    }
                }
            },
        }
    },
    methods: {
        ...mapActions([
            'sendLotData',
            'getSpecificLot',
        ]),
        async publicLot() {
            console.log('Public lot');
            return this.validateForm()
                .then(result => {
                    if (result.length === 0) {
                        if (this.activeRequests) {
                            this.publicLotAfterImageUpload();
                        } else {
                            console.log('Saving lots');
                            this.createNewLot(this.lot);
                        }
                    }
                })
                .catch(err => console.error(err))
        },
        publicLotAfterImageUpload() {
            console.log('Active request');
            const msg = 'Wait a little, images are still uploading';
            this.$store.commit('toggleIndicator', msg);
            const unwatch = this.$watch(() => {
                    return this.activeRequests
                }, (newValue, oldValue) => {
                    if (newValue === false) {
                        this.$store.commit('toggleIndicator');
                        this.createNewLot(this.lot);
                        unwatch();
                    }
                }
            );
        },
        async createNewLot(lot) {
            try {
                this.$store.commit('toggleIndicator', 'We process the entered data');
                await this.sendLotData(lot);
                console.log('After data sending');
                this.$router.push('/successful-publishment');
            } catch (e) {
                this.$store.commit('toggleModalWindow', {title: e});
                console.warn(e);
            } finally {
                this.$store.commit('toggleIndicator');
            }
        },
        selectPosts(data) {
            console.log(data);
            this.lot.deliveryServices = data;
        },
        showNotification(title, info = '') {
            this.$store.commit('toggleModalWindow', {title, info})
        },
        formatDate(date) {
            return ('0' + date).slice(-2);
        }
    },
    computed: {
        isFullImageList() {
            return this.imagesPreviewList.length >= this.imageListMaxSize;
        },
        activeRequests() {
            return this.lot.imagesList.length !== this.imagesPreviewList.length;
        },
        minDate() {
            const currentDate = new Date();
            const minDate = new Date(currentDate.setDate(currentDate.getDate() + 2));
            const year = minDate.getFullYear();
            const month = this.formatDate(minDate.getMonth() + 1);
            const date = this.formatDate(minDate.getDate());
            const min = `${year}-${month}-${date}`;
            return min;
        },
        maxDate() {
            const currentDate = new Date();
            const deadlineDate = new Date(currentDate.setDate(currentDate.getDate() + 10));
            const year = deadlineDate.getFullYear();
            const month = this.formatDate(deadlineDate.getMonth() + 1);
            const date = this.formatDate(deadlineDate.getDate());
            const max = `${year}-${month}-${date}`;
            return max;
        }
    },
    created() {
        this.lot.id = this.$uuid();
        this.getSpecificLot();
    }
}
