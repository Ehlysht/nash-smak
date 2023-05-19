<template>
    <div :class="`${this.screenWidth <= 1366 ? 'container-fluid' : 'container'}`">
        <ul class="catalog-list">
            <li>
                <router-link to="/Goods/Новинки" class="catalog-item">
                    <img src="@/assets/img/catalog1.png" alt="Catalog Icon" class="catalog-img catalog-item_news">
                    <h3 class="catalog-text" :class="`${this.$route.meta.title == 'Новинки' ? 'catalog-text_active' : ''}`">
                        Новинки
                    </h3>
                </router-link>
            </li>
            <li>
                <router-link to="/Goods/Без начинки" class="catalog-item">
                    <img src="@/assets/img/catalog2.png" alt="Catalog Icon" class="catalog-img">
                    <h3 class="catalog-text" :class="`${this.$route.meta.title == 'Без начинки' ? 'catalog-text_active' : ''}`">
                        Без начинки
                    </h3>
                </router-link>
            </li>
            <li>
                <router-link to="/Goods/З начинкою" class="catalog-item">
                    <img src="@/assets/img/catalog3.png" alt="Catalog Icon" class="catalog-img">
                    <h3 class="catalog-text" :class="`${this.$route.meta.title == 'З начинкою' ? 'catalog-text_active' : ''}`">
                        З начинкою
                    </h3>
                </router-link>
            </li>
            <li>
                <router-link to="/Goods/У глазурі" class="catalog-item">
                    <img src="@/assets/img/catalog4.png" alt="Catalog Icon" class="catalog-img">
                    <h3 class="catalog-text" :class="`${this.$route.meta.title == 'У глазурі' ? 'catalog-text_active' : ''}`">
                        У глазурі
                    </h3>
                </router-link>
            </li>
            <li>
                <router-link to="/Goods/Бісквіти" class="catalog-item">
                    <img src="@/assets/img/catalog5.png" alt="Catalog Icon" class="catalog-img">
                    <h3 class="catalog-text" :class="`${this.$route.meta.title == 'Бісквіти' ? 'catalog-text_active' : ''}`">
                        Бісквіти
                    </h3>
                </router-link>
            </li>
            <li>
                <router-link to="/Goods/Набори" class="catalog-item">
                    <img src="@/assets/img/catalog6.png" alt="Catalog Icon" class="catalog-img catalog-item_all">
                    <h3 class="catalog-text" :class="`${this.$route.meta.title == 'Набори' ? 'catalog-text_active' : ''}`">
                        Набори
                    </h3>
                </router-link>
            </li>
            <li>
                <router-link to="/Goods/До посту" class="catalog-item">
                    <img src="@/assets/img/catalog7.png" alt="Catalog Icon" class="catalog-img">
                    <h3 class="catalog-text" :class="`${this.$route.meta.title == 'До посту' ? 'catalog-text_active' : ''}`">
                        До посту
                    </h3>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            screenWidth: ''
        }
    },
    mounted(){
        this.screenWidth = screen.width
    }
}
</script>

<style>

</style>