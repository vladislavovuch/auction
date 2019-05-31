<template>
    <label class="base-field">
        <p>
            <slot></slot>
        </p>
        <div class="entry-field">
            <select name="" id="" :value="value" @input="changeValue">
                <option :value="index" v-for="(item, index) in list" :key="index">{{item}}</option>
            </select>
        </div>
    </label>
</template>

<script>
    export default {
        props: {
            list:{
                required: true,
                type: Array,
            },
            value: {
                required: true,
                type: String,
            }
        },
        methods: {
            changeValue(event) {
                this.$emit('input', event.target.value);
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
        }

        select {
            padding: .1rem 1rem;
            font-size: 1.1rem;
            cursor: pointer;

            option {
                cursor: pointer;
            }
        }
    }
</style>
