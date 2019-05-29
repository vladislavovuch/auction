<template>
    <div class="breadcrumbs">
        <ul @click="moveTo">
            <li v-for="(item, index) in list" :key="index" :data-url="item.path">
                {{item.name}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // list: [
                //
                // ]
            }
        },
        methods: {
            moveTo(event) {
                const url = event.target.dataset.url;
                if (url) {
                    this.$router.push(url);
                }
            }
        },
        computed: {
            list() {
                console.log(this.$router);
                console.log(this.$route);
                return this.$route.matched.map((item, i, arr) => {
                    return arr.length - 1 === i ? {
                        name: item.name,
                        path: this.$route.path,
                    } : {
                        name: item.name,
                        path: item.path,
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    $time: .3s;

    .breadcrumbs {
        padding-top: 1rem;
        width: 100%;
        display: flex;
        justify-content: flex-start;

        ul {
            width: 100%;
            list-style: none;
        }

        li {
            display: inline-block;
            cursor: pointer;
            -webkit-transition: all  $time;
            -moz-transition: all  $time;
            -ms-transition: all  $time;
            -o-transition: all  $time;
            transition: all  $time;
            text-decoration: none;
            color: #007bff;
            &:hover {
                color: #0062c4;
                text-decoration: underline;
            }

            &:after {
                content: '/';
                top: 0;
                left: 0;
                float: right;
                margin: 0 1rem;
            }

            &:last-child {
                cursor: default;
                text-decoration: none;
                color: #6c757d;
                &:after {
                    content: '';
                }
                :hover {
                    /*text-decoration: none;*/
                }
            }
        }
    }
</style>
