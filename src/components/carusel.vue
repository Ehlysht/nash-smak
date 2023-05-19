<template>
  <div>
    <carousel class="carusel-slides" ref="carousel" :items-to-show="1" v-model="currentSlide">
        <slide class="carusel-item" v-for="(slide, index) in slides" :key="index" :style="`background:url('https://nash.enott.com.ua/api/upload/${slide.link}')top left/cover no-repeat`"></slide>
    </carousel>
    <ul class="carusel-pagination">
        <li class="carusel-pagination_item" v-for="(slide, index) in slides" :key="index" @click.prevent="toSlide(index)" :class="`${currentSlide == index ? 'carusel-pagination_active' : ''}`"></li>
    </ul>
  </div>
</template>

<script>
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
        }
    },
    methods:{
        toSlide(index){
            this.$refs.carousel.slideTo(index);
            this.currentSlide = index
        },
    },
    computed:{
        slides(){
            var slideArray =[
                {'id': 1, 'link':'slide.jpg'},
                {'id': 2, 'link':'slide.jpg'},
                {'id': 3, 'link':'slide.jpg'},
                {'id': 4, 'link':'slide.jpg'},
            ]
            return slideArray
        }
    }
}
</script>

<style>

</style>