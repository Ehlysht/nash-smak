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
                            <input type="checkbox" id="weight1" @click="addToList('weight', 'weight1')"><p>від 1 г до 150г</p>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container-check filters-item" for="weight2">
                            <input type="checkbox" id="weight2" @click="addToList('weight', 'weight2')"><p>від 150 г до 300 г</p>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container-check filters-item" for="weight3">
                            <input type="checkbox" id="weight3" @click="addToList('weight', 'weight3')"><p>від 300 г до 500 г</p>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container-check filters-item" for="weight4">
                            <input type="checkbox" id="weight4" @click="addToList('weight', 'weight4')"><p>від 500 г до 2000 г</p>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container-check filters-item" for="weight5">
                            <input type="checkbox" id="weight5" @click="addToList('weight', 'weight5')"><p>від 2000 г</p>
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <p class="filters-title filters-second">
                        Пакування
                    </p>
                    <div class="filters-list">
                        <label class="container-check filters-item" :for="`pack${index}`" v-for="(pack, index) in this.packingList" :key="index">
                            <input type="checkbox" :id="`pack${index}`" :value="pack.packing" @click="addToList('pack', pack.packing)"><p> {{ pack.packing }} </p>
                            <span class="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>
            <ul class="goods-list">
                <li class="goods-item" v-for="item in filteredList" :key="item.id">
                    <router-link :to="`/Goods/${item.name}/${item.bar}`" class="goods-link">
                        <div class="goods-img">
                            <div class="goods-item_stamps__list">
                                <p class="goods-item_stamps goods-item_discount" v-if="item.stamps2 != 0">-{{ item.stamps2 }} %</p>
                                <img class="goods-item_stamps" src="https://nash.enott.com.ua/api/upload/stamps2.png" alt="Бестселлер" v-if="item.stamps1 != 0">
                                <img class="goods-item_stamps" src="https://nash.enott.com.ua/api/upload/stamps3.png" alt="Вегетаріанське" v-if="item.vegan">
                                <img class="goods-item_stamps" src="https://nash.enott.com.ua/api/upload/stamps4.png" alt="Пісне" v-if="item.category == 'До посту'">
                            </div>
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
            packingList: []
        }
    },
    computed:{
        filteredList(){
            var filtered = []
            var fromWeight = false
            var toWeight = false
            var less = false
            var larger = false
            var packVal = 'all'
            if(this.filtersList.length){
                for(let i = 0; i < this.filtersList.length; i++){
                    for(let l = 0; l < this.filtersList.length; l++){
                        if(this.filtersList[l].weight == 'weight1'){
                            less = 0
                            larger = 150
                        }
                        if(this.filtersList[l].weight == 'weight2'){
                            less = 151
                            larger = 300
                        }
                        if(this.filtersList[l].weight == 'weight3'){
                            less = 301
                            larger = 500
                        }
                        if(this.filtersList[l].weight == 'weight4'){
                            less = 501
                            larger = 2000
                        }
                        if(this.filtersList[l].weight == 'weight5'){
                            less = 2000
                            larger = 9999
                        }
                        if(fromWeight > less || !fromWeight){
                            fromWeight = less
                        }
                        if(toWeight < larger || !toWeight){
                            toWeight = larger
                        }
                    }
                    if(!less && !larger){
                        fromWeight = 0
                        toWeight = 9999
                    }
                    if(this.filtersList[i].pack){
                        packVal = this.filtersList[i].pack
                    }
                    for(let j = 0; j < this.goodsList.length; j++){
                        var filtCheck1 = false
                        var filtCheck2 = false
                        var weightList = []
                        var packList = []
                        var filterList = []
                        weightList = this.goodsList[j].weightList.split(',');
                        packList = this.goodsList[j].packing.split(',');
                        filterList = weightList.concat(packList)
                        for(let w = 1; w < filterList.length; w++){
                            if(filterList[w] >= fromWeight && filterList[w] <= toWeight ){
                                filtCheck1 = filterList[w]
                            }
                            if(filterList[w] == packVal){
                                filtCheck2 = filterList[w]
                            }
                        }
                        if(filtCheck1 && filtCheck2){
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
            this.$store.dispatch('setVisibleMenu', false);
        }
    },
    methods:{
        addToList(key, val){
            var array = []
            var array = this.filtersList
            var exist = false
            for (let i = 0; i < array.length; i++){
                if(array[i].pack == val || array[i].weight == val){
                    array.splice(i, 1);
                    this.filtersList = array
                    exist = true
                }
            }
            if(!exist){
                if(key == 'pack'){
                    this.filtersList.push({'pack': val})
                }else{
                    this.filtersList.push({'weight': val})
                }
            }
        }
    },
    mounted(){
        this.screenWidth = screen.width
        axios.get('https://nash.enott.com.ua/api/goodsNames/' + this.$route.params['category'])
        .then(response => {
            this.goodsList = response.data;
            this.$store.dispatch('setLoader', false);
        })
        axios.get('https://nash.enott.com.ua/api/getPacking')
        .then(response => {
            this.packingList = response.data;
        })
        this.$store.dispatch('setVisibleMenu', false);
    }
}
</script>

<style>

</style>