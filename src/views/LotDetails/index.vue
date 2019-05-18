<template>
    <div class="lot-details">
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
            <div class="rate">
                <p class="">
                    Make your rate:
                </p>
                <div class="input-wrap">
                    <p>
                        minimal rate - {{lot.min_rate}}
                    </p>
                    <input type="number">
                </div>

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
            }
        },
        /*props: {
            lot: {
                type: Object,
                require: true,
            },
        },*/
        created() {
            console.log("Lot details created");
        },
        beforeCreate(next) {
            console.log('Before created lot details')
        },
        beforeRouteEnter(to, from, next) {
            console.log("Before route enter");
            next(vm => {
                this.id = to.params.id;
            });
        },
        computed: {
            lot() {
                return this.$store.getters.getLot(this.id);
            }
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

    .rate {
        margin-top: 1rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        clear: both;

        p {
            width: 100%;
            margin-right: 1rem;
            text-align: right;
        }
    }

    .input-wrap {
        width: 100%;
        float: left;

        p {
            text-align: left;
            font-size: .8rem;
        }

        input {
            float: left;
            font-size: 1.1rem;
            height: 1.4rem;
        }
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
