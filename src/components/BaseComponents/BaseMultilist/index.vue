<template>
    <div class="base-multilist">
        <div class="selected-items__wrap">
            <div class="selected-items">
                <span v-for="(item, index) in selectedItems" :key="index" class="selected-item">
                    {{item.text}}
                    <button class="btm-remove">
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
                                    fill="currentColor"
                                    d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z">
                            </path>
                        </svg>
                    </button>
                </span>
                <button class="btn-toggle" @click="toggle = !toggle">Toggle</button>
            </div>

        </div>
        <transition name="multilist">
            <ul class="multiselect" v-if="toggle">
                <li v-for="(elem, index) in list" :key="index">
                    <h5 v-if="elem.subtitle">
                        {{elem.subtitle}}
                    </h5>
                    <label class="list-item">
                        <input type="checkbox" v-model="elem.selected">
                        <p>
                            {{elem.text}}
                        </p>
                    </label>
                </li>
            </ul>
        </transition>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                toggle: false,
                list: [
                    {
                        text: 'Нова пошта',
                        selected: false,
                    },
                    {
                        text: 'Укр пошта',
                        selected: false,
                    },
                    {
                        text: 'In time',
                        selected: false,
                    },
                    {
                        text: 'Alliexpress',
                        selected: false,
                    },
                ]
            }
        },
        computed: {
            selectedItems() {
                return this.list.filter(item => {
                    return item.selected;
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .base-multilist {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    .remove-selected-item {

    }

    .selected-items__wrap {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .selected-items {
        border: 1px solid grey;
        display: flex;
        flex-wrap: wrap;
        padding: 0 .5rem .5rem;
        width: 100%;
        max-width: 650px;
        min-height: 2rem;
    }

    .selected-item {
        display: flex;
        align-items: center;
        border: 1px solid gainsboro;
        margin: .5rem .5rem 0;
        padding: .2rem 0 .2rem .3rem;
        -webkit-box-shadow: .1rem .1rem .3rem #000;
        -moz-box-shadow: .1rem .1rem .3rem #000;
        box-shadow: .1rem .1rem .2rem #333;
    }

    .btn-toggle {
        border:none;
        outline: none;
        height: 100%;
        /*max*/
    }

    .btm-remove {
        border:none;
        outline: none;
        height: 15px;
        width: 15px;
        background-color: rgb(70, 66, 66);
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1px;
        margin-left: 5px;
        margin-right: 5px;
        /* padding-top: 2px;
        padding-bottom: 2px; */
        cursor: pointer;
    }

    svg {
        float: left;
        width: 11px;
        height: 11px;
        /* width: 100%; */
        margin: 0;
        padding: 0;
    }
    path {
        float: left;
        width: 100%;
    }

    .multiselect {
        list-style: none;
    }

    .list-item {
        display: flex;

    }

    .multilist-enter {
        /*height: 0;*/
        /*opacity: 0;*/
        transform: scaleY(0);
    }

    .multilist-enter-to {
        transform: scaleY(1);
        /*opacity: 1;*/
    }

    .multilist-leave {
        /*height: 100px;*/
    }

    .multilist-leave-to {
        height: 0;
        opacity: 0;
        transform: translateX(50px);
    }

    .multilist-enter-active {
        /*transition: all .4s;*/
        transform-origin: top;
        overflow: hidden;
        transition: transform 0.3s ease-out; // note that we're transitioning transform, not height!
        height: auto;
    }

    .multilist-leave-active {
        /*-webkit-transition: prop time;*/
        /*-moz-transition: prop time;*/
        /*-ms-transition: prop time;*/
        /*-o-transition: prop time;*/
        transition: all .4s;
    }

</style>
