<template>
    <label for="">
        <p>
            <slot></slot>
        </p>
        <div class="entry-field">
            <textarea name="" id="" cols="30" rows="10">

            </textarea>
        </div>
    </label>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="scss">
    .base-field {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

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
                font-size: 1rem;
                padding: .1rem;
                /*line-height: 1em;*/
                height: 5rem;
                max-height: 10rem;
            }
        }

    }
</style>
