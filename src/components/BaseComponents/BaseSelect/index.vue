<template>
    <label class="base-field">
        <p>
            <slot></slot>
        </p>
        <div class="entry-field">
            <select multiple name="" id="">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
            </select>
        </div>
    </label>
</template>

<script>
    export default {
        props: {

        }
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


        }

    }
</style>
