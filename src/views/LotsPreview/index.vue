<template>
    <div class="lots-preview">
        <base-input
                reference="Search"
                validation=""
                v-model="search"
                class="base-input"
        >
            Search
        </base-input>

        <base-select
                :list="filteredList"
                v-model="filteredProp"
                class="filter"
        >
            Select sorted property
        </base-select>

        <div class="lots-list__wrap" v-if="$store.getters.lotsPreview">
            <div class="lots-list" @click="showLotDetails">
                <lot-preview
                        v-for="lot in paginatedLots"
                        :key="lot.id"
                        :lot="lot"
                ></lot-preview>
            </div>
            <base-pagination
                    v-if="sortedLots.length !== 0"
                    class="preview-pagination"
                    :total="filteredLots.length"
                    :numberPerPage="numberPerPage"
                    :currentPage="currentPage"
                    @change-page="changePage"
            >
            </base-pagination>
            <div v-if="sortedLots.length === 0">
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
    import BaseSelect from '../../components/BaseComponents/BaseSelect'
    import BasePagination from '../../components/BaseComponents/BasePagination'

    export default {
        data() {
            return {
                search: '',
                filteredProp: '0',
                filteredList: [
                    'Title',
                    'Price',
                    'Finish date',
                    'Author',
                ],
                currentPage: 1,
                numberPerPage: 6,
            }
        },
        components: {
            LotPreview,
            BreadCrumbs,
            BaseInput,
            BaseSelect,
            BasePagination,
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
                        prop = prop.name;
                    }
                    if (String(prop).match(regexp)) {
                        return true;
                    }
                }
                return false;
            },
            changePage(pageNum) {
                this.currentPage = pageNum;
                document.body.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        },
        computed: {
            filteredLots() {
                const lotsPreview = this.$store.getters.lotsPreview;
                const lots = [];

                for (const key in lotsPreview) {
                    lots.push(lotsPreview[key]);
                }

                return lots.filter(lot => {
                    return this.findMatch(lot, this.search);
                })
            },
            paginatedLots() {
                const start = (this.currentPage - 1) * this.numberPerPage;
                const end = start + this.numberPerPage;
                return this.sortedLots.slice(start, end);
            },
            sortedLots() {
                return this.filteredLots.sort((lot1, lot2) => {
                    let result;
                    switch (this.filteredProp) {
                        case '0':
                            // title
                            result = lot1.title > lot2.title ? 1 : -1;
                            break;
                        case '1':
                            // price
                            result = +lot1.price > +lot2.price ? 1 : -1;
                            break;
                        case '2':
                            //date
                            result = lot1.finishDate > lot2.finishDate ? 1 : -1;
                            break;
                        case '3':
                            //author
                            result = lot1.author > lot2.author ? 1 : -1;
                            break;
                    }
                    return result;
                })
            }
        },
        created() {
            this.$store.dispatch('getLotsPreview');
        },
    }
</script>

<style scoped lang="scss">
    .preview-pagination {
        width: calc(100% - 2rem);
        padding: 1rem;
    }

    .base-input {
        width: calc(100% - 2rem);
        padding: 0 1rem;
    }

    .lots-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .filter {
        width: calc(100% - 4rem);
        padding: 0 2rem;
    }
</style>
