<template>
    <div id="app">
        <the-header></the-header>
        <main>
            <div class="container">
                <router-view/>
            </div>
        </main>

    </div>
</template>

<script>
    import TheHeader from './components/TheHeader'

    export default {
        components: {
            TheHeader,
        },
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /*padding-top: 75px;*/
    }
    * {
        margin: 0;
        padding: 0;
    }

    .container {
        width: 100%;
        max-width: 1140px;
        margin: 0 auto;
    }

    main {
        margin-top: 75px;
        width: 100%;
    }

</style>
