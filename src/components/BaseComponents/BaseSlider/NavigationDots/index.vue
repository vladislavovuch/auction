<template>
    <ul class="dots-list">
        <li class="dots-item" v-for="n in length" :key="n">
            <button
                    :data-index="n - 1"
                    :class="{'selected-item': selectedItemIndex === n - 1}"
                    @click="changeCurrentItem"
            ></button>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            length: {
                type: Number,
                required: true,
            },
            selectedItemIndex: {
                type: Number,
                required: true,
            }
        },
        methods: {
            changeCurrentItem(event) {
                this.$emit('change', event.target.dataset.index)
            }
        }
    }
</script>

<style scoped lang="scss">
    $size: 12px;
    button {
        width: $size;
        height: $size;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        border: none;
        outline: none;
        cursor: pointer;
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;

        &:hover {
            background-color: #afafaf;
        }
    }

    .selected-item {
        background-color: grey;
    }

    .dots-list {
        list-style: none;
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .dots-item {
        margin: 1rem .5rem;
    }
</style>
