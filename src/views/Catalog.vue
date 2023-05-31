<template>
  <section class="goods" id="goods">
    <div class="container">
        <route mainPage2="Каталог" :routeName2="this.$route.meta.title2"/>
        <div class="goods-info">
            <div class="goods-texts">
                <h2 class="goods-title">
                    Каталог
                </h2>
                <p class="goods-text">
                    Весь асортимент нашої продукції
                </p>
            </div>
            <button class="btn goods-btn">
                <router-link to="/Goods/Онлайн крамниця">
                    Придбати нашу продукцію <img src="@/assets/img/arrow-right.svg" alt="Arrow">
                </router-link>
            </button>
        </div>
    </div>
    <div :class="`${this.screenWidth <= 1366 ? 'container-fluid' : 'container'}`">
        <ul class="category-list catalog-list">
            <li class="category-item">
                <router-link to="/Catalog/Без начинки">
                    <img src="@/assets/img/catalog_icon1.png" alt="Catalog item">
                </router-link>
            </li>
            <li class="category-item">
                <router-link to="/Catalog/З начинкою">
                    <img src="@/assets/img/catalog_icon2.png" alt="Catalog item">
                </router-link>
            </li>
            <li class="category-item">
                <router-link to="/Catalog/Глазуроване">
                    <img src="@/assets/img/catalog_icon3.png" alt="Catalog item">
                </router-link>
            </li>
            <li class="category-item">
                <router-link to="/Catalog/Бісквіти">
                    <img src="@/assets/img/catalog_icon4.png" alt="Catalog item">
                </router-link>
            </li>
            <li class="category-item">
                <router-link to="/Catalog/Набори">
                    <img src="@/assets/img/catalog_icon5.png" alt="Catalog item">
                </router-link>
            </li>
            <li class="category-item">
                <router-link to="/Catalog/До посту">
                    <img src="@/assets/img/catalog_icon6.png" alt="Catalog item">
                </router-link>
            </li>
        </ul>
    </div>
    <div class="container">
        <ul class="goods-list">
            <li class="goods-item" v-for="item in filteredList" :key="item.id">
                <router-link :to="`/Goods/${item.name}/${item.bar}`" class="goods-link">
                    <div class="goods-img">
                        <div :style="`background:url('https://nash.enott.com.ua/api/upload/${item.mainImage}')center center/100% no-repeat;width:100%;height:100%`"></div>
                    </div>
                    <h3 class="goods-name">
                        {{ item.name }}
                    </h3>
                    <div class="goods-bottom">
                        <p class="goods-weight">
                            Від {{ item.weight }}г
                        </p>
                        <p class="goods-price">
                            Від {{ item.price }} грн
                        </p>
                    </div>
                </router-link>
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
            screenWidth: ''
        }
    },
    mounted(){
        this.screenWidth = screen.width
        this.$store.dispatch('setLoader', false);
    }
}
</script>

<style>

</style>