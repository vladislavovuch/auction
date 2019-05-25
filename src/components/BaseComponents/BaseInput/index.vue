<template>
    <label class="base-field">
        <p>
            <slot></slot>
        </p>
        <div class="entry-field">
            <input :type="type" :value="value" @input="inputData" />
        </div>
    </label>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'text'
            },
            value: {
                required: true,
            }
        },
        methods: {
            inputData(event) {
                // this.value = event.target.value;
                this.$emit('input', event.target.value)
            }
        }
    }
</script>

<style scoped lang="scss">
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

        .entry-field {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            input {
                width: 100%;
                max-width: 17rem;
                font-size: 1.2rem;
                padding: .1rem;
                line-height: 1em;
                height: 1.4rem;
            }
        }

    }
</style>
