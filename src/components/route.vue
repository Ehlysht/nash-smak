<template>
  <ul class="route-list">
    <li class="route-item">
        <router-link to="/">
            Головна <img src="@/assets/img/route-arrow.svg" alt="Arrow Right">
        </router-link>
    </li>
    <li class="route-item" v-if="this.mainPage && this.routeName != 'Онлайн крамниця' && !this.routeName2 && !this.routeName3">
        <router-link :to="`/Goods/Онлайн крамниця`">
            Онлайн крамниця <img src="@/assets/img/route-arrow.svg" alt="Arrow Right">
        </router-link>
    </li>
    <li class="route-item" v-if="this.mainPage2 && this.routeName2 != 'Каталог' && !this.routeName && !this.routeName3">
        <router-link :to="`/Goods/Онлайн крамниця`">
            Каталог <img src="@/assets/img/route-arrow.svg" alt="Arrow Right">
        </router-link>
    </li>
    <li class="route-item" v-if="this.mainPage3 && !this.routeName && !this.routeName3">
        <router-link :to="`/Goods/Онлайн крамниця`">
            Каталог <img src="@/assets/img/route-arrow.svg" alt="Arrow Right">
        </router-link>
    </li>
    <li class="route-item" v-if="this.mainPage3 && this.routeName && !this.routeName2">
        <router-link :to="`/Vacancy`">
            Вакансії <img src="@/assets/img/route-arrow.svg" alt="Arrow Right">
        </router-link>
    </li>
    <li class="route-item">
        <a href="#" v-if="!this.routeSecondName && this.routeName">
            {{ this.routeName }} <img v-if="this.routeSecondName" src="@/assets/img/route-arrow.svg" alt="Arrow Right">
        </a>
        <router-link :to="`/${this.catalog}/${this.routeName}`" v-if="this.routeSecondName && this.routeName">
            {{ this.routeName }} <img v-if="this.routeSecondName" src="@/assets/img/route-arrow.svg" alt="Arrow Right">
        </router-link>
        <a href="#" v-if="!this.routeSecondName && this.routeName2">
            {{ this.routeName2 }} <img v-if="this.routeSecondName" src="@/assets/img/route-arrow.svg" alt="Arrow Right">
        </a>
        <router-link :to="`/${this.catalog}/${this.routeName}`" v-if="this.routeSecondName && this.routeName2">
            {{ this.routeName2 }} <img v-if="this.routeSecondName" src="@/assets/img/route-arrow.svg" alt="Arrow Right">
        </router-link>
    </li>
    <li class="route-item" v-if="this.routeSecondName">
        <router-link to="/">
            {{ this.routeSecondName }}
        </router-link>
    </li>
  </ul>
</template>

<script>
export default {
    props: ['routeName', 'routeName2', 'routeSecondName', 'catalog', 'mainPage', 'mainPage2', 'mainPage3']
}
</script>

<style scoped>
    .route-list{
        display: flex;
        align-items: center;
    }
    .route-item>a{
        font-size: 12px;
        line-height: 16px;
        color: #470D04;
        display: flex;
        align-items: center;
    }
    .route-item a:hover{
        filter: brightness(0) saturate(100%) invert(38%) sepia(37%) saturate(5553%) hue-rotate(125deg) brightness(97%) contrast(101%);
    }
    .route-item>a>img{
        margin: 0 8px;
    }
    @media (max-width: 480px) {
        .route-list li{
            display: none;
        }
        .route-list li:nth-last-child(2), .route-list li:last-child{
            display: block;
        }
    }
</style>