<template>
    <label for="" class="base-field">
        <p>
            <slot></slot>
        </p>
        <div class="entry-field">
            <textarea :value="value" @input="$emit('input', $event.target.value)">
            </textarea>
        </div>
    </label>
</template>

<script>
    export default {
        props: {
            value: {
                type: String,
                required: true,
            },
        },

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

            textarea {
                width: 100%;
                max-width: 17rem;
                font-size: 1rem;
                padding: .1rem;
                /*line-height: 1em;*/
                height: 5rem;
                max-height: 10rem;
                min-height: 2rem;
            }
        }

    }
</style>
