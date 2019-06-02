<template>
    <div class="home">
        <base-slider class="home-slider" :dots="false" :arrows="false" :auto-play="3000">
            <img class="slider-img" src="../../assets/vasa.jpg" alt="">
            <img class="slider-img" src="../../assets/coin.jpg" alt="">
            <img class="slider-img" src="../../assets/swords.jpg" alt="">
            <img class="slider-img" src="../../assets/axes.jpg" alt="">
            <img class="slider-img" src="../../assets/gold-swords.jpg" alt="">
            <img class="slider-img" src="../../assets/coin1.jpg" alt="">
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
            <article-preview v-for="(article, index) in $store.getters.getArticles" :key="index" :article="article">
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
               /* articles: [
                    {

                        title: "Coins of Alexander the Great",
                        author: 'Andrew McIntyre',
                        text: 'In order to understand the coinage of Alexander the Great, it is necessary first to explain the ancient Greek world. There were no specific nations and no specific country called Greece in the ancient world. Greek-speaking people had settled all over the Mediterranean. They established cities from Spain to the Black Sea in southern Russia.',
                        link: 'http://www.coinsoftime.com/Articles/Coins_of_Alexander_the_Great.html',
                        date: '20 June 1996',
                        category: 'Coins',
                        img: 'https://firebasestorage.googleapis.com/v0/b/auction-a1976.appspot.com/o/articles-imgs%2Farticle-coin.png?alt=media&token=d73b9f37-c7c8-4404-af03-741fbaab914a',
                    },
                    {
                        title: "Stone Age Tools",
                        author: 'Emma Groeneveld ',
                        text: `As the Stone Age covers around 99% of our human technological history, it would seem
                        there is a lot to talk about when looking at the development of tools in this period.
                         Despite our reliance on the sometimes scarce archaeological record, this is definitely the case.`,
                        link: 'https://www.ancient.eu/article/998/stone-age-tools/',
                        date: ' 21 December 2016',
                        category: 'Axes',
                        img: 'https://firebasestorage.googleapis.com/v0/b/auction-a1976.appspot.com/o/articles-imgs%2Fmedieval-battle-axe.jpg?alt=media&token=d137ee2c-5583-4d24-9f5b-9e2850aaa8d4',
                    },
                    {
                        title: "World's oldest known ground-edge stone axe fragments found in Western Australia",
                        author: 'Dani Cooper',
                        text: `Work by the team of researchers showed the fragment came from an axe that had been shaped
                         out of basalt then polished by grinding it on a softer rock such as sandstone until it was very
                         smooth.Professor Hiscock said experimental work confirmed the smoothness of the basalt fragment
                          could not have been achieved accidentally through natural processes.`,
                        link: 'https://www.abc.net.au/news/science/2016-05-11/worlds-oldest-known-ground-edge-stone-axe-fragments-found/7401728',
                        date: '11 May 2017',
                        category: 'Axes',
                        img: 'https://firebasestorage.googleapis.com/v0/b/auction-a1976.appspot.com/o/articles-imgs%2Fmedieval-battle-axe.jpg?alt=media&token=d137ee2c-5583-4d24-9f5b-9e2850aaa8d4',
                    },
                    {
                        title: "Viking Age Arms and Armor\n" +
                            "Viking Axe",
                        author: 'William R. Short',
                        text: `When people think of Viking age weapons, they usually think first of the battle axe, and
                        the image that forms in their mind is a massive weapon that only a troll could wield. In reality,
                         battle axes in the Viking age were light, fast, and well balanced, and were good for speedy,
                          deadly attacks, as well as for a variety of nasty, clever moves.`,
                        link: 'http://www.hurstwic.org/history/articles/manufacturing/text/viking_axe.htm',
                        date: 'May 2015',
                        category: 'Axes',
                        img: 'https://firebasestorage.googleapis.com/v0/b/auction-a1976.appspot.com/o/articles-imgs%2Fmedieval-battle-axe.jpg?alt=media&token=d137ee2c-5583-4d24-9f5b-9e2850aaa8d4',
                    },
                    {
                        title: "The Battle-Axe Culture",
                        author: 'By Patrick Hahn ',
                        text: `The battle-axe head is about six inches long, hewn from dense fine-grained dark-gray
                        igneous rock. It was made in Denmark, some 2000 years before the birth of Jesus of Nazareth. `,
                        link: 'https://popular-archaeology.com/article/the-battle-axe-culture/',
                        date: 'Mar 15, 2017 ',
                        category: 'Axes',
                        img: 'https://firebasestorage.googleapis.com/v0/b/auction-a1976.appspot.com/o/articles-imgs%2Fmedieval-battle-axe.jpg?alt=media&token=d137ee2c-5583-4d24-9f5b-9e2850aaa8d4',
                    },
                    {
                        title: "Ancient Battle Axe",
                        author: 'Hyrule Compendium',
                        text: `The Ancient Battle Axe is an item from The Legend of Zelda: Breath of the Wild. It
                        is an axe with a base attack power of 30, but this may be increased by certain Weapon Bonuses.
                         It is a Battle Axe made of advanced ancient technology wielded by Guardian Scouts.
                          Link can find it in certain Treasure Chests of the Divine Beasts and Shrines, or
                           obtain it by using the amiibo Rune with the Guardian amiibo.`,
                        link: 'https://zelda.fandom.com/wiki/Ancient_Battle_Axe',
                        date: 'June 2017',
                        category: 'Axes',
                        img: 'https://firebasestorage.googleapis.com/v0/b/auction-a1976.appspot.com/o/articles-imgs%2Fmedieval-battle-axe.jpg?alt=media&token=d137ee2c-5583-4d24-9f5b-9e2850aaa8d4',
                    },
                    {
                        title: "A Visual History of Ancient Egyptian and Mesopotamian Swords",
                        author: 'Haunty',
                        text: `For the bow and spear-wielding ancient Egyptian or Mesopotamian warrior, swords and
                         blades were a rare commodity. Expensive to produce and requiring special skill to use,
                         swords only became fashionable after 1000 BCE when Middle Eastern soldiers first came
                         into conflict with enemy swordsmen from other regions.`,
                        link: 'https://owlcation.com/humanities/A-Visual-History-of-Ancient-Egyptian-and-Mesopotamian-Swords-and-Blades',
                        date: 'June 23, 2012',
                        category: 'Swords',
                        img: 'https://firebasestorage.googleapis.com/v0/b/auction-a1976.appspot.com/o/articles-imgs%2Fsword-m.png?alt=media&token=7b0c8256-d672-41e0-9d9a-ccc3d3464480',
                    },
                    {
                        title: "Ten Legendary Swords from the Ancient World",
                        author: 'April Holloway',
                        text: `Swords are not only weapons, but symbols of great power, used over the centuries
                         as offerings, in ceremonies, for coronations, and as precious items for trade.
                          Over the years, a number of swords have been unearthed, bringing with them centuries
                          of legends and incredible tales, linking them to famous figures and folk heroes.
                           Here we feature ten striking swords from the ancient world.`,
                        link: 'https://www.ancient-origins.net/artifacts-other-artifacts/ten-legendary-swords-ancient-world-003335',
                        date: '1 JULY, 2015',
                        category: 'Swords',
                        img: 'https://firebasestorage.googleapis.com/v0/b/auction-a1976.appspot.com/o/articles-imgs%2Fsword-m.png?alt=media&token=7b0c8256-d672-41e0-9d9a-ccc3d3464480',
                    },
                    {
                        title: "A Rare Famous Roman Coin - The Colosseum Aureus",
                        author: 'Vasilita Stefan',
                        text: `A rare and famous coin. The Colosseum aureus, minted by Severus Alexander.
                        Recently, collectors from all over the world had the chance to admire one of Antiquity’s
                         most spectacular and rare coins.`,
                        link: 'https://www.coins-auctioned.com/learn/coin-articles/a-rare-roman-famous-coin-the-colosseum-aureus',
                        date: '26 may 2008',
                        category: 'Coins',
                        img: 'https://firebasestorage.googleapis.com/v0/b/auction-a1976.appspot.com/o/articles-imgs%2Farticle-coin.png?alt=media&token=d73b9f37-c7c8-4404-af03-741fbaab914a',
                    },

                ],*/
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
                console.log(this.selectedCategories);
                this.$store.dispatch('filterByCategories', this.selectedCategories)
            }
        },
        created() {
            const db = firebase.firestore();
            // this.articles.forEach(item => {
            //     db.collection("Articles").add(item)
            // })

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

    .select-categories {

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
