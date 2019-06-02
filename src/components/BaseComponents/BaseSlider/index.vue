<template>
    <div class="base-slider">
        <div class="slider-wrap">
            <arrow-button
                    v-if="arrows"
                    arrow-type="left"
                    @click="prev"
            ></arrow-button>
            <div class="slider">
                <transition name="slider-content" ref="slider">
                    <vnodes :vnodes="currentItem" :id="currentIndex">
                    </vnodes>
                </transition>
            </div>
            <arrow-button
                    v-if="arrows"
                    arrow-type="right"
                    @click="next"
            ></arrow-button>
        </div>
        <div class="navigation-dots" v-if="dots">
            <navigation-dots
                    :length="list.length"
                    :selectedItemIndex="currentIndex"
                    @change="changeCurrentItem"
            >
            </navigation-dots>
        </div>
    </div>

</template>

<script>
    import NavigationDots from './NavigationDots'
    import ArrowButton from './ArrowButton'

    export default {
        data() {
            return {
                currentIndex: 0,
            }
        },
        props: {
            dots: {
                type: Boolean,
                default: true,
            },
            arrows: {
                type: Boolean,
                default: true,
            },
            autoPlay: {
                type: Number,
                default: null,
            }
        },
        methods: {
            next() {
                this.currentIndex++;
                if (this.currentIndex === this.list.length) {
                    this.currentIndex = 0;
                }
            },
            prev() {
                this.currentIndex--;
                if (this.currentIndex < 0) {
                    this.currentIndex = this.list.length - 1;
                }
            },
            changeCurrentItem(index) {
                this.currentIndex = +index;
            }
        },
        components: {
            ArrowButton,
            Vnodes: {
                functional: true,
                render: function (createElement, context) {
                    return createElement('div', {
                        key: context.props.id,
                        class: {'slider-item': true,}
                    }, [context.props.vnodes])
                }
            },
            NavigationDots,
        },
        computed: {
            currentItem() {
                return this.$slots.default[this.currentIndex];
            },
            list() {
                return this.$slots.default;
            },
        },
        mounted() {
            if (this.autoPlay) {
                setInterval(() => {
                    this.next();
                }, this.autoPlay)
            }
        }
    }
</script>

<style lang="scss">
    .base-slider {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        .slider-wrap {
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
        }

        .slider {
            position: relative;
            width: 100%;
            height: 100%;
            max-width: 100%;
            max-height: 100%;
            overflow: hidden;
        }

        .slider-item {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: -1;
        }

        .slider-content {

            z-index: -1;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            object-fit: contain;
        }

        .slider-content-enter {
            opacity: 0;
            /*transform: translateX(100%);*/
        }

        .slider-content-enter-to {
            opacity: 1;
        }

        .slider-content-leave {
            opacity: 1;

        }

        .slider-content-leave-to {
            opacity: 0;
            /*transform: translateX(-100%);*/
        }

        $time: 0.5s;
        .slider-content-leave-active {
            -webkit-transition: all $time linear;
            -moz-transition: all $time linear;
            -ms-transition: all $time linear;
            -o-transition: all $time linear;
            transition: all $time linear;
            /*opacity: 0;*/
        }

        .slider-content-enter-active {
            -webkit-transition: all $time linear;
            -moz-transition: all $time linear;
            -ms-transition: all $time linear;
            -o-transition: all $time linear;
            transition: all $time linear;
        }
    }




</style>
