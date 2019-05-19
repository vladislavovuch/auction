<template>
    <div class="add-lot">
        <h2>Add your lot here</h2>
        <form @submit.prevent class="photo">
            <p>Upload lot`s photos</p>
            <div class="photo-upload">
                 <span class="upload-btn">
                     Upload
                     <input id="file" type="file" accept="image/*" @input="uploadPhoto">
                </span>
                <!--input for file name-->
                <!--<input type="text" readonly>-->
            </div>
            <div class="photo-preview">
                <ul>
                    <li v-for="(elem, index) in imageList" :key="index">
                        <img class="" :src="elem" alt="">
                        <div class="img_cancel">
                            <svg aria-hidden="true" data-prefix="fas" data-icon="times"
                                 class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 352 512">
                                <path fill="#fff"
                                      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                            </svg>
                        </div>
                    </li>
                </ul>
            </div>

            <base-input>
                Lot name:
            </base-input>

            <base-input>
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

            <base-select>
                Select delivery service
            </base-select>


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

    export default {
        components: {
            BaseInput,
            BaseButton,
            BaseSelect,
        },
        data() {
            return {
                imageList: []
            }
        },
        methods: {
            uploadPhoto(event) {
                const target = event.target;
                // debugger;
                const reader = new FileReader();
                reader.onload = () => {
                    let dataUrl = reader.result;
                    this.imageList.push(dataUrl);
                }
                reader.readAsDataURL(target.files[0])
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
        width: 100%;
    }

    .photo {
        width: 100%;
    }

    .photo-upload {
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
        }
    }

    .photo-preview {
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
            @extend %align_center;

            img {
                width: 100%;
                height: auto;
                object-fit: contain;
                max-height: 250px;
                border: 1px dashed grey;
            }
        }

    }

    .img_cancel {
        position: absolute;
        top: -15px;
        right: -15px;
        float: left;
        width: 30px;
        height: 30px;
        z-index: 2;
        cursor: pointer;
        opacity: .9;
        background-color: red;
        @extend %align_center;
        align-items: center;

        svg {
            float: left;
            width: 25px;
            height: 25px;
        }
    }



</style>
