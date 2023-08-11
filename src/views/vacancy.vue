<template>
    <section class="vacancy" id="vacancy">
        <div class="container">
            <route routeName="Вакансії"/>
            <h2 class="vacancy-title">
                Вакансії
            </h2>
            <ul class="vacancy-list">
                <li class="vacancy-item" v-for="vacancy in this.vacancyList" :key="vacancy.id">
                    <div>
                        <h3 class="vacancy-item_title">
                            {{ vacancy.name }}
                        </h3>
                        <div class="vacancy-item_city">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <path d="M4.22303 9.91151C6.52137 -0.19182 21.4897 -0.180153 23.7764 9.92318C25.118 15.8498 21.4314 20.8665 18.1997 23.9698C15.8547 26.2332 12.1447 26.2332 9.78804 23.9698C6.56804 20.8665 2.88137 15.8382 4.22303 9.91151Z" fill="#00A439"/>
                                <path d="M13.9999 15.6628C16.0102 15.6628 17.6399 14.0331 17.6399 12.0228C17.6399 10.0125 16.0102 8.38281 13.9999 8.38281C11.9895 8.38281 10.3599 10.0125 10.3599 12.0228C10.3599 14.0331 11.9895 15.6628 13.9999 15.6628Z" fill="white"/>
                            </svg>
                            <p class="vacancy-item_city__text">
                                {{ vacancy.city }}
                            </p>
                        </div>
                        <div class="vacancy-item_descr" v-html="vacancy.descr.substring(0,130) + '...'"></div>
                    </div>
                    <router-link :to="`/vacancy/${vacancy.id}/${vacancy.name}`" class="vacancy-link">
                        Детальніше
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
                            <path d="M2.02661 12.6289L6.97636 7.67916C7.36688 7.28864 7.3639 6.65848 6.9697 6.27166L1.97337 1.36895" stroke="#470D04" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </router-link>
                </li>
            </ul>
            <svg class="vacancy-stroke" xmlns="http://www.w3.org/2000/svg" width="1650" height="16" viewBox="0 0 1650 16" fill="none">
                <path d="M0 3C45.8278 3 45.8278 13 91.668 13C137.508 13 137.496 3 183.324 3C229.151 3 229.164 13 274.992 13C320.82 13 320.82 3 366.66 3C412.5 3 412.488 13 458.278 13C504.069 13 504.106 3 549.934 3C595.762 3 595.762 13 641.589 13C687.417 13 687.417 3 733.257 3C779.098 3 779.085 13 824.913 13C870.741 13 870.803 3 916.631 3C962.459 3 962.508 13 1008.3 13C1054.09 13 1054.14 3 1099.97 3C1145.79 3 1145.81 13 1191.63 13C1237.46 13 1237.48 3 1283.3 3C1329.13 3 1329.14 13 1374.97 13C1420.8 13 1420.79 3 1466.64 3C1512.49 3 1512.48 13 1558.32 13C1604.16 13 1604.16 3 1650 3" stroke="#00A439" stroke-width="5" stroke-miterlimit="10"/>
            </svg>
            <div class="vacancy-callback">
                <div class="vacancy-callback_texts">
                    <h3 class="vacancy-callback_title">
                        Не знайшли бажаної вакансії, але хочете працювати у нашій команді?
                    </h3>
                    <p class="vacancy-callback_text">
                        Не проблема! Надсилайте ваше резюме та розкажіть нам про свій талант. Ми з радістю розглянемо вашу заявку у найкоротший термін.
                    </p>
                </div>
                <call-back jobName="Хоче працювати у вашій команді"/>
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
        axios.get('https://nash.enott.com.ua/api/getVacancy')
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