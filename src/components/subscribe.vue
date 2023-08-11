<template>
  <section class="subscribe" id="subscribe">
      <div class="container">
        <div class="subscribe-content">
          <div class="subscribe-info">
            <h2 class="subscribe-title">
              Підпишись на нашу розсилку
            </h2>
            <p class="subscribe-text">
              Дізнавайся про акції, знижки та новинки!
            </p>
          </div>
          <form class="subscribe-form">
            <label for="email" class="subscribe-label">
              <input type="email" class="subscribe-input" placeholder="введіть свій email" v-model="this.email"><button @click.prevent="subscribe()" class="subscribe-btn"><img src="@/assets/img/arrow-left.svg" alt=""></button>
            </label>
            <p v-if="this.message">
              Дякую що підписались на оновлення!
            </p>
          </form>
        </div>
      </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      email: '',
      message: false
    }
  },
  methods:{
    subscribe(){
      let config = {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }
      let formData = new FormData();
      formData.append('email', this.email);
      formData.append('status', 'add');
      axios.post('https://nash.enott.com.ua/api/subscribe', formData, config)
      .then(response => {
        this.email = ''
        this.message = true;
        setTimeout(() => {
            this.message = false;
        }, 3000);
      })
    }
  }
}
</script>

<style>

</style>