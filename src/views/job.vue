<template>
  <section class="job" id="job">
    <div class="container" v-for="vacancy in vacancyList" :key="vacancy.id">
        <route mainPage3="Вакансії" :routeName="this.$route.params['name']"/>
        <div class="job-content">
            <div class="job-top">
                <h3 class="job-title">
                    {{ vacancy.name }}
                </h3>
                <div class="job-city">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M4.22303 9.91151C6.52137 -0.19182 21.4897 -0.180153 23.7764 9.92318C25.118 15.8498 21.4314 20.8665 18.1997 23.9698C15.8547 26.2332 12.1447 26.2332 9.78804 23.9698C6.56804 20.8665 2.88137 15.8382 4.22303 9.91151Z" fill="#00A439"/>
                        <path d="M13.9999 15.6628C16.0102 15.6628 17.6399 14.0331 17.6399 12.0228C17.6399 10.0125 16.0102 8.38281 13.9999 8.38281C11.9895 8.38281 10.3599 10.0125 10.3599 12.0228C10.3599 14.0331 11.9895 15.6628 13.9999 15.6628Z" fill="white"/>
                    </svg>
                    <p class="job-city_text">
                        {{ vacancy.city }}
                    </p>
                </div>
            </div>
            <button class="btn job-btn">
                <a href="#vacancy-callback_form">
                    Подати заявку <img src="@/assets/img/arrow-right.svg" alt="Arrow">
                </a>
            </button>
            <div class="job-descr" v-html="vacancy.descr"></div>
            <call-back :jobName="vacancy.name" :jobId="vacancy.id"/>
        </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import route from '@/components/route.vue'
import callBack from '@/components/vacCallBack.vue'
export default {
    components: {
        route, callBack
    },
    data(){
        return{
            vacancyList: []
        }
    },
    mounted(){
        axios.get('https://nash.enott.com.ua/api/getVac/' + this.$route.params['id'])
        .then(response => {
            this.vacancyList = response.data.vacancy;
            this.$store.dispatch('setLoader', false);
            this.$store.dispatch('setVisibleMenu', false);
            this.$store.dispatch('setOverlay', false);
        })
    }
}
</script>

<style>

</style>