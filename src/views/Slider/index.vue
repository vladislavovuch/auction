<template>
    <div>
        <base-slider
            :autoPlay="3000"
        >
            <img src="../../assets/brandson.jpg" alt="brandson">
            <img src="../../assets/true_story.jpg" alt="true story">
            <img src="../../assets/stages.jpg" alt="stages">
        </base-slider>
    </div>
</template>

<script>
    import BaseSlider from '../../components/BaseComponents/BaseSlider'
    export default {
        components: {
            BaseSlider,
        },
    }
</script>

<style scoped>
    img {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
</style>
