<template>
    <div class="article-preview">
        <div class="article-img">
            <img :src="article.img" alt="">
        </div>
        <div class="article-content">
            <div class="article-title">
                <div class="author">
                    <p>
                        {{article.author}}
                    </p>
                </div>
                <div class="date">
                    {{article.date}}
                </div>
            </div>
            <div class="article-name">
                <p>
                    {{article.title}}
                </p>
            </div>
            <div class="article-short-text">
                <p>
                    {{article.text}}
                    <a :href="article.link" target="_blank">
                        Read Full Article »
                    </a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            article: {
                type: Object,
                required: true,
            }
        }
    }
</script>

<style scoped lang="scss">
    .article-preview {
        margin: 1rem 1rem 0;
        width: calc(100% - 4rem);
        display: flex;
        align-items: center;
        /*flex-direction: column;*/
        background-color: #fff;
        padding: 1rem;
        font-family: Calibri, serif;
    }

    .article-img {
        max-width: 200px;
        width: 100%;
        max-height: 100%;
        img {
            height: auto;
            max-height: 100%;
            object-fit: cover;
            width: 100%;
        }
    }

    .article-content {
        width: calc(100% - 2rem);
        padding: 1rem;
    }

    .article-title {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    .author {
        /*width: 100%;*/

        p {
            font-size: 1rem;
            font-weight: 400;
            text-transform: uppercase;
            color: #38c695;
        }
    }

    .date {

        P {
            color: #616161;
            font-size: 1rem;
            font-weight: 400;
        }
    }

    .article-name {
        margin-top: 2rem;

        p {
            color: #272727;
            font-size: 1.3rem;
            font-weight: 500;
        }
    }

    .article-short-text {
        margin-top: .5rem;

        p {
            color: #616161;
            font-size: 1.1rem;
            font-weight: 400;
            line-height: 1.5rem;
            text-align: left;
        }

        a {
            color: #38c695;
            /*display: inline;*/
            /*font-family: Poppins;*/
            font-weight: 600;
            text-decoration: none;
            transition: .3s;
            /*font-size: 1.1rem;*/
            &:hover {
                text-decoration: underline;
            }
        }
    }

    @media screen and (max-width: 700px){
        .article-img {
            display: none;
        }
    }
</style>
