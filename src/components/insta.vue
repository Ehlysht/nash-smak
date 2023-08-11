<template>
  <section class="insta" id="insta">
    <div :class="`${this.screenWidth <= 360 ? 'container-fluid' : 'container'}`">
      <p class="insta-text">
        долучайся до нас в instagram та відстежуй як Ми виготовляємо печиво та бісквітики  
      </p>
      <Carousel :breakpoints="breakpoints" :items-to-show="4" class="insta-carusel" :rtl="false">
        <Slide class="insta-slide" v-for="slide in this.instaArray" :key="slide.id">
          <a :href="slide.link" target="_blank">
            <div class="insta-carusel_img" :style="`background: url('https://nash.enott.com.ua/api/upload/${slide.img}')center center/cover no-repeat`"></div>
          </a>
        </Slide>
      </Carousel>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
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
      instaArray: [],
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
    axios.get('https://nash.enott.com.ua/api/getInsta')
    .then(response => {
        this.instaArray = response.data;
    })
  }
})
</script>

<style>

</style>