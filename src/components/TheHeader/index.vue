<template>
    <header>
        <div class="container">
            <div class="logo">
                <a href="#" title="home page">
                    <img :src="require('../../assets/logo.png')" alt="website logotype">
                </a>
            </div>
            <div class="my_ham ">
                <input type="checkbox" id="checkbox4" class="checkbox4 visuallyHidden" ref="checkbox">
                <label for="checkbox4">
                    <div class="hamburger hamburger4" @click="toggleMenuList">
                        <span class="bar bar1"></span>
                        <span class="bar bar2"></span>
                        <span class="bar bar3"></span>
                        <span class="bar bar4"></span>
                        <span class="bar bar5"></span>
                    </div>
                </label>
            </div>
            <nav class="menu_list hide_list" ref="menu_list">
                <ul @click.prevent="changeRoute">
                    <li>
                        <a href="/" title="Home page">Home</a>
                    </li>
                    <li>
                        <a href="/auction" title="Lost page">Lots</a>
                    </li>
                    <li>
                        <a href="/add-lot" title="Adding lot page">Add lot</a>
                    </li>
                    <li>
                        <a href="/about-us" title="Page about developer and company">About us</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            toggleMenuList() {
                this.$refs['menu_list'].classList.toggle('hide_list');
            },
            changeRoute(event) {
                const url = event.target.pathname;
                if (url) {
                    this.$router.push(url);
                    this.$refs['menu_list'].classList.add('hide_list');
                    this.$refs.checkbox.checked = false;
                }
            }
        },
    }
</script>

<style lang='scss' scoped>
    %standart {
        width: 100%;
    }

    %align_horisontal {
        display: flex;
        justify-content: center;
    }

    %align_vertical {
        display: flex;
        align-items: center;
    }

    header {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        background-color: #fff;
        height: 75px;
        display: flex;
        justify-content: center;
        box-shadow: 0 0 24px rgba(0, 0, 0, 0.25);
    }

    .container {
        display: flex;
        align-items: center;
        width: 100%;
        max-width: 1140px;
        @extend %align_vertical;
        justify-content: space-between;
        position: relative;
    }

    .logo {
        width: 100%;
        max-width: 150px;
        height: 100%;
        display: flex;
        align-items: center;
        padding-top: 10px;
        margin-left: 50px;

        img {
            width: auto;
            max-width: 100px;
            height: auto;
            max-height: 60px;
            object-fit: contain;
        }
    }

    .menu_list {
        transition: 1s;
        transform-origin: top;
        @extend %standart;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-left: 50px;
        margin-right: 20px;
        z-index: 11;

        ul {
            width: 100%;
            display: flex;
            justify-content: space-around;
            list-style: none;
            z-index: 11;

            li {
                z-index: 11;
                cursor: pointer;

                margin-left: 10px;
                position: relative;

                a {
                    text-decoration: none;
                    color: #272727;
                    font-family: Poppins;
                    font-size: 18px;
                    font-weight: 500;
                    line-height: 27px;

                    &::after {
                        position: absolute;
                        content: "";
                        left: 0;
                        bottom: 0;
                        width: 0px;
                        transition: 1s;
                        background-color: #e4360c;
                        height: 2px;
                    }

                    &:hover {
                        &::after {
                            width: 100%;
                        }
                    }
                }

            }
        }
    }

    .my_ham {
        display: none;
        margin-right: 50px;
        cursor: pointer;

        .visuallyHidden {
            position: absolute;
            overflow: hidden;
            clip: rect(0 0 0 0);
            height: 1px;
            width: 1px;
            margin: -1px;
            padding: 0;
            border: 0;
        }

        h1 {
            text-align: center;
        }

        .hamburger {
            margin: 0 auto;
            width: 30px;
            height: 30px;
            position: relative;
            cursor: pointer;
        }

        .hamburger .bar {
            padding: 0;
            width: 30px;
            height: 4px;
            background-color: maroon;
            display: block;
            border-radius: 4px;
            transition: all 0.4s ease-in-out;
            position: absolute;
        }

        .bar1 {
            top: 0;
        }

        .bar2,
        .bar3 {
            top: 13.5px;
        }

        .bar3 {
            right: 0;
        }

        .bar4 {
            bottom: 0;
        }

        /* HAMBURGER 4 */
        .hamburger2 .bar2,
        .hamburger3 .bar3,
        .hamburger4 .bar4 {
            top: 13.5px;
        }

        .hamburger4 .bar5 {
            bottom: 0px;
        }

        .hamburger4 .bar {
            transition: all 0.4s ease-in-out, transform 0.4s ease-in-out 0.4s;
        }

        .hamburger4 .bar2 {
            width: 1px;
            transform: rotate(90deg);
            left: 13.5px;
        }

        .hamburger4 .bar3 {
            width: 1px;
            left: 13.5px;

        }

        .checkbox4:checked + label > .hamburger4 > .bar1 {
            top: 13.5px;
            background-color: transparent;
        }

        .checkbox4:checked + label > .hamburger4 > .bar2 {
            left: 0px;
            width: 30px;
            transform: rotate(45deg);
        }

        .checkbox4:checked + label > .hamburger4 > .bar3 {
            left: 0;
            width: 30px;
            transform: rotate(-45deg);
        }

        .checkbox4:checked + label > .hamburger4 > .bar4 {
            background-color: transparent;
        }

        .checkbox4:checked + label > .hamburger4 > .bar5 {
            bottom: 13.5px;
            background-color: transparent;
        }
    }

    @media screen and (max-width: 500px) {
        .menu_list {
            overflow: hidden;
            margin: 0;
            transform: scaleY(1);
            background-color: #fff;
            position: absolute;
            width: 100%;
            left: 0;
            top: 75px;
            align-items: stretch;

            ul {
                flex-direction: column;
                align-items: center;
            }

            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
        }
        .my_ham {
            display: block;
        }
        .hide_list {
            transform: scaleY(0) !important;
            transform-origin: top;
        }
    }

</style>
