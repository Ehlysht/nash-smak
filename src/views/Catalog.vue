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
                <a href="#" @click.prevent="scrollTo('catalog0')">
                    <img src="@/assets/img/catalog_icon1.png" alt="Catalog item">
                </a>
            </li>
            <li class="category-item">
                <a href="#" @click.prevent="scrollTo('catalog1')">
                    <img src="@/assets/img/catalog_icon2.png" alt="Catalog item">
                </a>
            </li>
            <li class="category-item">
                <a href="#" @click.prevent="scrollTo('catalog2')">
                    <img src="@/assets/img/catalog_icon3.png" alt="Catalog item">
                </a>
            </li>
            <li class="category-item">
                <a href="#" @click.prevent="scrollTo('catalog3')">
                    <img src="@/assets/img/catalog_icon4.png" alt="Catalog item">
                </a>
            </li>
            <li class="category-item">
                <a href="#" @click.prevent="scrollTo('catalog4')">
                    <img src="@/assets/img/catalog_icon5.png" alt="Catalog item">
                </a>
            </li>
            <li class="category-item">
                <a href="#" @click.prevent="scrollTo('catalog5')">
                    <img src="@/assets/img/catalog_icon6.png" alt="Catalog item">
                </a>
            </li>
        </ul>
    </div>
    <div class="container">
        <div class="category-section" :id="`catalog${index}`" v-for="(category, index) in this.sectionList" :key="category.subCatalog">
            <div class="category-section_text">
                <h3>
                    {{ category.title }}
                </h3>
                <p>
                    {{ category.descr }}
                </p>
            </div>
            <ul class="category-items">
                <li class="category-item1" @click.prevent="openPopApp(item.bar, 'card')" :id="item.bar" v-for="item in this.catalogList.filter((item) => item.category.toLowerCase() === category.subCatalog.toLowerCase())" :key="item.id">
                    <div class="category-img" v-if="this.imgList">
                        <div class="category-img_head" :style="`background:url('https://nash.enott.com.ua/api/upload/${item.img}')center center/100% no-repeat;`"></div>
                        <div class="category-img_list">
                            <div class="category-img_item" v-for="(img, index) in this.imgList.filter((img) => img.name === item.name && img.img != item.img)" :key="index" :style="`background:url('https://nash.enott.com.ua/api/upload/${img.img}')center center/cover no-repeat;`"></div>
                        </div>
                    </div>
                    <h3 class="category-name">
                        {{ item.name }}
                    </h3>
                </li>
            </ul>
            <div v-if="category.image" class="category-item_head__img" :style="`background:url('https://nash.enott.com.ua/api/upload/${category.image}')center center/cover no-repeat;`"></div>
        </div>
    </div>
    <div class="container">
        <div class="category-popApp" v-if="this.popApp">
            <div class="popApp-content" v-for="item in popAppList" :key="item.bar">
                <img src="@/assets/img/close.png" alt="Close" class="popApp-content_close" @click.prevent="closePopApp()">
                <div class="popApp-content_info">
                    <img src="@/assets/img/popContent.png" alt="Content" v-if="item.stamp1 != ''">
                    <img src="@/assets/img/popContent1.png" alt="Content" v-if="item.stamp2 != ''">
                    <img src="@/assets/img/popContent2.png" alt="Content" v-if="item.stamp3 != ''">
                </div>
                <img src="@/assets/img/popIcon.png" alt="Icon" class="popApp-conten_icon" v-if="item.stamp4 != ''">
                    <div class="popApp-item">
                    <h3 class="popApp-name">
                        {{ item.name }}
                    </h3>
                    <p class="popApp-category">
                        {{ item.subCategory }}
                    </p>
                    <div class="popApp-headImg" :style="`background:url('https://nash.enott.com.ua/api/upload/${item.img}')center center/100% no-repeat;`"></div>
                    <div class="popApp-subImg">
                        <div v-for="image in this.popAppImages" :key="image.id" :style="`background:url('https://nash.enott.com.ua/api/upload/${image.image}')center center/cover no-repeat;`" :alt="image.image" :class="`${item.img == image.image ? 'popApp-subImg_img__active' : ''}`" class="popApp-subImg_img"></div>
                    </div>
                </div>
                <div class="popApp-descr">
                    <div class="popApp-descr_text" v-html="item.descr"></div>
                    <div class="popApp-descr_expire">
                        <p class="popApp-descr_title">
                            Термін придатності
                        </p>
                        <p class="popApp-descr_expire__text" v-if="item.Expiration">
                            <img src="@/assets/img/fridge.png" alt="Fridge">
                            {{ item.Expiration }}
                        </p>
                        <p class="popApp-descr_expire__text" v-if="item.Expiration1">
                            <img src="@/assets/img/sun.png" alt="Sun">
                            {{ item.Expiration1 }}
                        </p>
                        <p class="popApp-descr_expire__text" v-if="item.Expiration2">
                            <img src="@/assets/img/time.png" alt="Sun">
                            {{ item.Expiration2 }}
                        </p>
                    </div>
                    <div class="popApp-descr_boxes">
                        <p class="popApp-descr_title">
                            Паковання
                        </p>
                        <ul class="popApp-descr_list">
                            <li class="popApp-descr_item">
                                <img src="@/assets/img/box1.png" alt="Boxes">
                                <p>
                                    Картонна коробка міні 
                                </p>
                                <span>
                                    {{ item.box1 }}
                                </span>
                            </li>
                            <li class="popApp-descr_item">
                                <img src="@/assets/img/box2.png" alt="Boxes">
                                <p>
                                    Картонна коробка максі 
                                </p>
                                <span>
                                    {{ item.box2 }}
                                </span>
                            </li>
                            <li class="popApp-descr_item">
                                <img src="@/assets/img/box3.png" alt="Boxes">
                                <p>
                                    Картонна коробка Опт
                                </p>
                                <span>
                                    {{ item.box3 }}
                                </span>
                            </li>
                            <li class="popApp-descr_item">
                                <img src="@/assets/img/box4.png" alt="Boxes">
                                <p>
                                    Картонна коробка
                                </p>
                                <span>
                                    {{ item.box4 }}
                                </span>
                            </li>
                            <li class="popApp-descr_item">
                                <img src="@/assets/img/box5.png" alt="Boxes">
                                <p>
                                    Прозорий пакет
                                </p>
                                <span>
                                    {{ item.box5 }}
                                </span>
                            </li>
                            <li class="popApp-descr_item">
                                <img src="@/assets/img/box6.png" alt="Boxes">
                                <p>
                                    Прозорий пакет
                                </p>
                                <span>
                                    {{ item.box6 }}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
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
            sectionList: [],
            popApp: false,
            popAppList: [],
            popAppImages: [],
            openedId: false
        }
    },
    methods:{
        scrollTo(id){
            window.scrollTo({
                top: document.getElementById(id).offsetTop,
                left: 0,
                behavior: "smooth",
            });
        },
        openPopApp(bar, text){
            this.popApp = bar
            this.popAppList = []
            this.$store.dispatch('setLoader', true);
            axios.get('https://nash.enott.com.ua/api/catalogName/' + bar)
            .then(response => {
                this.popAppList = response.data.item;
                this.popAppImages = response.data.imgArray;
                this.$store.dispatch('setLoader', false);
                if(this.popAppImages.length == 1){
                    this.popAppImages = []
                }
            })
            if(text === 'card'){
                this.openedId = bar
            }
            window.scrollTo(0, 0);
        },
        closePopApp(){
            this.popApp = false
            this.popAppList = [];
            document.getElementById(this.openedId).scrollIntoView();
        }
    },
    mounted(){
        this.screenWidth = screen.width
        this.screenWidth = screen.width
        axios.get('https://nash.enott.com.ua/api/catalogNames')
        .then(response => {
            this.catalogList = response.data.itemList;
            console.log(response.data.itemList)
            this.imgList = response.data.imgList;
            this.sectionList = response.data.infoList;
            this.$store.dispatch('setLoader', false);
        })
        this.$store.dispatch('setVisibleMenu', false);
    }
}
</script>

<style>

</style>