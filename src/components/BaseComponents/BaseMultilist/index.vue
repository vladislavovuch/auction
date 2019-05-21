<template>
    <div class="base-multilist">
        <div class="selected-items">
            <button @click="toggle = !toggle">Toggle</button>
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

    .selected-items {

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
        transform-origin:top;
        overflow: hidden;
        transition:transform 0.3s ease-out; // note that we're transitioning transform, not height!
        height:auto;
    }

    .multilist-leave-active {
        /*-webkit-transition: prop time;*/
        /*-moz-transition: prop time;*/
        /*-ms-transition: prop time;*/
        /*-o-transition: prop time;*/
        transition: all .4s;
    }

</style>
