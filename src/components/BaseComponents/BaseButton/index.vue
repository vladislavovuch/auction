<template>
    <button @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script>
    export default {}
</script>

<style scoped lang="scss">
    button {
        padding: .5rem 2rem;
        font-size: 1.2rem;
        color: #fff;
        background-color: rgb(65, 184, 131);
        border: none;
        /*border-color: #007bff;*/
        /*border: 1px solid*/
        /*-webkit-border-radius: 1rem;*/
        /*-moz-border-radius: 1rem;*/
        /*border-radius: 1rem;*/
        outline: none;
        cursor: pointer;
        margin-top: 1rem;

        &:hover {
            background-color: rgb(59, 165, 117);
        }

    }
</style>
