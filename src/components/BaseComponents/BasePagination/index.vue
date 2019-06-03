<template>
    <div class="base-pagination">
        <ul class="buttons-list" @click="changeCurrentPage">
            <li>
                <button class="nav-btn" :data-page-num="currentPage - 1" :disabled="currentPage === 1">
                    Prev
                </button>
            </li>
            <li v-for="n in pageNumbers" :key="n">
                <button class="nav-btn" :class="{'current-page': n === currentPage}" :data-page-num="n">
                    {{n}}
                </button>
            </li>
            <li>
                <button class="nav-btn" :data-page-num="currentPage + 1" :disabled="currentPage === pageNumbers">
                    Next
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            total: {
                required: true,
                type: Number,
            },
            numberPerPage: {
                type: Number,
                default: 10
            },
            currentPage: {
                type: Number,
                required: true,
            }
        },
        methods: {
            changeCurrentPage(event) {
                console.log(event.target);
                const pageNum = event.target.dataset.pageNum;
                if (pageNum !== undefined) {
                   this.changePage(pageNum);
                }
            },
            changePage(pageNum) {
                this.$emit('change-page', Number(pageNum));
            }
        },
        computed: {
            pageNumbers() {
                const pages = Math.ceil(this.total / this.numberPerPage);
                if (pages < this.currentPage) {
                   this.changePage(pages);
                }
                return pages;
            },
        },
        watch: {
            pageNumbers() {


            }
        }
    }
</script>

<style scoped lang="scss">
    .base-pagination {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .buttons-list {
        width: 100%;
        display: flex;
        list-style: none;
        justify-content: center;
    }

    .nav-btn {
        background-color: #fff;
        border: 1px solid #c5c5c5;
        padding: .5rem .75rem;
        margin-left: -1px;
        line-height: 1.25;
        color: #007bff;
        cursor: pointer;
        outline: none;

        &:hover {
            color: #0056b3;
            text-decoration: none;
            background-color: #e9ecef;
        }

        &:disabled {
            color: #cecece;
            cursor: default;

            &:hover {
                color: #cecece;
                background-color: #fff;
                border: 1px solid #c5c5c5;
            }
        }
    }

    .current-page {
        color: white;
        background-color: #007bff;

        &:hover {
            color: white;
            background-color: #0077ee;
        }
    }
</style>
