<template>
    <div class="loading-indicator" v-if="$store.getters.isShownIndicator">
        <div class="spinner">
             <div class="bounce1"></div>
             <div class="bounce2"></div>
             <div class="bounce3"></div>
         </div>
        <h3 class="title">{{$store.getters.indicatorMsg}}</h3>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    .loading-indicator {
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(255,255,255,.8);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: fixed;
        z-index: 10000;
        max-width: 100%;
        padding: 30px;
    }

    .title {
        margin-top: 20px;
        text-align: center;
    }

    .spinner {
        /*margin: 100px auto 0;*/
        width: 70px;
        text-align: center;
        z-index: 1000;
    }

    .spinner > div {
        width: 18px;
        height: 18px;
        background-color: #333;
        z-index: 1000;
        border-radius: 100%;
        display: inline-block;
        -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }

    .spinner .bounce1 {
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }

    .spinner .bounce2 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }

    @-webkit-keyframes sk-bouncedelay {
        0%, 80%, 100% {
            -webkit-transform: scale(0)
        }
        40% {
            -webkit-transform: scale(1.0)
        }
    }

    @keyframes sk-bouncedelay {
        0%, 80%, 100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        40% {
            -webkit-transform: scale(1.0);
            transform: scale(1.0);
        }
    }
</style>
