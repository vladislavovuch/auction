<template>
    <div class="successful-publishment">
        <div class="image__wrap">
            <img src="../../assets/successful.png" alt="Successful inscription">
        </div>
        <h2>
            Lot has been successfully publishment.
        </h2>
        <base-button @click="gotoAddLotPage" class="btn-publish">
            Publish more lots
        </base-button>
    </div>
</template>

<script>
    import BaseButton from '../../components/BaseComponents/BaseButton'

    export default {
        components: {
            BaseButton,
        },
        methods: {
            gotoAddLotPage() {
                this.$router.push('/add-lot');
            }
        }
    }
</script>

<style scoped lang="scss">
    .successful-publishment {
        width: 100%;
        padding-top: 50px;
    }

    .image__wrap {
        width: 100%;
        display: flex;
        justify-content: center;
        img {
            width: 100%;
            max-width: 400px;
            /*height: auto;*/
            object-fit: contain;
        }
    }

    .btn-publish {
        margin-top: 2rem;
    }
</style>
