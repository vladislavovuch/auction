<template>
    <footer id="footer">
        <div class="container">
            <div class="logo">
                <img src="../../assets/logo.png" alt="My vue.js logotype">
            </div>
            <div class="contacts">
                <div class="phone">
                    <p>
                        <!--Phone number:--> +380969913191
                    </p>
                </div>
                <div class="email">
                   <p>
                       <!--Email:--> 2pi15b.gybalo@gmail.com
                   </p>
                </div>
            </div>
        </div>

    </footer>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="scss">

    #footer {
        width: 100%;
        height: 75px;
        flex-shrink: 0;
        box-shadow: 0 0 24px rgba(0, 0, 0, 0.25);
        display: flex;
        justify-content: center;
    }

    .container {
        display: flex;
        align-items: center;
    }

    .logo {
        /*width: 100%;*/
        flex-grow: 1;
        padding-left: 3rem;

        img {
            /*width: 100%;*/
            height: auto;
            object-fit: contain;
            max-width: 200px;
            max-height: 60px;
        }
    }

    .contacts {
        /*width: 100%;*/
        flex-grow: 3;
        font-family: Calibri;
        font-size: 1.1rem;
        display: flex;
        justify-content: space-around;
    }
    .phone {
        color: rgb(53, 73, 94)
    }

    .email {
        color: rgb(65, 184, 131);
    }

    @media screen and (max-width: 590px){
        .contacts {
            flex-direction: column;
        }

        .logo {
            padding-left: 1rem;
        }
    }
</style>
