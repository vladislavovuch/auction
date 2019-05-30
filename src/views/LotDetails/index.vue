<template>
    <div class="lot-details" v-if="lot">
        <!--images slider-->
        <div class="img-slider">
            <!--<img :src="lot.imagesList[0].url" alt="lot main picture">-->
            <base-slider :dots="lot.imagesList.length > 1" :arrows="lot.imagesList.length > 1">
                <img class="slider-image" v-for="(image, index) in lot.imagesList" :key="index" :src="image.url" alt="">
            </base-slider>
        </div>
        <h2>
            {{lot.title}}
        </h2>
        <div class="price">
            Current price: {{lot.price}}
        </div>
        <div class="delivery-service">
            <p>
                Delivery services:
            </p>
            <ul class="delivery-service-list">
                <li v-for="(item, index) in lot.deliveryServices" :key="index">
                    {{item}}
                </li>
            </ul>
        </div>
        <form @submit.prevent="">
            <div class="rate-wrap">
                <p>
                    minimal rate - {{minimalRate}}
                </p>
                <div class="rate">
                        <base-input
                                class="input-wrap"
                                type="number"
                                :value="this.rate.value"
                                @input="enterRate"
                                reference="rateInput"
                                :validation="{required: true, min_value: minimalRate}"
                        >
                            Make your rate:
                        </base-input>
                </div>
                <p class="error-msg rate-error" v-if="!isValid">
                    This field is invalid
                </p>
            </div>
            <div class="make-rate">
                <base-button type="submit" @click="sumbitRate">
                    Make rate
                </base-button>
            </div>
        </form>
        <div class="description">
            <span>
                Description:
            </span>
            <p>
                {{lot.description}}
            </p>
        </div>
    </div>
</template>

<script>
    import BaseButton from '../../components/BaseComponents/BaseButton'
    import BaseInput from '../../components/BaseComponents/BaseInput'
    import BaseSlider from '../../components/BaseComponents/BaseSlider'
    import FormValidation from '../../mixins/FormValidation'

    export default {
        mixins: [
            FormValidation,
        ],
        data() {
            return {
                id: null,
                rate: {
                    value: '',
                    author: {
                        fullName: "noname",
                        nikname: 'vasia404',
                    },
                },
                isValid: true,
            }
        },
        components: {
            BaseButton,
            BaseSlider,
            BaseInput,
        },
        methods: {
            enterRate(value) {
                this.rate.value = value;
            },
            async sumbitRate() {
                try {
                    const errors = await this.validateForm();
                    if (errors.length === 0) {
                        this.lot.price = this.rate.value;
                        const payload = {
                            id: this.id,
                            rate: this.rate,
                            lot: this.lot,
                        };
                        this.$store.dispatch('makeRate', payload);
                        const msg = {
                            title: 'Your rate successfully accepted',
                            info: 'Thank you :)'
                        };
                        this.$store.commit('toggleModalWindow', msg);
                        this.rate.value = '';
                    }
                } catch (err) {
                    console.warn(err);
                }

            }
        },
        created() {
            console.log("Lot details created");
        },
        beforeCreate() {
            console.log('Before created lot details');
        },
        beforeMount() {
            console.log('Before mount');
            debugger;
            console.log(this.lot);
        },
        mounted() {
            console.log('Mounted');
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                console.log("Before route enter");
                console.log(to.params.id);
                vm.id = to.params.id;
                // const id =
                // if such lot isnt in store already
                if (vm.lot === undefined) {
                    // make request and get such lot
                    vm.$store.dispatch('getSpecificLot', to.params.id)
                }
            });
        },
        computed: {
            lot() {
                if (this.id) {
                    return this.$store.getters.getLot(this.id);
                }
            },
            minimalRate() {
                return +this.lot.minStep + +this.lot.price;
            },
        }
    }
</script>

<style scoped lang="scss">
    .lot-details {
        width: calc(100% - 4rem);
        padding: 2rem;
        font-size: 1.2rem;
        font-family: Calibri, sans-serif;
    }

    .img-slider {
        width: 100%;

        img {
            width: 100%;
            max-width: 1000px;
            height: 100%;
            max-height: 400px;
            -o-object-fit: cover;
            object-fit: contain;
        }
    }

    h2 {
        margin-top: 1rem;
        font-family: "Times New Roman", serif;
    }

    .price {
        width: 100%;
        margin-top: 1rem;
        colot: #89c202;
        word-break: break-all;
    }

    .delivery-service {
        width: 100%;
        display: flex;
        margin-top: 1rem;

        p {
            width: 100%;
            text-align: right;
            padding-right: 1rem;
        }
    }

    .delivery-service-list {
        width: 100%;
        list-style: none;

        li {
            width: 100%;
            list-style-type: none;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            &:before {
                content: '';
                background: url('../../assets/icons/check-solid.svg');
                background-repeat: no-repeat;
                width: 10px;
                height: 10px;
                top: 0;
                left: 0;
                padding-right: .5rem;
            }
        }
    }

    .rate-wrap {
        margin-top: 1rem;
        width: 100%;
        clear: both;

        > p {
            width: 50%;
            padding-left: 50%;
            text-align: left;
            /*float: right;*/
            /*padding-left: 1rem;*/
            margin-left: .5rem;
            font-size: 1rem;
        }
    }

    .input-wrap {
        margin-top: 0;
        label {
            margin-top: 0 !important;
        }
    }

    .rate {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        p {
            width: 100%;
            margin-right: 1rem;
            text-align: right;
        }

        /*input {*/
            /*font-size: 1.2rem;*/
            /*height: 1.2rem;*/
            /*max-width: 300px;*/
            /*padding: .15rem;*/
        /*}*/

    }

    /*.input-wrap {*/
        /*width: 100%;*/
        /*display: flex;*/
        /*justify-content: flex-start;*/
    /*}*/

    .invalid-input {
        border-color: #dc3545;
    }

    .error-msg {
        color: #dc3545;
        font-size: .9rem;
    }

    .make-rate {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 1rem;

        button {
            color: #fff;
            background-color: #007bff;
            border-color: #007bff;

            &:hover {
                background-color: #0069d9;
                border-color: #0062cc;
            }
        }
    }

    .description {
        line-height: 1.1em;
        margin-top: 1rem;
        text-align: left;
        font-size: 1rem;

        span {
            font-weight: bold;
            font-size: 1.1rem;
        }

        /*padding: 0.5rem 2rem;*/
    }

</style>
