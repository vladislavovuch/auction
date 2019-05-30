<template>
    <!--index can cause some problems during filtering or sorting-->
    <div class="lot_preview" :id="lot.id">
        <div class="lot_image">
            <!--<img :src="require(lot.img.url)" :alt="lot.img.alt">-->
            <img :src="lot.img.url"/>
            {{lot.img.url}}
            <!--<img src="../../assets/stages.jpg" :alt="lot.img.alt">-->
        </div>
        <div class="description">
            <h2 class="lot_name">
                {{lot.title}}
            </h2>
            <p class="finish_date">
                Finish date: {{lot.finishDate}}
            </p>
            <div class="price_wrap">
                <span class="price_title">
                    Current price:
                </span>
                <span class="price">
                   {{lot.price}}
                </span>
            </div>
            <!--<a :href="'/lot-details' + lot.id" @click.prevent="">
                Details >>
            </a>-->
        </div>
        <div class="author">
            Author: {{lot.author}}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            lot: {
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
        },
        created() {
            console.log(this.lot)
        }
    }
</script>

<style scoped lang="scss">
    .lot_preview {
        width: 100%;
        max-width: 300px;
        margin: 1.3rem .8rem 0;
        border: 1px solid #cacaca;
        display: flex;
        padding: 1rem;
        flex-direction: column;
        justify-content: center;
        transition: .3s;
        cursor: pointer;
        &:hover {

            border-color: #89c202;
            -webkit-box-shadow: 0px 0px 13px 0px #a8a8a8;
            -moz-box-shadow: 0px 0px 13px 0px #a8a8a8;
            box-shadow: 0px 0px 13px 0px #a8a8a8;

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
    }


    .lot_name {
        line-height: 1.5em;
        color: #2c2c2c;
    }

    .finish_date {
        text-align: center;
        line-height: 1.5em;
        color: #2c2c2c;
    }

    .price__wrap {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .price_title {
        color: #b5b5b5;
        font-size: 17px;
        font-weight: 400;
        margin-right: 14px;
    }

    .price {
        color: #89c202;
        font-size: 22px;
        font-weight: 400;
        width: 100%;
        word-break: break-all;
    }

    .author {
        /*display: none;*/
        padding: 1rem 0;
        text-align: center;
        /*width: 100%;*/
        // margin-left: -1rem;
        z-index: 2;
        /*opacity: 0;*/
        background-color: #fff;
    }
</style>
