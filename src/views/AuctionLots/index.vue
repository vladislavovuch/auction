<template>
    <div class="auction-lots">
        <bread-crumbs class="bread-crumbs"></bread-crumbs>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import BreadCrumbs from '../../components/BreadCrumbs'
    export default {
        components: {
            BreadCrumbs,
        },
    }
</script>

<style scoped lang="scss">
    .auction-lots {
        width: 100%;
        position: relative;
    }
</style>
