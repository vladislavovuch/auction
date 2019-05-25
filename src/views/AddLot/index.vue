<template>
    <div class="add-lot">
        <h2>Add your lot here</h2>
        <form @submit.prevent class="photo">
            <p>Upload lot`s photos</p>
            <div class="img-upload">
                 <span class="upload-btn" :title="`Max image - ${imageListMaxSize}`">
                     Upload image
                     <input id="file" type="file" accept="image/*" @input="uploadPhoto">
                </span>
                <!--input for file name-->
                <!--<input type="text" readonly>-->
            </div>
            <div class="images-list">
                <ul @click="removePhoto" :draggable="true">
                    <li
                            v-for="(elem, index) of imageList"
                            :key="index"
                            :id="index"
                            class="img-preview"
                    >
                        <img class="" :src="elem" alt="">
                        <button
                                class="img-cancel"
                                :data-index="index"
                        >
                            <svg aria-hidden="true" data-prefix="fas" data-icon="times"
                                 class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 352 512">
                                <path fill="#fff"
                                      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>

            <base-input>
                Lot name:
            </base-input>

            <base-input
                    type="number"
            >
                Start price:
            </base-input>
            <base-input>
                Minimal rate step
            </base-input>
            <base-input>
                Finish date:
            </base-input>
            <base-input>
                Lots number:
            </base-input>

            <!--<base-select>-->
            <!--Select delivery service-->
            <!--</base-select>-->
            <base-multilist class="base-multiselect">
            </base-multilist>

            <base-textarea>
                Detail lot description
            </base-textarea>

            <!--author contacts ?? auto substitution-->
            <base-input>
                Author name:
            </base-input>
            <base-input>
                Author telephone:
            </base-input>
            <base-input>
                Author email:
            </base-input>

            <div class="public-lot">
                <base-button>
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

    export default {
        components: {
            BaseInput,
            BaseButton,
            BaseSelect,
            BaseTextarea,
            BaseMultilist,
        },
        data() {
            return {
                imageList: [],
                imageListMaxSize: 5,
                postsList: [
                    'Нова пошта',
                    'Укр пошта',
                    'In time',
                    'Alliexpress',
                ],
            }
        },
        methods: {
            selectPosts(e) {
                console.log(e);
            },
            uploadPhoto(event) {
                if (this.isFullImageList) {
                    //show notification
                    this.showNotification(`You cant upload more than ${this.imageListMaxSize} images`);
                    return;
                }

                const target = event.target;
                if (!target.files.length) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = () => {
                    let dataUrl = reader.result;
                    // Vue reactivity doesnt support Set
                    if (this.imageList.includes(dataUrl) === false) {
                        this.imageList.push(dataUrl);
                    } else {
                        // show notification
                        this.showNotification("You have already selected this image");
                    }
                };
                reader.readAsDataURL(target.files[0])
            },
            removePhoto(event) {
                const currentTarget = event.currentTarget;
                const target = event.target;
                const selector = '.img-cancel';
                const btn = this.$closest(target, selector, currentTarget);
                if (btn && btn.dataset.index) {
                    const index = btn.dataset.index;
                    this.imageList.splice(index, 1)
                }
            },
            showNotification(msg) {
                alert(msg);
            }
        },
        mounted() {
            // this.imageList = new Set();
        },
        computed: {
            // imageArray() {
            //     return Array.from(this.imageList)
            // },
            isFullImageList() {
                return this.imageList.length === this.imageListMaxSize;
            }
        }

    }
</script>

<style scoped lang="scss">
    %align_center {
        display: flex;
        justify-content: center;
    }

    .add-lot {
        width: calc(100% - 2rem);
        padding: 1rem;
    }

    .photo {
        width: 100%;
    }

    .img-upload {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 1rem;
    }

    .upload-btn {

        position: relative;
        padding: .5rem 1rem;
        border: 1px solid black;
        cursor: pointer;
        overflow: hidden;
        /*max-width: 120px;*/
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        input {
            position: absolute;
            top: 0;
            right: 0;
            min-width: 100%;
            min-height: 100%;
            font-size: 100px;
            text-align: right;
            /*filter: alpha(opacity=0);*/
            opacity: 0;
            outline: none;
            background: #fff;
            cursor: inherit;
            display: block;
            -webkit-transition: all .3s;
            -moz-transition: all .3s;
            -ms-transition: all .3s;
            -o-transition: all .3s;
            transition: all .3s;
        }

        &:hover {
            background-color: #ebebeb;
        }
    }

    .base-multiselect {
        max-width: 500px;
        margin: 0 auto;
        margin-top: 1rem;
    }

    .images-list {
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
                /*width: calc(100% - 2px);*/
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
    }


</style>
