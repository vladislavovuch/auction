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
        background-color: #007bff;
        border-color: #007bff;
        -webkit-border-radius: 1rem;
        -moz-border-radius: 1rem;
        border-radius: 1rem;
        outline: none;
        cursor: pointer;
        margin-top: 1rem;

        &:hover {
            background-color: #0069d9;
            border-color: #0062cc;
        }

    }
</style>
