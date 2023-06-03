<template>
  <div class="wrapper">
    <section class="carusel" id="carusel">
      <div class="container-fluid">
        <carusel/>
      </div>
    </section>
    <section class="catalog" id="catalog">
      <catalog/>
    </section>
    <section class="most" id="most">
      <most :visibBtn="true"/>
    </section>
    <about/>
    <adv/>
    <subscribe/>
    <section class="target" id="target">
      <div class="container">
        <img src="@/assets/img/target-logo.png" alt="Logo" class="target-logo">
        <h2 class="target-title">
          З найкращих інгредієнтів для найкращих людей
        </h2>
        <p class="target-text">
          Ми знаємо, як важливо виготовляти солодощі, які не боїшся давати своїм дітям. Саме тому ми уважно ставимося до походження складників, до правильності процесів та контролюємо кожну деталь на виробництві.
        </p>
        <img src="@/assets/img/target-img.png" alt="Image" class="target-img">
      </div>
    </section>
    <insta/>
  </div>
</template>
<script>
import carusel from '@/components/carusel.vue'
import catalog from '@/components/catalog.vue'
import about from '@/components/about.vue'
import most from '@/components/most.vue'
import insta from '@/components/insta.vue'
import adv from '@/components/adv.vue'
import subscribe from '@/components/subscribe.vue'
export default {
  components: {
    carusel, catalog, most, insta, subscribe, about, adv
  },
  data(){
    return{
      screenWidth: '',
      advArray:[
        {'id': 1, 'title': 'Те саме печиво, індивідувально запаковане', 'titleColor': '#470D04', 'descr': 'Яскравіший смак та краще зберігання улюблених смаколиків. А ще, так зручніше брати з собою.', 'descrColor': '#470D04', 'bgColor': 'radial-gradient(50% 50% at 50% 50%, #FADC65 0%, #FFCD02 100%)', 'img': 'ads-img.jpg', 'btnText': 'Спробувати', 'link': '/' }
      ]
    }
  },
  methods:{

  },
  mounted(){
    this.screenWidth = screen.width
    this.$store.dispatch('setLoader', false);
  }
}
</script>

<style>
</style>