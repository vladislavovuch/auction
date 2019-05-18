<template>
    <!--index can cause some problems during filtering or sorting-->
    <div class="lot_preview" :id="user.id">
        <div class="lot_image">
            <!--<img :src="require(user.img.url)" :alt="user.img.alt">-->
            <img :src="user.img.url"/>
            {{user.img.url}}
            <!--<img src="../../assets/stages.jpg" :alt="user.img.alt">-->
        </div>
        <div class="description">
            <h2>
                {{user.description.title}}
            </h2>
            <p class="finish_date">
                Finish date: {{user.description.finishDate}}
            </p>
            <p class="price">
                Current price: {{user.description.price}}
            </p>
            <!--<a :href="'/lot-details' + user.id" @click.prevent="">
                Details >>
            </a>-->
        </div>
        <div class="author">
            Author: {{user.description.author}}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            user: {
                type: Object,
                required: true,
            },
            /*description: {
                type: String,
                default: "Lot number 1",
            },
            currentPrice: {
                type: Number,
                default: 11,
            },
            finishDate: {
                type: String,
            },
            id: {
                type: String,
                default: '1',
            }*/
        },
        computed: {
            formatFinishDate() {
                return this.finishDate.toLocaleString();
            }
        }
    }
</script>

<style scoped lang="scss">
    .lot_preview {
        width: 100%;
        max-width: 300px;
        /*border: 1px solid black;*/
        display: flex;
        border-top: 1px solid #ededed;
        border-bottom: 1px solid #ededed;
        border-right: 1px solid #ededed;
        padding: 1rem;
        flex-direction: column;
        /*margin: .1rem .1rem 0;*/
        position: relative;
        justify-content: center;
        -webkit-box-shadow: 1px 1px #000;
        -moz-box-shadow: 1px 1px #000;
        box-shadow: 1px 1px 5px #000;

        &:hover {
            cursor: pointer;

            .author {
                /*display: block;*/
                opacity: 1;
            }

            .lot_image {
                img {
                    transform: scale(1.1);
                }
            }
        }
    }

    .lot_image {
        width: 100%;
        /*padding-right: 1rem;*/
        display: flex;
        align-items: center;
        overflow: hidden;

        img {
            width: 100%;
            height: auto;
            object-fit: cover;
            -webkit-transition: all .3s;
            -moz-transition: all .3s;
            -ms-transition: all .3s;
            -o-transition: all .3s;
            transition: all .3s;
        }
    }

    .description {
        width: 100%;
        margin-top: 1rem;

        h2 {
            line-height: 1.5em;
            clear: both;
        }

        p {
            text-align: left;
            line-height: 1.5em;
            padding-left: 2rem;
            clear: both;
        }

        a {
            float: right;
        }
    }

    .author {
        position: absolute;
        bottom: -2rem;
        /*display: none;*/
        padding: 1rem 0;
        text-align: center;
        width: calc(100% - 2rem);
        z-index: 2;
        opacity: 0;
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;
        background-color: #fff;
    }
</style>
