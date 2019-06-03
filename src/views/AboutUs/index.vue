<template>
    <div class="about-us">
        <div class="container">
            <div class="contacts">
                <h3>
                    Feel free to contact me
                </h3>
                <p>Phone number +380969913191</p>
                <p>Email 2pi15b.gybalo@gmail.com</p>
            </div>

            <div class="map">
                <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14738.160644138923!2d28.410398495901966!3d49.23160026195686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472d5c5eb3978a07%3A0x591bf4ded045dfa!2z0JLRltC90L3QuNGG0YzQutC40Lkg0L3QsNGG0ZbQvtC90LDQu9GM0L3QuNC5INGC0LXRhdC90ZbRh9C90LjQuSDRg9C90ZbQstC10YDRgdC40YLQtdGC!5e0!3m2!1suk!2sua!4v1539628081741"
                        frameborder="0"
                        allowfullscreen
                >
                </iframe>
            </div>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped lang="scss">
    .about-us {
        padding: 1rem;
        width: calc(100% - 2rem);
    }

    .contacts {
        width: 100%;
        font-family: Calibri;
        font-size: 1.2rem;

        h3, p {
            margin-top: 1rem;
            color: #434343;
            text-align: left;
            /*font-size: 1.2em;*/
        }
    }

    .map {
        margin-top: 2rem;
        width: 100%;

        iframe {
            width: 100%;
            height: 500px;
        }
    }
</style>
