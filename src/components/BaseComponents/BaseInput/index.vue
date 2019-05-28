<template>
    <div class="base-field__wrap">
        <label class="base-field">
            <p>
                <slot></slot>
            </p>
            <div class="entry-field">
                <input
                        :type="type"
                        :value="value"
                        @input="inputData"
                        :id="reference"
                        :ref="reference"
                        v-validate="validation"
                        :name="reference"
                        :min="min"
                        :max="max"
                />
                <span class="input-error error-msg">{{ errors.first(reference) }}</span>
            </div>
        </label>

    </div>
</template>

<script>
    export default {
        inject: ['$validator'],
        inheritAttrs: false,
        props: {
            type: {
                type: String,
                default: 'text'
            },
            value: {
                required: true,
            },
            reference: {
                required: true,
                type: String,
            },
            validation: {
                type: [Object, String],
                default: 'required'
            },
            min: {
                type: [String],
            },
            max: {
                type: [String],
            },
        },
        methods: {
            inputData(event) {
                // this.value = event.target.value;
                this.$emit('input', event.target.value);
            }
        }
    }
</script>

<style scoped lang="scss">
    .base-field__wrap {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-top: 1rem;
    }

    .base-field {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;

        p {
            width: 100%;
            text-align: right;
            padding-right: 1rem;
            line-height: 2rem;
        }
    }

    .entry-field {
        width: 100%;
        display: flex;
        /*justify-content: flex-start;*/
        flex-direction: column;
        align-items: flex-start;

        input {
            width: 100%;
            max-width: 17rem;
            font-size: 1.2rem;
            padding: .1rem;
            line-height: 1em;
            height: 1.4rem;
        }
    }

    .input-error {
        /*padding-left: calc(50% + 1rem);*/
        /*text-align: left;*/
    }
</style>
