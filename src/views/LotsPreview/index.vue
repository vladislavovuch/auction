<template>
    <div class="preview-list__wrap" @click="showLotDetails">
        <lot-preview
                v-for="lot in $store.getters.lotsPreview"
                :key="lot.id"
                :lot="lot"
        ></lot-preview>
    </div>
</template>

<script>
    import LotPreview from '../../components/LotPreview'
    import BreadCrumbs from '../../components/BreadCrumbs'

    export default {
        components: {
            LotPreview,
            BreadCrumbs,
        },
        methods: {
            showLotDetails(event) {
                let target = event.target;
                const currentTarget = event.currentTarget;
                const selector = '.lot_preview';
                const lot = this.$closest(target, selector, currentTarget);
                if (lot) {
                    const id = lot.id;
                    this.$router.push({path: `/auction/lot-detailes-${id}`});
                }
            }
        },
        created() {
            this.$store.dispatch('getLotsPreview');
        },
        updated() {
            console.log("Updated");
        }
    }
</script>

<style scoped lang="scss">
    .auction-lots {
        width: 100%;

    }

    .preview-list__wrap {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>
