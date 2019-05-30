<template>
    <div class="image-upload">
        <div class="img-upload">
             <span :class="{'upload-btn': true, 'disabled': disabled}"
                   :title="max ? `Max image number - ${max}` : 'You can upload more photos'">
                 Upload image
                 <input id="file" type="file" accept="image/*" @input="uploadImage" :disabled="disabled">
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            disabled: {
                type: Boolean,
                default: false,
            },
            max: {
                type: Number,
                default: null
            }
        },
        methods: {
            uploadImage(event) {
                const target = event.target;
                if (!target.files.length) {
                    return;
                }
                this.$emit('upload-image', event);
            }
        }
    }
</script>

<style scoped lang="scss">
    .image-upload {

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

    .disabled {
        cursor: not-allowed;
        border-color: #929292;
        color: #636363;
        background-color: #f7f7f7;

        &:hover {
            background-color: #f7f7f7;
        }

    }
</style>
