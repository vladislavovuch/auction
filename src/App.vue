<template>
    <div id="app">
        <the-header></the-header>
        <main>
            <router-view></router-view>
        </main>
        <loading-indicator></loading-indicator>
        <base-modal v-if="$store.getters.isShownModal" @close="closeModalWindow">
            <template v-slot:header>
                <h3>{{$store.getters.modalMsg.title}}</h3>
            </template>
            {{$store.getters.modalMsg.info}}
        </base-modal>
        <the-footer></the-footer>
    </div>
</template>

<script>
    import TheHeader from './components/TheHeader'
    import TheFooter from './components/TheFooter'
    import LoadingIndicator from './components/LoadingIndicator'
    import BaseModal from './components/BaseComponents/BaseModal'
    import BreadCrumbs from './components/BreadCrumbs'

    export default {
        components: {
            TheHeader,
            LoadingIndicator,
            BaseModal,
            BreadCrumbs,
            TheFooter,
        },
        methods: {
            closeModalWindow() {
                this.$store.commit('toggleModalWindow', {});
            },
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
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .error-msg {
        color: red;
        font-size: .8rem;
        font-family: Calibri;
        text-align: left;
    }

    %align_center {
        display: flex;
        justify-content: center;
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
        flex: 1 0 auto;
    }

</style>
