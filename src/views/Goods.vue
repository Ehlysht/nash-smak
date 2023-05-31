<template>
  <section class="goods" id="goods">
    <div class="container">
        <route mainPage="Онлайн крамниця" :routeName="this.$route.meta.title"/>
        <div class="goods-info">
            <div class="goods-texts">
                <h2 class="goods-title">
                    Онлайн крамниця
                </h2>
                <p class="goods-text">
                    Смаколики які ви можете придбати у нас в онлайн крамниці
                </p>
            </div>
            <button class="btn goods-btn">
                <router-link to="/Catalog/Каталог">
                    Переглянути весь каталог <img src="@/assets/img/arrow-right.svg" alt="Arrow">
                </router-link>
            </button>
        </div>
    </div>
    <catalog/>
    <div class="container">
        <div class="goods-content">
            <div class="goods-filters" :class="`${this.openFilter? 'goods-filters_active' : ''}`">
                <button class="btn filter-btn" :class="`${this.openFilter? 'filter-btn_active' : ''}`" @click.prevent="this.openFilter = !this.openFilter" v-if="this.screenWidth <= 1000">
                    <a>
                        <img src="@/assets/img/filter.svg" alt="Filter" class="filter-btn_filter">
                        Фільтри
                        <img src="@/assets/img/arrow-down.svg" alt="arrow" class="filter-btn_arrow">
                    </a>
                </button>
                <div class="goods-filters_content" v-if="this.screenWidth > 1000 || this.openFilter">
                    <p class="filters-title">
                        Вага
                    </p>
                    <div class="filters-list">
                        <label class="container-check filters-item" for="weight1">
                            <input type="checkbox" id="weight1" value="weight1" v-model="this.filtersList"><p>від 1 г до 150г</p>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container-check filters-item" for="weight2">
                            <input type="checkbox" id="weight2" value="weight2" v-model="this.filtersList"><p>від 150 г до 300 г</p>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container-check filters-item" for="weight3">
                            <input type="checkbox" id="weight3" value="weight3" v-model="this.filtersList"><p>від 300 г до 500 г</p>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container-check filters-item" for="weight4">
                            <input type="checkbox" id="weight4" value="weight4" v-model="this.filtersList"><p>від 500 г до 2000 г</p>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container-check filters-item" for="weight5">
                            <input type="checkbox" id="weight5" value="weight5" v-model="this.filtersList"><p>від 2000 г</p>
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <p class="filters-title filters-second">
                        Пакування
                    </p>
                    <div class="filters-list">
                        <label class="container-check filters-item" for="pack1">
                            <input type="checkbox" id="pack1" value="гофрокоробка з віконичком" v-model="this.filtersList"><p>гофрокоробка з віконичком</p>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container-check filters-item" for="pack2">
                            <input type="checkbox" id="pack2" value="гофрокоробка лоток" v-model="this.filtersList"><p>гофрокоробка лоток</p>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container-check filters-item" for="pack3">
                            <input type="checkbox" id="pack3" value="картонна коробка" v-model="this.filtersList"><p>картонна коробка</p>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container-check filters-item" for="pack4">
                            <input type="checkbox" id="pack4" value="флекс (мягка упаковка)" v-model="this.filtersList"><p>флекс (мягка упаковка)</p>
                            <span class="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>
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
    </div>
  </section>
</template>

<script>
import catalog from '@/components/catalog.vue'
import route from '@/components/route.vue'
import axios from 'axios'
export default {
    components: {
        catalog, route
    },
    data(){
        return{
            screenWidth: '',
            openFilter: false,
            goodsList: [],
            filtersList: [],
            allGoods: [],
        }
    },
    computed:{
        filteredList(){
            var filtered = []
            var fromWeight = 0
            var toWeight = 9999
            var packVal = 'all'
            if(this.filtersList.length){
                for(let i = 0; i < this.filtersList.length; i++){
                    if(this.filtersList[i] == 'weight1'){
                        fromWeight = 0
                        toWeight = 150
                    }
                    if(this.filtersList[i] == 'weight2'){
                        fromWeight = 151
                        toWeight = 300
                    }
                    if(this.filtersList[i] == 'weight3'){
                        fromWeight = 301
                        toWeight = 500
                    }
                    if(this.filtersList[i] == 'weight4'){
                        fromWeight = 501
                        toWeight = 2000
                    }
                    if(this.filtersList[i] == 'weight5'){
                        fromWeight = 2000
                        toWeight = 9999
                    }
                    if(this.filtersList[i] == 'гофрокоробка з віконичком'){
                        packVal = 'гофрокоробка з віконичком'
                    }
                    if(this.filtersList[i] == 'гофрокоробка лоток'){
                        packVal = 'гофрокоробка лоток'
                    }
                    if(this.filtersList[i] == 'картонна коробка'){
                        packVal = 'картонна коробка'
                    }
                    if(this.filtersList[i] == 'флекс (мягка упаковка)'){
                        packVal = 'флекс (мягка упаковка)'
                    }
                    for(let j = 0; j < this.goodsList.length; j++){
                        var wCheck = false
                        var pCheck = false
                        var weightList = []
                        var packList = []
                        weightList = this.goodsList[j].weightList.split(',');
                        for(let w = 1; w < weightList.length; w++){
                            if(weightList[w] >= fromWeight && weightList[w] <= toWeight ){
                                wCheck = true
                            }
                        }
                        packList = this.goodsList[j].packing.split(',');
                        for(let w = 0; w < packList.length; w++){
                            if(packList[w].toLowerCase() == packVal.toLowerCase()){
                                pCheck = true
                            }
                        }
                        if(wCheck && pCheck){
                            const found = filtered.some(el => el.name === this.goodsList[j].name);
                            if(!found){
                                filtered.push(this.goodsList[j])
                            }
                        }
                    }
                }
            }else{
                filtered = this.goodsList
            }
            return filtered    
        }
    },
    watch: {
        $route(to, from) {
            axios.get('https://nash.enott.com.ua/api/goodsNames/' + this.$route.params['category'])
            .then(response => {
                this.goodsList = response.data;
            })
        }
    },
    mounted(){
        this.screenWidth = screen.width
        axios.get('https://nash.enott.com.ua/api/goodsNames/' + this.$route.params['category'])
        .then(response => {
            this.goodsList = response.data;
            this.$store.dispatch('setLoader', false);
        })
    }
}
</script>

<style>

</style>