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
            const imageUrl = await this.uploadImageIntoStorage(payload);

            if (imageUrl) {
                console.log("SAVE IMAGE INTO LIST");
                this.lot.imagesList.push({
                    url: imageUrl,
                    name,
                });
            } else {
                // notification that request failed
                this.showNotification('Failed to upload image', 'Try later');
            }
            console.log('Get image');
            console.dir(imageUrl);
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
