<template>
  <section class="advertising" id="advertising">
      <div :class="`${this.screenWidth <= 360 ? 'container-fluid' : 'container'}`">
        <div class="advertising-cont" v-for="adv in advArray" :key="adv.id" :style="`background: ${adv.bgColor};`">
          <div class="advertising-info">
            <h2 class="advertising-title" :style="`color: ${adv.titleColor}`">
              {{ adv.title }}
            </h2>
            <p class="advertising-text" :style="`color: ${adv.descrColor}`">
              {{ adv.descr }}
            </p>
            <button class="btn advertising-btn">
              <router-link :to="adv.link">
                {{ adv.btnText }} <img src="@/assets/img/arrow-right.svg" alt="Arrow">
              </router-link>
            </button>
          </div>
          <div class="advertising-img" :style="`background: url(https://nash.enott.com.ua/api/upload/${adv.img})left bottom/cover no-repeat;`"></div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
    data(){
        return{
            screenWidth: '',
            advArray:[
                {'id': 1, 'title': 'Те саме печиво, індивідувально запаковане', 'titleColor': '#470D04', 'descr': 'Яскравіший смак та краще зберігання улюблених смаколиків. А ще, так зручніше брати з собою.', 'descrColor': '#470D04', 'bgColor': 'radial-gradient(50% 50% at 50% 50%, #FADC65 0%, #FFCD02 100%)', 'img': 'ads-img.jpg', 'btnText': 'Спробувати', 'link': '/' }
            ]
        }
    },
    mounted(){
        this.screenWidth = screen.width
    }
}
</script>

<style>

</style>