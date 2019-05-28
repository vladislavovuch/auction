<template>
    <div class="add-lot">
        <h2>Add your lot here</h2>
        <form @submit.prevent class="photo" @input="">
            <p>Upload lot`s photos</p>
            <image-upload
                    @upload-image="uploadImage"
                    :disabled="isFullImageList"
                    :max="imageListMaxSize"
            >
            </image-upload>

            <image-preview @remove-image="removeImage" :imagesPreviewList="imagesPreviewList">
            </image-preview>

            <base-input v-model="lot.title">
                Lot name:
            </base-input>

            <base-input type="number" v-model="lot.price">
                Start price:
            </base-input>

            <base-input type="number" v-model="lot.minStep">
                Minimal rate step
            </base-input>
            <base-input type="date" v-model="lot.finishDate">
                Finish date:
            </base-input>
            <base-input type="number" v-model="lot.lotsNumber">
                Lots number:
            </base-input>

            <base-multilist
                    class="base-multiselect"
                    :list="postsList"
                    @select-items="selectPosts"
            >
            </base-multilist>

            <base-textarea v-model="lot.description">
                Detail lot description
            </base-textarea>

            <!--author contacts ?? auto substitution-->
            <base-input v-model="lot.author.name">
                Author name:
            </base-input>
            <base-input v-model="lot.author.contacts.phoneNumber">
                Author telephone:
            </base-input>
            <base-input v-model="lot.author.contacts.email">
                Author email:
            </base-input>

            <div class="public-lot">
                <base-button @click="publicLot">
                    Public lot
                </base-button>
            </div>
        </form>
    </div>
</template>

<script>
    import BaseInput from '../../components/BaseComponents/BaseInput'
    import BaseButton from '../../components/BaseComponents/BaseButton'
    import BaseSelect from '../../components/BaseComponents/BaseSelect'
    import BaseTextarea from '../../components/BaseComponents/BaseTextarea'
    import BaseMultilist from '../../components/BaseComponents/BaseMultilist'
    import ImageUpload from '../../components/ImageUpload'
    import ImagePreview from '../../components/ImageUpload/ImagePreview'

    import * as firebase from "firebase/app";

    import {mapActions} from 'vuex'
    import ImageHandler from './mixins/ImageHandler'

    export default {
        mixins: [
            ImageHandler,
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
                id: null,
                imageListMaxSize: 5,
                publicedImages: 0,
                postsList: [
                    'Нова пошта',
                    'Укр пошта',
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
                'createNewLot',
                'getSpecificLot',
            ]),
            async publicLot() {
                console.log('Public lot');
                if (this.activeRequests) {
                    console.log()
                } else {

                }
                // this.$store.dispatch('createNewLot', this.lot);
            },
            selectPosts(e) {
                console.log(e);
            },
            showNotification(title, info = '') {
                this.$store.commit('toggleModalWindow', {title, info})
            }
        },
        computed: {
            isFullImageList() {
                return this.lot.imagesList.length === this.imageListMaxSize;
            },
            activeRequests() {
                return this.lot.imagesList.length !== this.imagesPreviewList.length;
            }
        },
        created() {
            this.lot.id = this.$uuid();
            this.getSpecificLot();
        }
    }
</script>

<style scoped lang="scss">
    .add-lot {
        width: calc(100% - 2rem);
        padding: 1rem;
    }

    .photo {
        width: 100%;
    }

    .base-multiselect {
        max-width: 500px;
        margin: 0 auto;
        margin-top: 1rem;
    }

</style>
