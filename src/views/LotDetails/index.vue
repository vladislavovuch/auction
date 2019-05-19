<template>
    <div class="lot-details" v-if="lot">
        <!--images slider-->
        <div class="img-slider">
            <img src="../../assets/stages.jpg" alt="lot main picture">
        </div>
        <h2>
            Lot number 1
            {{lot.title}}
        </h2>
        <div class="price">
            Current price: {{lot.price}}
        </div>
        <form @submit.prevent="">
            <div class="rate-wrap">
                <p>
                    minimal rate - {{minimalRate}}
                </p>
                <div class="rate">
                    <p class="">
                        Make your rate:
                    </p>
                    <div class="input-wrap">
                        <input
                                type="number"
                                :value="rate"
                                @input="enterRate"
                                @blur="validateRate($event.target.value)"
                                :class="[isValid ? '' : 'invalid-input']"
                        >
                    </div>
                </div>
                <p class="error-msg rate-error" v-if="!isValid">
                    This field is invalid
                </p>
            </div>
            <div class="make-rate">
                <button type="submit">
                    Make rate
                </button>
            </div>
        </form>

        <div class="description">
            <span>
                Description:
            </span>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Architecto debitis dicta excepturi explicabo iusto nulla quo
                rerum veritatis voluptas. Blanditiis deserunt doloremque,
                fuga fugiat inventore modi sint! Culpa delectus doloribus et explicabo
                neque nisi quaerat repudiandae veritatis! Laboriosam, magnam quae!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Adipisci cum eos quibusdam quod sapiente vel? Consequuntur in quae quidem vel.
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: null,
                rate: '',
                isValid: true,
            }
        },
        methods: {
            enterRate(event) {
                this.rate = event.target.value;
            },
            validateRate(value) {
                // make invalid field
                this.isValid = !(value < this.minimalRate);
                return this.isValid;
            },
            sumbitRate() {
                if (this.validateRate(this.rate)) {
                    // make request and save data
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
        },
        mounted() {
            console.log('Mounted');
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                console.log("Before route enter");
                vm.id = to.params.id;
                // if such lot isnt in store already
                if (vm.lot === undefined) {
                    // make request and get such lot
                    vm.$store.dispatch('getLot', vm.id)
                }
            });
        },
        computed: {
            lot() {
                return this.$store.getters.getLot(this.id);
            },
            minimalRate() {
                return +this.lot.min_step + +this.lot.price;
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
            width: auto;
            max-width: 1000px;
            height: auto;
            max-height: 400px;
            object-fit: cover;
        }
    }

    h2 {
        margin-top: 1rem;
        font-family: "Times New Roman", serif;
    }

    .price {
        width: 100%;
        margin-top: 1rem;
    }

    .rate-wrap {
        margin-top: 1rem;
        width: 100%;
        clear: both;
        >p {
            width: 100%;
            padding-left: 50%;
            text-align: left;
            /*float: right;*/
            /*padding-left: 1rem;*/
            margin-left: .5rem;
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

        input {
             font-size: 1.2rem;
             height: 1.2rem;
             max-width: 300px;
             padding: .15rem;
         }

    }

    .input-wrap {
        width: 100%;
        display: flex;
        justify-content: flex-start;
    }

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
            padding: .5rem 2rem;
            font-size: 1.2rem;
            color: #fff;
            background-color: #007bff;
            border-color: #007bff;
            -webkit-border-radius: 1rem;
            -moz-border-radius: 1rem;
            border-radius: 1rem;
            outline: none;
            cursor: pointer;

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
