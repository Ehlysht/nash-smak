<template>
<div v-if="this.goodsList.length">
    <div class="container">
        <h2 class="most-title">
            Ваше улюблене
        </h2>
        <div class="most-content">
            <carousel class="most-slides" ref="carousel" :itemsToScroll="1" :wrapAround="this.wraping" :breakpoints="breakpoints" v-model="currentSlide">
                <slide class="most-item" v-for="(slide, index) in mosts" :key="index">
                    <router-link :to="`/Goods/${slide.name}/${slide.bar}`">
                        <div class="goods-item_stamps__list">
                                <p class="goods-item_stamps goods-item_discount" v-if="slide.stamps2 != 0">-{{ slide.stamps2 }} %</p>
                                <img class="goods-item_stamps" src="https://nash.enott.com.ua/api/upload/stamps2.png" alt="Бестселлер" v-if="slide.stamps1 != 0">
                                <img class="goods-item_stamps" src="https://nash.enott.com.ua/api/upload/stamps3.png" alt="Вегетаріанське" v-if="slide.vegan">
                                <img class="goods-item_stamps" src="https://nash.enott.com.ua/api/upload/stamps4.png" alt="Пісне" v-if="slide.category == 'До посту'">
                            </div>
                        <div class="most-image" v-if="this.screenWidth > 1366">
                            <div class="most-img" :style="`background: url('https://nash.enott.com.ua/api/upload/${slide.mainImage}')center center/cover no-repeat`"></div>
                        </div>
                        <img v-if="this.screenWidth <= 1366" class="most-img" :src="`https://nash.enott.com.ua/api/upload/${slide.mainImage}`" alt="Slide">
                        <div class="most-texts">
                            <h3 class="most-name">
                                {{ slide.name }}
                            </h3>
                            <div class="most-info">
                                <p class="most-weight">
                                    Від {{ slide.weight }}г
                                </p>
                                <p class="most-price">
                                    Від {{ slide.price }} грн
                                </p>
                            </div>
                        </div>
                    </router-link>
                </slide>
            </carousel>
            <Transition name="arrow-left" v-if="screenWidth > 480">
                <div class="most-arrow most-arrow_left" v-if="currentSlide > 0 ">
                    <img src="@/assets/img/most-arrow.png" alt="Arrow" class="most-arrow_img" @click.prevent="prev()">
                </div>
            </Transition>
            <Transition name="arrow-right" v-if="screenWidth > 480">
                <div class="most-arrow most-arrow_right" v-if="Math.ceil(this.currentSlide) != this.paginationList.length - 1">
                    <img src="@/assets/img/most-arrow.png" alt="Arrow" class="most-arrow_img" @click.prevent="next()">
                </div>
            </Transition>
            <ul class="most-pagination">
                <li class="most-pagination_item" v-for="(slide, index) in this.paginationList" :key="index" @click.prevent="toSlide(slide.id)" :class="`${slide.id == this.currentSlide ? 'most-pagination_active' : ''}`"></li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import axios from 'axios'
export default {
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
    data(){
        return{
            screenWidth: '',
            currentSlide: 0,
            paginationList: [],
            wraping: true,
            goodsList: [],
            breakpoints: {
                420: {
                    itemsToShow: 1,
                    snapAlign: 'start',
                },
                421: {
                    itemsToShow: 2,
                    snapAlign: 'start',
                },
                1000: {
                    itemsToShow: 2.8,
                    snapAlign: 'start',
                },
                1367: {
                    itemsToShow: 3.7,
                    snapAlign: 'start',
                },
            },
        }
    },
    methods:{
        toSlide(index){
            this.$refs.carousel.slideTo(index);
            this.currentSlide = index
        },
        next() {
            this.$refs.carousel.next()
        },
        prev() {
            this.$refs.carousel.prev()
        },
    },
    computed:{
        mosts(){
            mostList = []
            var mostList = this.goodsList
            for(var i = 0; i < mostList.length; i++){
                this.paginationList.push({'id': i})
            }
            return mostList
        },
    },
    mounted(){
        this.screenWidth = screen.width
        axios.get('https://nash.enott.com.ua/api/goodsNames/Popular')
        .then(response => {
            this.goodsList = response.data;
        })
        if(this.screenWidth <= 768){
            this.wraping = false
        }
    }
}
</script>

<style scoped>
    .goods-item_stamps__list{
        top: 24px;
        left: 24px;
    }
</style>