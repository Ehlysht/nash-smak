<template>
  <div>
    <carousel class="carusel-slides" ref="carousel" :items-to-show="1" v-model="currentSlide">
        <slide class="carusel-item">
            <animate-placeholder/>
        </slide>
    </carousel>
    <ul class="carusel-pagination">
        <li class="carusel-pagination_item" v-for="(slide, index) in slides" :key="index" @click.prevent="toSlide(index)" :class="`${currentSlide == index ? 'carusel-pagination_active' : ''}`"></li>
    </ul>
  </div>
</template>

<script>
import animatePlaceholder from '@/components/animatePlaceholder.vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
export default {
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
        animatePlaceholder
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
            setTimeout(() => {
                return slideArray
            }, 5000);
        }
    }
}
</script>

<style scoped>
    @keyframes bgAnimate {
    0% {
        background-position: 50% 0;
    }
    100% {
        background-position: -150% 0;
    }
    }
    .carusel-item{

    }
</style>