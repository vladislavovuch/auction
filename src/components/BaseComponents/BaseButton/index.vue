<template>
    <button @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    button {
        outline: none;
        border: transparent;

    }
</style>
