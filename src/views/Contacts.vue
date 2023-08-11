<template>
<div>
  <section class="contacts" id="contacts">
    <div class="container">
        <route routeName="Контакти"/>
        <h2 class="contacts-title">
            Контакти
        </h2>
        <div class="contacts-content">
            <div class="contacts-callback">
                <p class="contacts-text">
                    Маєте запитання чи пропозицію?
                </p>
                <p class="contacts-descr">
                    Заповніть цю форму та напишіть коротке повідомлення, і наш менеджер зв’яжеться з вами якнайшвидше!<br> Ми працюємо 8:00 - 17:00 з понеділка до п’ятниці.
                </p>
                <form class="contacts-form">
                    <label for="contacts-input" class="contacts-label">
                        Ім'я *
                        <input type="text" ref="fname" name="sName" id="contacts-input" class="contacts-input" v-model="this.fname">
                    </label>
                    <label for="contacts-input" class="contacts-label">
                        Прізвище
                        <input type="text" ref="sname" name="fName" id="contacts-input" class="contacts-input" v-model="this.sname">
                    </label>
                    <label for="contacts-input" class="contacts-label">
                        Телефон
                        <input type="text" ref="phone" v-maska="'+38 ### ### ## ##'" name="phone" id="contacts-input" class="contacts-input" v-model="this.phone">
                    </label>
                    <label for="contacts-input" class="contacts-label">
                        Email *
                        <input type="email" ref="email" name="email" id="contacts-input" class="contacts-input" v-model="this.email">
                    </label>
                    <div class="contacts-comments" ref="textContent">
                        <p class="contacts-comments_title">
                            Ваше повідомлення *
                        </p>
                        <QuillEditor ref="quilEditor" :toolbar="false" class="contacts-textarea" v-model:content="this.textContent" contentType="html"/>
                    </div>
                    <p class="contacts-alert" v-if="this.errorMessage">
                        <img src="@/assets/img/alert-cart.png" alt="Alert"> Заповніть обов'язкові поля
                    </p>
                    <button class="contacts-btn" @click.prevent="sendQuestion()">
                        Відправити
                    </button>
                </form>
            </div>
            <div class="contacts-info">
                <div class="contacts-social">
                    <p class="contacts-social_title">
                        Графік роботи
                    </p>
                    <p class="contacts-social_text">
                        8:00 – 17:00  пн-пт
                    </p>
                </div>
                <div class="contacts-social">
                    <p class="contacts-social_title">
                        Зв'язок з нами
                    </p>
                    <div class="contacts-social_links">
                        <a href="viber://chat?number=+380">
                            <img src="@/assets/img/viber.png" alt="Viber">
                        </a>
                        <a href="#">
                            <img src="@/assets/img/telegram.png" alt="Telegram">
                        </a>
                    </div>
                </div>
                <div class="contacts-social">
                    <p class="contacts-social_title">
                        Ми у соцмережах
                    </p>
                    <div class="contacts-social_links">
                        <a href="https://www.pinterest.com/nashsmakua/" target="_blank">
                            <img src="@/assets/img/pinterest.png" alt="Pinterest">
                        </a>
                        <a href="https://www.tiktok.com/@nashsmak" target="_blank">
                            <img src="@/assets/img/tiktok.png" alt="TikTok">
                        </a>
                        <a href="https://www.facebook.com/nashsmak.ua?locale=uk_UA" target="_blank">
                            <img src="@/assets/img/facebook.png" alt="FaceBook">
                        </a>
                        <a href="https://www.instagram.com/nashsmak.ua/" target="_blank">
                            <img src="@/assets/img/instagram.png" alt="Instagram">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </section>
  <insta/>
</div>
</template>

<script>
import axios from 'axios'
import route from '@/components/route.vue'
import insta from '@/components/insta.vue'
export default {
    components: {
        route, insta
    },
    data(){
        return{
            errorMessage: false,
            fname: '',
            sname: '',
            phone: '',
            email: '',
            textContent: ''
        }
    },
    methods:{
        sendQuestion(){
            if(!this.fname){
                var activeClass1 = this.$refs.fname.classList.value
                this.$refs.fname.classList.value = activeClass1 + ' contacts-error'
                setTimeout(() => {
                    this.$refs.fname.classList.value = 'contacts-input'
                }, 1500);
            }
            if(!this.sname){
                var activeClass2 = this.$refs.sname.classList.value
                this.$refs.sname.classList.value = activeClass2 + ' contacts-error'
                setTimeout(() => {
                    this.$refs.sname.classList.value = 'contacts-input'
                }, 1500);
            }
            if(!this.phone){
                var activeClass3 = this.$refs.phone.classList.value
                this.$refs.phone.classList.value = activeClass3 + ' contacts-error'
                setTimeout(() => {
                    this.$refs.phone.classList.value = 'contacts-input'
                }, 1500);
            }
            if(!this.email){
                var activeClass4 = this.$refs.email.classList.value
                this.$refs.email.classList.value = activeClass4 + ' contacts-error'
                setTimeout(() => {
                    this.$refs.email.classList.value = 'contacts-input'
                }, 1500);
            }
            if(!this.textContent){
                var activeClass5 = this.$refs.textContent.classList.value
                this.$refs.textContent.classList.value = activeClass5 + ' contacts-error-textarea'
                setTimeout(() => {
                    this.$refs.textContent.classList.value = 'contacts-comments'
                }, 1500);
            }
            if(this.fname && this.sname && this.phone && this.email && this.textContent){
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                let formData = new FormData();
                formData.append('fname', this.fname);
                formData.append('sname', this.sname);
                formData.append('phone', this.phone);
                formData.append('email', this.email);
                formData.append('textContent', this.textContent);
                axios.post('https://nash.enott.com.ua/api/contactMessage', formData, config)
                .then(response => {
                    alert('Повідомлення надіслано!')
                    this.fname = ''
                    this.sname = ''
                    this.phone = ''
                    this.email = ''
                    this.$refs.quilEditor.setHTML('')
                })
            }else{
                this.errorMessage = true
                setTimeout(() => {
                    this.errorMessage = false
                }, 1500);
            }
        }
    },
    mounted(){
        this.$store.dispatch('setLoader', false);
        this.$store.dispatch('setVisibleMenu', false);
    }
}
</script>

<style>

</style>