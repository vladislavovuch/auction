import {mapActions} from 'vuex'

export default {
    methods: {
        ...mapActions({
            removeImageFromStorage: 'deleteImage',
            uploadImageIntoStorage: 'uploadImage',
            cancelRequest: 'cancel',
        }),
        createFilePreview(file) {
            const reader = new FileReader();
            reader.onload = () => {
                let dataUrl = reader.result;
                // Vue reactivity doesnt support Set
                if (this.imagesPreviewList.includes(dataUrl) === false) {
                    this.imagesPreviewList.push(dataUrl);
                    this.imageNumber++;
                    console.log('aAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
                    this.validateImage();
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
        async uploadImage(event) {
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
            this.validateImage();
        },
        findDeletedImageIndex(event) {
            const currentTarget = event.currentTarget;
            const target = event.target;
            const selector = '.img-cancel';
            const btn = this.$closest(target, selector, currentTarget);
            return btn && btn.dataset.index || -1;
        },
        validateImage() {
            /**
             * imagesPreviewList will update asynchrony
             */
            Promise.resolve()
                .then(() => {
                    console.log("Image validator");
                    this.$validator.validate('imagePreview');
                })
        }
    },
}
