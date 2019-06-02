<template>
    <div class="base-field__wrap">
        <label for="" class="base-field">
            <p>
                <slot></slot>
            </p>
            <div class="entry-field">
                <textarea
                        :value="value"
                        @input="enterData"
                        :ref="reference"
                        :id="reference"
                        v-validate="validation"
                        :name="reference"
                >
                </textarea>
            </div>
        </label>
        <span class="textarea-error error-msg">{{ errors.first(reference) }}</span>
    </div>
</template>

<script>
    export default {
        inject: ['$validator'],
        props: {
            value: {
                type: String,
                required: true,
            },
            reference: {
                required: true,
                type: String,
            },
            validation: {
                type: [Object, String],
                default: () => {
                    return {
                        required: true,
                        max: 500,
                    }
                }
            }
        },
        methods: {
            enterData(event) {
                this.$emit('input', event.target.value)
            }
        }
    }
</script>

<style scoped lang="scss">
    .base-field__wrap {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .textarea-error {
        margin-top: .2rem;
        padding-left: calc(50% + .5rem);
    }

    .base-field {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;

        p {
            width: 100%;
            text-align: right;
            padding-right: 1rem;
        }
    }

    .entry-field {
        width: 100%;
        display: flex;
        justify-content: flex-start;

        textarea {
            width: 100%;
            max-width: 17rem;
            font-size: 1rem;
            padding: .1rem;
            /*line-height: 1em;*/
            height: 5rem;
            resize: vertical;
            /*min-width: 10rem;*/
            max-height: 25rem;
            min-height: 2rem;
        }
    }

    @media screen and (max-width: 400px) {
        .base-field {
            flex-direction: column;

            p {
                text-align: left;
            }
        }
        .entry-field {
            width: calc(100% - 2rem);
            padding-left: 2rem;

            textarea {
                margin-top: .3em;
            }
        }

        .textarea-error {
            width: calc(100% - 2rem);
            padding-left: 2rem;
        }
    }
</style>
