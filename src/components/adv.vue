<template>
  <section v-if="this.showAdv == 'yes'" class="advertising" id="advertising">
      <div :class="`${this.screenWidth <= 360 ? 'container-fluid' : 'container'}`">
        <div class="advertising-cont" v-for="adv in advArray" :key="adv.id" :style="`background: url('https://nash.enott.com.ua/api/upload/${adv.bgImg}')left bottom/cover no-repeat, ${adv.bgColor};`">
          <div class="advertising-info">
            <h2 class="advertising-title" :style="`color: ${adv.textColor}`">
              {{ adv.title }}
            </h2>
            <p class="advertising-text" :style="`color: ${adv.descrColor}`" v-html="adv.descr"></p>
            <button class="btn advertising-btn">
              <router-link :to="adv.linkTo">
                {{ adv.btnText }} <img src="@/assets/img/arrow-right.svg" alt="Arrow">
              </router-link>
            </button>
          </div>
          <div class="advertising-img" :style="`background: url(https://nash.enott.com.ua/api/upload/${adv.headImg})left bottom/cover no-repeat;`"></div>
        </div>
      </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            screenWidth: '',
            advArray:[],
            showAdv: ''
        }
    },
    mounted(){
      let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.get('https://nash.enott.com.ua/api/getAdv', config)
        .then(response => {
            this.advArray = response.data.adv
            this.showAdv = response.data.adv[0].advShow
        })
        this.screenWidth = screen.width
    }
}
</script>

<style>

</style>