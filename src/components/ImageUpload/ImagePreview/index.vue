<template>
    <div class="images-list" :id="reference">
        <ul @click="removeImage">
            <li
                    v-for="(elem, index) of imagesPreviewList"
                    :key="index"
                    :id="index"
                    class="img-preview"
            >
                <img class="" :src="elem" alt="">
                <button
                        class="img-cancel"
                        :data-index="index"
                >
                    <svg
                            aria-hidden="true"
                            data-prefix="fas"
                            data-icon="times"
                            class="svg-inline--fa fa-times fa-w-11"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 352 512"
                    >
                        <path
                                fill="#fff"
                                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19
                                 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48
                                  0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48
                                   0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28
                                   256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24
                                    22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07
                                     100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28
                                      12.28-32.19 0-44.48L242.72 256z"
                        >
                        </path>
                    </svg>
                </button>
            </li>
        </ul>
        <input
                type="text"
                style="display: none"
                :value="imagesPreviewList[0]"
                v-validate="{required: true}"
                :name="reference"
        >
        <span class="error-msg">{{ errors.first(reference) }}</span>
    </div>
</template>

<script>
    export default {
        inject: ['$validator'],
        props: {
            imagesPreviewList: {
                type: Array,
                required: true,
            },
            reference: {
                required: true,
                type: [String, Object]
            }
        },
        methods: {
            removeImage(event) {
                this.$emit('remove-image', event);
            }
        }
    }
</script>

<style scoped lang="scss">
    .images-list {
        width: 100%;
    }

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
        display: flex;
        justify-content: center;
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
