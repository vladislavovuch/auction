<template>
    <div class="auction_lots" @click="showLotDetails">
        <lot-preview
                v-for="(user, index) in $store.state.lotsShortList"
                :key="index"
                :user="user"
        ></lot-preview>

    </div>
</template>

<script>
    import LotPreview from '../../components/LotPreview'

    export default {
        components: {
            LotPreview,
        },
        methods: {
            showLotDetails(event) {
                let target = event.target;
                const currentTarget = event.currentTarget;
                // чи доцільно перевіряти по класу?
                // можна перевіряти по наявності id into dataset, але id можуть бути і в інших елементів, клас - малоймовірно
                // чи немає простішого шляху ніж йти по циклу до батьківського тарджета
                while (target !== currentTarget) {
                    if (target.classList.contains('lot_preview')) {
                        console.log("Find target");
                        const id = target.id;
                        this.$router.push(`/lot-detailes-${id}`);
                        break;
                    }
                    console.dir(target);
                    target = target.parentNode;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .auction_lots {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>
