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
                let value = event.target.value;
                /**
                 * delete all leading zeros
                 */
                if (this.type === 'number') {
                    value = parseInt(value, 10);
                }
                this.$emit('input', value);
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
        flex-direction: column;
        align-items: flex-start;
        padding-right: .4rem;
        input {
            width: 100%;
            max-width: 17rem;
            font-size: 1.2rem;
            padding: .1rem;
            line-height: 1em;
            height: 1.4rem;
        }
    }

    @media screen and (max-width: 400px){
        .base-field {
            flex-direction: column;
            p {
                text-align: left;
            }
        }
        .entry-field {
            width: calc(100% - 2rem);
            padding-left: 2rem;
        }
    }

</style>
