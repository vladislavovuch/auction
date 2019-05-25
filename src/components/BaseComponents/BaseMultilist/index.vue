<template>
    <div class="base-multilist">
        <div class="selected-items">

        </div>
        <ul class="multiselect">
            <li v-for="(elem, index) in list" :key="index">
                <h5 v-if="elem.subtitle">
                    {{elem.subtitle}}
                </h5>
                <label class="list-item">
                    <input type="checkbox" v-model="elem.selected">
                    <p>
                        {{elem.text}}
                    </p>
                </label>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [
                    {
                        text: 'Нова пошта',
                        selected: false,
                    },
                    {
                        text: 'Укр пошта',
                        selected: false,
                    },
                    {
                        text: 'In time',
                        selected: false,
                    },
                    {
                        text: 'Alliexpress',
                        selected: false,
                    },
                ]
            }
        }
    }
</script>

<style scoped lang="scss">
    .base-multilist {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .selected-items {

    }

    .multiselect {
        list-style: none;
    }

    .list-item {
        display: flex;

    }

</style>
