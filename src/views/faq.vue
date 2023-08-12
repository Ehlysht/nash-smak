<template>
    <section class="faq">
        <div class="faq-top">
            <div class="container">
                <route routeName="FAQ"/>
                <h2 class="faq-title">
                    Відповіді на популярні запитання
                </h2>
            </div>
        </div>
        <div class="container">
            <ul class="faq-list">
                <li class="faq-item" v-for="item in this.faqList" :key="item.id">
                    <h3 class="faq-item_title" @click.prevent="openDescr(item.id)">
                        {{ item.title }}
                        <img src="@/assets/img/descr-plus.png" alt="plus" v-if="this.descrValue != 'faq' + item.id">
                        <img src="@/assets/img/descr-minus.png" alt="minus" v-if="this.descrValue == 'faq' + item.id">
                    </h3>
                    <div class="faq-item_descr" v-html="item.descr" v-if="this.descrValue == 'faq' + item.id"></div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import route from '@/components/route.vue'
import axios from 'axios'
export default {
    components: {
        route
    },
    data(){
        return{
            faqList: [],
            descrValue: false
        }
    },
    methods:{
        openDescr(id){
            if(this.descrValue == 'faq' + id){
                this.descrValue = false
            }else{
                this.descrValue = 'faq' + id
            }
        }
    },
    mounted(){
        axios.get('https://nash.enott.com.ua/api/getFaq')
        .then(response => {
            this.faqList = response.data;
            this.$store.dispatch('setLoader', false);
            this.$store.dispatch('setVisibleMenu', false);
            this.$store.dispatch('setOverlay', false);
        })
    }
}
</script>

<style>

</style>