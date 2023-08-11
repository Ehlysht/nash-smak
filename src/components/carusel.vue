<template>
  <div>
    <carousel class="carusel-slides" ref="carousel" :items-to-show="1" v-model="currentSlide">
        <slide class="carusel-item" v-for="(slide, index) in this.slideArray" :key="index" :style="`background:url('https://nash.enott.com.ua/api/upload/${slide.img}')top left/cover no-repeat`"></slide>
    </carousel>
    <ul class="carusel-pagination">
        <li class="carusel-pagination_item" v-for="(slide, index) in this.slideArray" :key="index" @click.prevent="toSlide(index)" :class="`${currentSlide == index ? 'carusel-pagination_active' : ''}`"></li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
export default {
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
    data(){
        return{
            currentSlide: 0,
            slideArray: []
        }
    },
    methods:{
        toSlide(index){
            this.$refs.carousel.slideTo(index);
            this.currentSlide = index
        },
    },
    mounted(){
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.get('https://nash.enott.com.ua/api/getBanners')
        .then(response => {
            this.slideArray = response.data;
        })
    }

}
</script>

<style>

</style>