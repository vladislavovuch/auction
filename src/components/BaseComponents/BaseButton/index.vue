<template>
    <button @click="emitClick">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        methods: {
            emitClick() {
                this.$emit('click');
            }
        }
    }
</script>

<style scoped lang="scss">
    button {
        padding: .5rem 2rem;
        font-size: 1.2rem;
        color: #fff;
        background-color: rgb(65, 184, 131);
        border: none;
        outline: none;
        cursor: pointer;
        margin-top: 1rem;

        &:hover {
            background-color: rgb(59, 165, 117);
        }
    }
</style>
