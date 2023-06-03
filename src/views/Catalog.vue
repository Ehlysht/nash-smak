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
        <div class="category-section" v-for="category in this.sectionList" :key="category.subCatalog">
            <div class="category-section_text">
                <h3>
                    {{ category.title }}
                </h3>
                <p>
                    {{ category.descr }}
                </p>
            </div>
            <ul class="category-items">
                <li class="category-item1" v-for="item in this.catalogList.filter((item) => item.category === category.subCatalog)" :key="item.id">
                    <div class="category-img">
                        <div :style="`background:url('https://nash.enott.com.ua/api/upload/${item.img}')center center/100% no-repeat;width:100%;height:100%`"></div>
                    </div>
                    <div class="category-img_list"  v-for="img in this.imgList.filter((img) => img.name === item.name)" :key="img">
                        {{ img.img }}
                    </div>
                    <h3 class="category-name">
                        {{ item.name }}
                    </h3>
                </li>
            </ul>
            <div :style="`background:url('https://nash.enott.com.ua/api/upload/${category.img}')center center/100% no-repeat;width:100%;height:100%`"></div>
        </div>
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
            screenWidth: '',
            catalogList: [],
            imgList: [],
            sectionList: []
        }
    },
    mounted(){
        this.screenWidth = screen.width
        this.screenWidth = screen.width
        axios.get('https://nash.enott.com.ua/api/catalogNames')
        .then(response => {
            this.catalogList = response.data.itemList;
            this.imgList = response.data.imgList;
            this.sectionList = response.data.infoList;
            this.$store.dispatch('setLoader', false);
        })
    }
}
</script>

<style>

</style>