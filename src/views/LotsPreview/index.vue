<template>
    <div class="lots-preview">
        <base-input
                reference="Search"
                validation=""
                v-model="search"
        >
            Search
        </base-input>
        <div class="lots-list__wrap" v-if="$store.getters.lotsPreview">
            <div class="lots-list" @click="showLotDetails">
                <lot-preview
                        v-for="lot in filteredLots"
                        :key="lot.id"
                        :lot="lot"
                ></lot-preview>
            </div>
            <div v-if="filteredLots.length === 0">
                <h2>
                    Sorry, there is no lots with such params
                </h2>
            </div>
        </div>

    </div>
</template>

<script>
    import LotPreview from '../../components/LotPreview'
    import BreadCrumbs from '../../components/BreadCrumbs'
    import BaseInput from '../../components/BaseComponents/BaseInput'

    export default {
        data() {
            return {
                search: ''
            }
        },
        components: {
            LotPreview,
            BreadCrumbs,
            BaseInput,
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
            },
            findMatch(lot, str) {
                const regexp = new RegExp(str, 'i');

                for (const key in lot) {
                    let prop = lot[key];
                    if (key === 'img') {
                        prop = prop.name
                    }

                    if (prop.match(regexp)) {
                        return true;
                    }
                }
                return false;
            }
        },
        computed: {
            filteredLots() {
                const lotsPreview = this.$store.getters.lotsPreview;
                const lots = [];

                for (const key in lotsPreview) {
                    const lot = lotsPreview[key];
                    // console.log(lot);
                    lots.push(lot);
                }
                // console.log(lots)

                // for (const l of lots) {
                //     console.log(l)
                // }

                return lots.filter(lot => {
                    return this.findMatch(lot, this.search);
                })
            }
        },
        created() {
            this.$store.dispatch('getLotsPreview');
        },
    }
</script>

<style scoped lang="scss">
    .lots-preview {

    }

    .lots-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>
