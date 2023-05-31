<template>
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
                        <input type="text" name="sName" id="contacts-input" class="contacts-input" v-model="this.fname">
                    </label>
                    <label for="contacts-input" class="contacts-label">
                        Прізвище
                        <input type="text" name="fName" id="contacts-input" class="contacts-input" v-model="this.fname">
                    </label>
                    <label for="contacts-input" class="contacts-label">
                        Телефон
                        <input type="text" v-maska="'+38 ### ### ## ##'" name="phone" id="contacts-input" class="contacts-input" v-model="this.phone">
                    </label>
                    <label for="contacts-input" class="contacts-label">
                        Email *
                        <input type="email" name="email" id="contacts-input" class="contacts-input" v-model="this.fname">
                    </label>
                    <div class="contacts-comments">
                        <p class="contacts-comments_title">
                            Ваше повідомлення *
                        </p>
                        <QuillEditor :toolbar="false" class="contacts-textarea"/>
                    </div>
                    <p class="contacts-alert">
                        <img src="@/assets/img/alert-cart.png" alt="Alert"> Заповніть обов'язкові поля
                    </p>
                    <button class="contacts-btn">
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
                        <a href="#">
                            <img src="@/assets/img/viber.png" alt="Viber">
                        </a>
                        <a href="#">
                            <img src="@/assets/img/telegram.png" alt="Viber">
                        </a>
                    </div>
                </div>
                <div class="contacts-social">
                    <p class="contacts-social_title">
                        Ми у соцмережах
                    </p>
                    <div class="contacts-social_links">
                        <a href="#">
                            <img src="@/assets/img/pinterest.png" alt="Viber">
                        </a>
                        <a href="#">
                            <img src="@/assets/img/tiktok.png" alt="Viber">
                        </a>
                        <a href="#">
                            <img src="@/assets/img/facebook.png" alt="Viber">
                        </a>
                        <a href="#">
                            <img src="@/assets/img/instagram.png" alt="Viber">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </section>
    <insta/>
</template>

<script>
import axios from 'axios'
import route from '@/components/route.vue'
import insta from '@/components/insta.vue'
export default {
    components: {
        route, insta
    },
    mounted(){
        this.$store.dispatch('setLoader', false);
    }
}
</script>

<style>

</style>