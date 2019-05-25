<template>
    <div class="base-multilist">
        <div class="selected-items__wrap">
            <div class="selected-items" @click="removeSelectedItem">
                <span v-for="(item, index) in selectedItems" :key="index" class="selected-item">
                    {{item.text}}
                    <button class="btn-remove" :data-index="index">
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
                </span>
            </div>
            <button class="btn-toggle" @click="toggleList">
                <svg
                        :class="{'opened-list': isShownList}"
                        aria-hidden="true"
                        data-prefix="fas"
                        data-icon="angle-down"
                        class="svg-inline--fa fa-angle-down fa-w-10"
                        role="img" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512">
                    <path
                            fill="currentColor"
                            d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4
                             96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4
                              24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
                    >
                    </path>
                </svg>
            </button>
        </div>
        <transition name="multilist">
            <ul class="multiselect" v-if="isShownList">
                <li v-for="(elem, index) in multiList" :key="index" class="list-item">
                    <label class="list-item-label">
                        <input type="checkbox" :checked="elem.selected" @change="selectItem(index)">
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
                isShownList: false,
                multiList: null,
            }
        },
        props: {
            /**
             * Get strings array
             */
            list: {
                required: true,
                type: Array,
            },
        },
        computed: {
            selectedItems() {
                return this.multiList.filter(item => {
                    return item.selected;
                });
            },
            /**
             * sendedItems - Array with Strings items
             */
            sendedItems() {
                return this.selectedItems.map(item => item.text);
            }
        },
        methods: {
            toggleList() {
                this.isShownList = !this.isShownList;
            },
            removeSelectedItem(event) {
                const target = event.target;
                const currentTarget = event.currentTarget;
                const btn = this.$closest(target, '.btn-remove', currentTarget);
                if (btn && btn.dataset.index) {
                    const index = btn.dataset.index;
                    this.unselectListItem(index);
                }
            },
            unselectListItem(index) {
                console.log('Unselect ', index);
                this.$set(this.selectedItems[index], 'selected', false);
                this.saveSelectedItems();
            },
            selectItem(index) {
                this.$set(this.multiList[index], 'selected', !this.multiList[index].selected);
                this.saveSelectedItems();
            },
            saveSelectedItems() {
                this.$emit('select-items', this.sendedItems);
            }
        },
        created() {
            /**
             * array with parent text and structure for selecting and unselecting elements
             */
            this.multiList = this.list.map(elem => {
                return {
                    text: elem,
                    selected: false,
                }
            });
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
        margin-top: 1rem;
    }

    .opened-list {
        -webkit-transform: rotate(-180deg);
        -moz-transform: rotate(-180deg);
        -ms-transform: rotate(-180deg);
        -o-transform: rotate(-180deg);
        transform: rotate(-180deg);
    }

    .remove-selected-item {

    }

    .selected-items__wrap {
        width: 100%;
        display: flex;
        justify-content: center;
        border: 1px solid grey;
        /*max-width: 500px;*/
    }

    .selected-items {
        display: flex;
        flex-wrap: wrap;
        padding: 0 .5rem .5rem;
        width: 100%;
        min-height: 2.2rem;
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
        border: none;
        outline: none;
        padding: 0 1rem;
        cursor: pointer;

        svg {
            float: left;
            width: 14px;
            height: 15px;
            /* width: 100%; */
            margin: 0;
            padding: 0;
            -webkit-transition: all .3s;
            -moz-transition: all .3s;
            -ms-transition: all .3s;
            -o-transition: all .3s;
            transition: all .3s;
        }

        path {
            float: left;
            width: 100%;
        }
    }

    .btn-remove {
        border: none;
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
        padding: 2px;
        margin-left: 5px;
        margin-right: 5px;
        cursor: pointer;

        svg {
            float: left;
            width: 100%;
            height: 100%;
            /* width: 100%; */
            margin: 0;
            padding: 0;
            -webkit-transition: all .3s;
            -moz-transition: all .3s;
            -ms-transition: all .3s;
            -o-transition: all .3s;
            transition: all .3s;
        }

        path {
            float: left;
            width: 100%;
        }
    }

    .multiselect {
        list-style: none;
        /*padding: .5rem 1rem;*/
        border: 1px solid grey;
        border-top: none;
        width: 100%;


    }

    .list-item {
        width: 100%;
        border-top: 1px solid grey;
        &:first-child {
            border-top: none;
        }
    }

    .list-item-label {
        width: calc(100% - 1rem);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: .5rem .5rem;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        p {
            line-height: 1em;
        }
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
        transform: scale(0);
    }

    .multilist-enter-active {
        /*transition: all .4s;*/
        transform-origin: top;
        overflow: hidden;
        transition: transform 0.3s ease-out;
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
