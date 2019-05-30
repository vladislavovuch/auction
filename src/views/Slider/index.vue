<template>
    <div>
        <base-slider
            :autoPlay="3000"
        >
            <img src="../../assets/brandson.jpg" alt="">
            <img src="../../assets/true_story.jpg" alt="">
            <img src="../../assets/stages.jpg" alt="">
        </base-slider>
    </div>
</template>

<script>
    import BaseSlider from '../../components/BaseComponents/BaseSlider'
    export default {
        components: {
            BaseSlider,
        },
        // mounted() {
        //     console.dir(this);
        //     this.$el.draggable = true;
        // }
    }
</script>

<style scoped>
    img {
        width: 100%;
        height: 100%;
        /*object-fit: cover;*/
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
</style>
