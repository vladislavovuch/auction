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

    export default {
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
                request: null,
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
            ...mapActions({
                removeImageFromStorage: 'deleteImage',
                uploadImageIntoStorage: 'uploadImage',
                cancelRequest: 'cancel',
            }),
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
            createFilePreview(file) {
                const reader = new FileReader();
                reader.onload = () => {
                    let dataUrl = reader.result;
                    // Vue reactivity doesnt support Set
                    if (this.imagesPreviewList.includes(dataUrl) === false) {
                        this.imagesPreviewList.push(dataUrl);
                    } else {
                        this.showNotification("You have already selected this image",);
                    }
                };
                reader.readAsDataURL(file);
            },
            async saveImage(file) {
                const name = `image-${this.publicedImages++}`;
                const payload = {
                    file,
                    name,
                    uuid: this.lot.id
                };
                const request = this.uploadImageIntoStorage(payload);

                const image = await request
                    .then(async snapshot => {
                        try {
                            const url = await snapshot.ref.getDownloadURL();
                            return {
                                url,
                                name,
                            };
                        } catch (e) {
                            console.warn('Failed to read data urlW');
                            return null;
                        }
                        console.log('Uploaded a blob or file!');
                    })
                    .catch(err => {
                        console.warn(err);
                        return null;
                    });
                if (image) {
                    this.lot.imagesList.push(image);
                }
                console.log('Get image');
                console.dir(image);
            },
            async uploadImage(files) {
                console.log(files);
                if (this.isFullImageList) {
                    const msg = `You cant upload more than ${this.imageListMaxSize} images`;
                    const info = 'Delete any image or leave the list in this order';
                    this.showNotification(msg, info);
                    return;
                }

                const target = event.target;
                if (!target.files.length) {
                    return;
                }

                const file = target.files[0];
                this.createFilePreview(file);
                this.saveImage(file);
                // target.files[0] = null;
            },
            async removeImage(event) {
                const index = this.findDeletedImageIndex(event);
                if (index === -1) {
                    return;
                }

                /**
                 * get true if request canceled
                 * @type {Boolean}
                 */
                const canceled = await this.cancelRequest(index);
                if (!canceled) {
                    if (this.lot.imagesList[index] === undefined) {
                       /* console.log('Start watch');
                        const unwatch = this.$watch(this.lot.imagesList,
                            (newVal, oldVal) => {

                                if (newVal) {
                                    console.log(newVal);
                                    const payload = {
                                        name: this.lot.imagesList[index].name,
                                        uuid: this.lot.id,
                                    };
                                    console.log('Delete after time');
                                    this.$store.dispatch('deleteImage', payload);
                                    this.lot.imagesList.splice(index, 1);
                                    unwatch();
                                }

                            })*/
                       console.log('Cant cancel, try later');
                       return;
                    } else {
                        const payload = {
                            name: this.lot.imagesList[Number(index)].name,
                            uuid: this.lot.id,
                        };
                        this.removeImageFromStorage(payload);
                        this.lot.imagesList.splice(index, 1);
                    }
                }
                this.imagesPreviewList.splice(index, 1);
            },
            findDeletedImageIndex(event) {
                const currentTarget = event.currentTarget;
                const target = event.target;
                const selector = '.img-cancel';
                const btn = this.$closest(target, selector, currentTarget);
                return btn && btn.dataset.index || -1;
            },
            removeImageFromDb() {

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

  /*  .images-list {
        width: 100%;

        ul {
            width: 100%;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: center;
        }

        li {
            width: 100%;
            position: relative;
            max-width: 250px;
            list-style: none;
            margin: 2rem 1rem 0;
            max-height: 250px;
            height: 250px;
            background-color: #ddd;
            //@extend %align_center;

            img {

                width: auto;
                max-width: calc(100% - 2px);
                height: auto;
                object-fit: contain;
                max-height: 250px;
                border: 1px dashed grey;
                margin-top: 50%;
                transform: translateY(-50%);
            }
        }

    }

    .img-cancel {
        position: absolute;
        top: -15px;
        right: -15px;
        float: left;
        width: 30px;
        height: 30px;
        z-index: 2;
        cursor: pointer;
        opacity: .8;
        background-color: red;
        @extend %align_center;
        align-items: center;
        border: none;
        outline: none;
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;

        &:hover {
            opacity: 1;
        }

        svg {
            float: left;
            width: 25px;
            height: 25px;
        }
    }*/


</style>
