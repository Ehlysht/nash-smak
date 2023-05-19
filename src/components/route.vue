<template>
  <ul class="route-list">
    <li class="route-item">
        <router-link to="/">
            Головна <img src="@/assets/img/route-arrow.svg" alt="Arrow Right">
        </router-link>
    </li>
    <li class="route-item" v-if="this.mainPage && this.routeName != 'Онлайн крамниця'">
        <router-link :to="`/Goods/Онлайн крамниця`">
            Онлайн крамниця <img src="@/assets/img/route-arrow.svg" alt="Arrow Right">
        </router-link>
    </li>
    <li class="route-item">
        <a href="#" v-if="!this.routeSecondName">
            {{ this.routeName }} <img v-if="this.routeSecondName" src="@/assets/img/route-arrow.svg" alt="Arrow Right">
        </a>
        <router-link :to="`/${this.catalog}/${this.routeName}`" v-if="this.routeSecondName">
            {{ this.routeName }} <img v-if="this.routeSecondName" src="@/assets/img/route-arrow.svg" alt="Arrow Right">
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
    props: ['routeName', 'routeSecondName', 'catalog', 'mainPage']
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
    .route-item>a>img{
        margin: 0 8px;
    }
</style>