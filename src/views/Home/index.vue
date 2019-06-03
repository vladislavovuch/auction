<template>
    <div class="home">
        <base-slider class="home-slider" :dots="false" :arrows="false" :auto-play="3000">
            <img class="slider-img" src="../../assets/vasa.jpg" alt="ancient vase">
            <img class="slider-img" src="../../assets/coin.jpg" alt="ancient coin">
            <img class="slider-img" src="../../assets/swords.jpg" alt="ancient sword">
            <img class="slider-img" src="../../assets/axes.jpg" alt="ancient axes">
            <img class="slider-img" src="../../assets/gold-swords.jpg" alt="gold swords">
            <img class="slider-img" src="../../assets/coin1.jpg" alt="coin">
        </base-slider>
        <div class="container">
            <div class="select-categories__wrap">
                <base-multilist
                        class="select-categories"
                        :list="categories"
                        :reference="categories"
                        validation=""
                        @select-items="selectCategory"
                        :selectAll="true"
                >
                </base-multilist>
            </div>
            <article-preview
                    v-for="(article, index) in $store.getters.getArticles"
                    :key="index"
                    :article="article"
            >
            </article-preview>
        </div>
    </div>
</template>

<script>
    import BaseSlider from '../../components/BaseComponents/BaseSlider'
    import ArticlePreview from '../../components/ArticlePreview'
    import firebase from 'firebase/app'
    import BaseMultilist from '../../components/BaseComponents/BaseMultilist'

    export default {
        components: {
            BaseSlider,
            ArticlePreview,
            BaseMultilist,
        },
        data() {
            return {
                categories: [
                    'Coins',
                    'Axes',
                    'Swords',
                ],
                selectedCategories: []
            }
        },
        methods: {
            selectCategory(value) {
                this.selectedCategories = value;
                this.$store.dispatch('filterByCategories', this.selectedCategories)
            }
        },
        created() {
            this.$store.dispatch('getArticles');
        }
    }
</script>

<style lang="scss">
    .home {
        width: 100%;
        background-color: rgba(0, 0, 0, 0.1);
        padding-bottom: 1rem;
    }

    .select-categories__wrap {
        width: calc(100% - 2rem);
        padding: 1rem;
        background-color: #fff;
    }

    .home-slider {
        width: 100%;
        height: calc(100vh - 75px);
        max-height: 100vw;
        background-color: rgba(0, 0, 0, 0.1);
    }

    .slider-img {
        width: 100vw;
        height: calc(100vh - 75px);
        max-height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        float: left;
    }

</style>
