<template>
  <section class="insta" id="insta">
    <div :class="`${this.screenWidth <= 360 ? 'container-fluid' : 'container'}`">
      <p class="insta-text">
        долучайся до нас в instagram та відстежуй як Ми виготовляємо печиво та бісквітики  
      </p>
      <Carousel :breakpoints="breakpoints" :items-to-show="4" class="insta-carusel" :rtl="false">
        <Slide class="insta-slide" v-for="slide in this.instaArray" :key="slide.id">
          <a :href="slide.link" target="_blank">
            <img :src="`https://nash.enott.com.ua/api/upload/${slide.img}`" alt="Instagram Image">
          </a>
        </Slide>
      </Carousel>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  components: {
    Carousel,
    Slide,
  },
  data(){
    return{
      screenWidth: '',
      instaArray: [
        {'id': 1, 'link': 'https://www.instagram.com/nashsmak.ua/?hl=en', 'img': 'insta1.jpg'},
        {'id': 2, 'link': 'https://www.instagram.com/nashsmak.ua/?hl=en', 'img': 'insta2.jpg'},
        {'id': 3, 'link': 'https://www.instagram.com/nashsmak.ua/?hl=en', 'img': 'insta3.jpg'},
        {'id': 4, 'link': 'https://www.instagram.com/nashsmak.ua/?hl=en', 'img': 'insta4.jpg'},
      ],
      // breakpoints are mobile first
      // any settings not specified will fallback to the carousel settings
      breakpoints: {
        // 700px and up
        100: {
          itemsToShow: 1.8,
          snapAlign: 'start',
        },
        361: {
          itemsToShow: 2.4,
          snapAlign: 'start',
        },
        // 1024 and up
        481: {
          itemsToShow: 4,
          snapAlign: 'start',
        },
      },
    }
  },
  mounted(){
    this.screenWidth = screen.width
  }
})
</script>

<style>

</style>