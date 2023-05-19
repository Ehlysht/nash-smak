<template>
  <section class="item">
    <div class="container">
        <route v-for="route in this.goodsList" :key="route.bar" catalog="Goods" mainPage="Онлайн крамниця" :routeName="route.category" :routeSecondName="route.name"/>
        <div class="item-content">
            <div class="item-img" id="item-img">
                <div class="item-img_scroll">
                    <div class="item-img_main">
                        <div :style="`background: url('https://nash.enott.com.ua/api/upload/${this.itemImage}')left top/cover no-repeat;`" class="img_main"></div>
                    </div>
                    <div class="item-img_array">
                        <div @click.prevent="changeImage(img.img)" v-for="img in this.imageArrays" :key="img.img" :class="`${this.itemImage == img.img ? 'img_array_active' : ''}`" :style="`background: url('https://nash.enott.com.ua/api/upload/${img.img}')left top/cover no-repeat;`"></div>
                    </div>
                </div>
            </div>
            <div class="item-info" v-for="item in this.goodsList" :key="item.bar">
                <h2 class="item-title">
                    {{ item.name }}
                </h2>
                <p class="item-subTitle">
                    З АРОМАТОМ ПРЯЖЕНОГО МОЛОКА
                </p>
                <p class="item-descr">
                    {{ item.shortDescr }}
                </p>
                <p class="item-descr">
                    Термін придатності {{ item.еxpiration }}
                </p>
                <p class="tasty-descr">
                    Смак:
                </p>
                <ul class="item-tasty" v-for="route in this.goodsList" :key="route.bar">
                    <li v-for="item in tasty" :key="item.bar" :class="`${item.tastyName == route.subCategory ? 'tasty-active' : ''}`">
                        <router-link class="tasty-link" :to="`/Goods/${route.category}/${item.bar}`" v-if="item.exist">
                            <img :src="`https://nash.enott.com.ua/api/upload/${item.img}`" alt="" class="tasty-img">
                        </router-link>
                    </li>
                </ul>
                <p class="tasty-descr">
                    Оберіть вагу:
                </p>
                <ul class="item-weight" v-for="route in this.goodsList" :key="route.bar">
                    <li v-for="(item, index) in this.weightList" :key="item.bar">
                        <router-link :to="`/Goods/${route.category}/${item.bar}`" class="weight-link" :class="`${item.weight == route.weight ? 'weight-link_active' : ''}`">
                            <img src="@/assets/img/weight.png" alt="weight" :style="`width: calc(25% + (${index + 1} * 2%)); max-width:57px`">
                            {{ item.weight }}г
                        </router-link>
                    </li>
                </ul>
                <div class="item-action">
                    <p class="action-price">
                        {{ item.price }} <span>грн</span>
                    </p>
                    <div class="action-qtys" v-show="this.visQty != 'no'">
                        <img src="@/assets/img/item-arrow.png" alt="Minus" class="action-qty_change action-qty__minus" @click.prevent="changeQty('minus')">
                        <input type="number" class="action-qty_input" id="changeInput" min="1" oninput="this.value = Math.abs(this.value)" v-model="this.itemQty">
                        <img src="@/assets/img/item-arrow.png" style="transform: rotate(180deg);" alt="Plus" class="action-qty_change action-qty_plus" @click.prevent="changeQty('plus')">
                    </div>
                    <button v-wave class="action-btn" @click.prevent="addCart" v-if="this.buyed">
                        Купити <img src="@/assets/img/bag.png" alt="Bag">
                    </button>
                    <button class="action-btn" v-if="!this.buyed">
                        В кошику <img src="@/assets/img/buyed.png" alt="Bag" style="filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7471%) hue-rotate(314deg) brightness(100%) contrast(115%);">
                    </button>
                </div>
                <ul class="item-descr_list" v-if="this.screenWidth > 1050">
                    <li class="descr-item" @click.prevent="descrOpen('recipe')">
                        <div class="descr-text">
                            <p>
                                Склад
                            </p>
                            <img src="@/assets/img/descr-plus.png" alt="plus" v-if="this.descrValue != 'recipe'">
                            <img src="@/assets/img/descr-minus.png" alt="minus" v-if="this.descrValue == 'recipe'">
                        </div>
                        <transition name="fadeHeight"> 
                        <div class="descr-content" v-if="this.descrValue == 'recipe'">
                            <div class="descr-images">
                                <img src="@/assets/img/icon1.png" alt="Icon1">
                                <img src="@/assets/img/icon2.png" alt="Icon2">
                                <img src="@/assets/img/icon3.png" alt="Icon3">
                                <img src="@/assets/img/icon4.png" alt="Icon4">
                            </div>
                            <p v-html="item.recipe"></p>
                        </div>
                        </transition>
                    </li>
                    <li class="descr-item" @click.prevent="descrOpen('nutritional')">
                        <div class="descr-text">
                            <p>
                                Харчова цінність
                            </p>
                            <img src="@/assets/img/descr-plus.png" alt="plus" v-if="this.descrValue != 'nutritional'">
                            <img src="@/assets/img/descr-minus.png" alt="minus" v-if="this.descrValue == 'nutritional'">
                        </div>
                        <transition name="fadeHeight"> 
                        <ul class="descr-content" v-if="this.descrValue == 'nutritional'">
                            <li class="descr-content_title">
                                <p>
                                    Харчова цінність
                                </p>
                                <p>
                                    на 100 г
                                </p>
                            </li>
                            <li class="descr-content_item">
                                <p>
                                    Енергетична цінність
                                </p>
                                <p>
                                    {{ item.nutritionalValue2 }}
                                </p>
                            </li>
                            <li class="descr-content_item">
                                <p>
                                    Калорійність
                                </p>
                                <p>
                                    {{ item.nutritionalValue1 }}
                                </p>
                            </li>
                            <li class="descr-content_item">
                                <p>
                                    Жирів
                                </p>
                                <p>
                                    {{ item.nutritionalValue3 }}
                                </p>
                            </li>
                            <li class="descr-content_item">
                                <p>
                                    з яких насичених
                                </p>
                                <p>
                                    {{ item.nutritionalValue4 }}
                                </p>
                            </li>
                            <li class="descr-content_item">
                                <p>
                                    Вуглеводів
                                </p>
                                <p>
                                    {{ item.nutritionalValue4 }}
                                </p>
                            </li>
                            <li class="descr-content_item">
                                <p>
                                    з яких цукрів
                                </p>
                                <p>
                                    {{ item.nutritionalValue5 }}
                                </p>
                            </li>
                            <li class="descr-content_item">
                                <p>
                                    Білків
                                </p>
                                <p>
                                    {{ item.nutritionalValue6 }}
                                </p>
                            </li>
                            <li class="descr-content_item">
                                <p>
                                    Сіль
                                </p>
                                <p>
                                    {{ item.nutritionalValue7 }}
                                </p>
                            </li>
                        </ul>
                        </transition>
                    </li>
                    <li class="descr-item" @click.prevent="descrOpen('roles')">
                        <div class="descr-text">
                            <p>
                                Умови зберігання
                            </p>
                            <img src="@/assets/img/descr-plus.png" alt="plus" v-if="this.descrValue != 'roles'">
                            <img src="@/assets/img/descr-minus.png" alt="minus" v-if="this.descrValue == 'roles'">
                        </div>
                        <transition name="fadeHeight"> 
                        <div class="descr-content" v-if="this.descrValue == 'roles'">
                            <div class="descr-roles">
                                <p class="descr-temperature">
                                    <img src="@/assets/img/temp.png" alt="temperature"> {{ item.temperature }}
                                </p>
                                <p class="descr-temperature">
                                    <img src="@/assets/img/humidity.png" alt="temperature"> {{ item.humidity * 100}} %
                                </p>
                            </div>
                            <div class="descr-roles_text">
                                {{ item.storeRoles_descr }}
                            </div>
                        </div>
                        </transition>
                    </li>
                    <li class="descr-item" @click.prevent="descrOpen('delivery')">
                        <div class="descr-text">
                            <p>
                                Доставка та оплата
                            </p>
                            <img src="@/assets/img/descr-plus.png" alt="plus" v-if="this.descrValue != 'delivery'">
                            <img src="@/assets/img/descr-minus.png" alt="minus" v-if="this.descrValue == 'delivery'">
                        </div>
                        <transition name="fadeHeight"> 
                        <div class="descr-content" v-if="this.descrValue == 'delivery'">
                            <div class="descr-content_item">
                                <h4>
                                    ОФОРМЛЕННЯ ЗАМОВЛЕНЬ
                                </h4>
                                <p class="descr-delivery_text">
                                    Тривалість обробки замовлення від 1-го до 3х робочих днів. Товари з позначкою "під замовлення" потребують додатковий час, приблизно 1 - 3 дні на виготовлення.
                                </p>
                                <p class="descr-delivery_text">
                                    Замовлення, зроблені до 12:00, відправляються в той самий день. Замовлення, зроблені після 12:00, будуть відправлені на наступний день. Замовлення, які зроблені у пятницю після 12:00 будуть відправлені у понеділок.
                                </p>
                            </div>
                            <div class="descr-content_item">
                                <h4>
                                    ОПЛАТА
                                </h4>
                                <p class="descr-delivery_text">
                                    Способи оплати: 
                                    <span>- банківською карткою VISA / MasterCard (відразу на сайті)</span>
                                    <span>- за банківськими реквізитами (оплата після звязку з менеджером)</span>
                                </p>
                                <p class="descr-delivery_text">
                                    Оплату можна здійснити відразу карткою Mastercard або Visa, або отримати рахунок після підтвердження замовлення менеджером Інтернет-магазину. 
                                </p>
                            </div>
                            <div class="descr-content_item" >
                                <h4>
                                    ДОСТАВКА
                                </h4>
                                <p class="descr-delivery_text">
                                    Способи доставки:
                                    <span>- Відправка службою "Нова пошта"</span>
                                    <span>- Відправка службою "Укрпошта"</span>
                                    <span>- Самовивіз із складу за адресою смт. Любар, вул Перемоги, 1</span>
                                </p>
                            </div>
                        </div>
                        </transition>
                    </li>
                </ul>
            </div>
        </div>
        <div v-for="item in this.goodsList" :key="item.bar">
            <ul class="item-descr_list" v-if="this.screenWidth <= 1050">
                <li class="descr-item" @click.prevent="descrOpen('recipe')">
                    <div class="descr-text">
                        <p>
                            Склад
                        </p>
                        <img src="@/assets/img/descr-plus.png" alt="plus" v-if="this.descrValue != 'recipe'">
                        <img src="@/assets/img/descr-minus.png" alt="minus" v-if="this.descrValue == 'recipe'">
                    </div>
                    <transition name="fadeHeight"> 
                    <div class="descr-content" v-if="this.descrValue == 'recipe'">
                        <div class="descr-images">
                            <img src="@/assets/img/icon1.png" alt="Icon1">
                            <img src="@/assets/img/icon2.png" alt="Icon2">
                            <img src="@/assets/img/icon3.png" alt="Icon3">
                            <img src="@/assets/img/icon4.png" alt="Icon4">
                        </div>
                        <p v-html="item.recipe"></p>
                    </div>
                    </transition>
                </li>
                <li class="descr-item" @click.prevent="descrOpen('nutritional')">
                    <div class="descr-text">
                        <p>
                            Харчова цінність
                        </p>
                        <img src="@/assets/img/descr-plus.png" alt="plus" v-if="this.descrValue != 'nutritional'">
                        <img src="@/assets/img/descr-minus.png" alt="minus" v-if="this.descrValue == 'nutritional'">
                    </div>
                    <transition name="fadeHeight"> 
                    <ul class="descr-content" v-if="this.descrValue == 'nutritional'">
                        <li class="descr-content_title">
                            <p>
                                Харчова цінність
                            </p>
                            <p>
                                на 100 г
                            </p>
                        </li>
                        <li class="descr-content_item">
                            <p>
                                Енергетична цінність
                            </p>
                            <p>
                                {{ item.nutritionalValue2 }}
                            </p>
                        </li>
                        <li class="descr-content_item">
                            <p>
                                Калорійність
                            </p>
                            <p>
                                {{ item.nutritionalValue1 }}
                            </p>
                        </li>
                        <li class="descr-content_item">
                            <p>
                                Жирів
                            </p>
                            <p>
                                {{ item.nutritionalValue3 }}
                            </p>
                        </li>
                        <li class="descr-content_item">
                            <p>
                                з яких насичених
                            </p>
                            <p>
                                {{ item.nutritionalValue4 }}
                            </p>
                        </li>
                        <li class="descr-content_item">
                            <p>
                                Вуглеводів
                            </p>
                            <p>
                                {{ item.nutritionalValue4 }}
                            </p>
                        </li>
                        <li class="descr-content_item">
                            <p>
                                з яких цукрів
                            </p>
                            <p>
                                {{ item.nutritionalValue5 }}
                            </p>
                        </li>
                        <li class="descr-content_item">
                            <p>
                                Білків
                            </p>
                            <p>
                                {{ item.nutritionalValue6 }}
                            </p>
                        </li>
                        <li class="descr-content_item">
                            <p>
                                Сіль
                            </p>
                            <p>
                                {{ item.nutritionalValue7 }}
                            </p>
                        </li>
                    </ul>
                    </transition>
                </li>
                <li class="descr-item" @click.prevent="descrOpen('roles')">
                    <div class="descr-text">
                        <p>
                            Умови зберігання
                        </p>
                        <img src="@/assets/img/descr-plus.png" alt="plus" v-if="this.descrValue != 'roles'">
                        <img src="@/assets/img/descr-minus.png" alt="minus" v-if="this.descrValue == 'roles'">
                    </div>
                    <transition name="fadeHeight"> 
                    <div class="descr-content" v-if="this.descrValue == 'roles'">
                        <div class="descr-roles">
                            <p class="descr-temperature">
                                <img src="@/assets/img/temp.png" alt="temperature"> {{ item.temperature }}
                            </p>
                            <p class="descr-temperature">
                                <img src="@/assets/img/humidity.png" alt="temperature"> {{ item.humidity * 100}} %
                            </p>
                        </div>
                        <div class="descr-roles_text">
                            {{ item.storeRoles_descr }}
                        </div>
                    </div>
                    </transition>
                </li>
                <li class="descr-item" @click.prevent="descrOpen('delivery')">
                    <div class="descr-text">
                        <p>
                            Доставка та оплата
                        </p>
                        <img src="@/assets/img/descr-plus.png" alt="plus" v-if="this.descrValue != 'delivery'">
                        <img src="@/assets/img/descr-minus.png" alt="minus" v-if="this.descrValue == 'delivery'">
                    </div>
                    <transition name="fadeHeight"> 
                    <div class="descr-content" v-if="this.descrValue == 'delivery'">
                        <div class="descr-content_item">
                            <h4>
                                ОФОРМЛЕННЯ ЗАМОВЛЕНЬ
                            </h4>
                            <p class="descr-delivery_text">
                                Тривалість обробки замовлення від 1-го до 3х робочих днів. Товари з позначкою "під замовлення" потребують додатковий час, приблизно 1 - 3 дні на виготовлення.
                            </p>
                            <p class="descr-delivery_text">
                                Замовлення, зроблені до 12:00, відправляються в той самий день. Замовлення, зроблені після 12:00, будуть відправлені на наступний день. Замовлення, які зроблені у пятницю після 12:00 будуть відправлені у понеділок.
                            </p>
                        </div>
                        <div class="descr-content_item">
                            <h4>
                                ОПЛАТА
                            </h4>
                            <p class="descr-delivery_text">
                                Способи оплати: 
                                <span>- банківською карткою VISA / MasterCard (відразу на сайті)</span>
                                <span>- за банківськими реквізитами (оплата після звязку з менеджером)</span>
                            </p>
                            <p class="descr-delivery_text">
                                Оплату можна здійснити відразу карткою Mastercard або Visa, або отримати рахунок після підтвердження замовлення менеджером Інтернет-магазину. 
                            </p>
                        </div>
                        <div class="descr-content_item" >
                            <h4>
                                ДОСТАВКА
                            </h4>
                            <p class="descr-delivery_text">
                                Способи доставки:
                                <span>- Відправка службою "Нова пошта"</span>
                                <span>- Відправка службою "Укрпошта"</span>
                                <span>- Самовивіз із складу за адресою смт. Любар, вул Перемоги, 1</span>
                            </p>
                        </div>
                    </div>
                    </transition>
                </li>
            </ul>
        </div>
    </div>
    <about/>
    <adv/>
    <most :visibBtn="false"/>
    <insta/>
  </section>
</template>

<script>
import axios from 'axios'
import route from '@/components/route.vue'
import about from '@/components/about.vue'
import adv from '@/components/adv.vue'
import most from '@/components/most.vue'
import insta from '@/components/insta.vue'
export default {
    components: {
        route, about, adv, most, insta
    },
    data(){
        return{
            screenWidth: '',
            goodsList: [],
            mainCategory: '',
            tastyList: [],
            weightList: [],
            allTasty: [],
            itemName: '',
            itemImage: '',
            descrValue: false,
            buyed: true,
            imageArrays: [
                {'img': 'item1.png'},
                {'img': 'item2.png'}
            ],
            itemQty: 1
        }
    },
    computed:{
        tasty(){
            var endList = []
            var checker = false
            for (var i = 0; i < this.allTasty.length; i++){
                checker = false
                if(this.tastyList[0].subCategory){
                    for (var j = 0; j < this.tastyList.length; j++){
                        if(this.allTasty[i].name == this.tastyList[j].subCategory){
                            endList.push({'bar': this.tastyList[j].bar,'tastyName': this.allTasty[i].name, 'img': this.allTasty[i].image, 'exist': true})
                            checker = true
                        }
                    }
                }
            }
            return endList
        }
    },
    methods:{
        handleScroll () {
            if(this.screenWidth > 830){
                var fixedEl = document.querySelector(".item-img_scroll");
                var fixedEl2 = document.querySelector(".about");
                if(fixedEl){
                    if(this.screenWidth >= 1366){
                        var addHeight = 0
                    }else{
                        var addHeight = 50
                    }
                    if (window.scrollY > fixedEl.offsetTop && fixedEl2.getBoundingClientRect().top - fixedEl2.getBoundingClientRect().height > addHeight ) {
                        fixedEl.style.position = 'fixed'; 
                        fixedEl.style.top = '0'; 
                        fixedEl.style.bottom = 'auto';
                        fixedEl.style.width = '45%';
                    }else{
                        fixedEl.style.position = 'absolute'; 
                        fixedEl.style.bottom = '50px';
                        fixedEl.style.top = 'auto'; 
                        fixedEl.style.width = '45%';
                    }
                    if(window.scrollY < 196){
                        fixedEl.style.position = 'static'; 
                        fixedEl.style.width = '100%';
                    }
                }
                
            }
        },
        changeImage(imgName){
            this.itemImage = imgName
        },
        changeQty(mvm){
            if(mvm == 'minus'){
                if(this.itemQty > 1){
                    this.itemQty = this.itemQty - 1
                }else{
                    this.itemQty = 1
                }
            }else{
                this.itemQty = Number(this.itemQty) + 1
            }
        },
        descrOpen(val){
            if(val == this.descrValue){
                this.descrValue = false
            }else{
                this.descrValue = val
            }
        },
        addCart(){
            setTimeout(() => {
                this.buyed = false
            }, 400);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            let formData = new FormData();
            if(JSON.parse(localStorage.getItem('user'))){
                formData.append('email', JSON.parse(localStorage.getItem('user'))[0].email);
            }else{
               alert("please register or login") 
            }
            formData.append('email', JSON.parse(localStorage.getItem('user'))[0].email);
            formData.append('bar', this.$route.params['bar']);
            formData.append('userQty', this.itemQty);
            axios.post('https://nash.enott.com.ua/api/toCart', formData, config)
            .then(response => {
                this.saveMessage = true;
                setTimeout(() => {
                    this.saveMessage = false;
                }, 3000);
                setTimeout(() => {
                    this.buyed = true
                }, 1300);
            })
            this.itemQty = 1
        }
    },  
    watch: {
        $route(to, from) {
            this.isLoading = false
            axios.get('https://nash.enott.com.ua/api/getItem/' + this.$route.params['bar'])
            .then(response => {
                this.goodsList = response.data.Items;
                this.tastyList = response.data.subCategories
                this.weightList = response.data.Weights
                this.itemImage = response.data.mainImg
                this.allTasty = response.data.tastyList
                this.$store.dispatch('setLoader', false);
            })
            this.itemQty = 1
        }
    },
    created () {
        window.addEventListener('scroll', this.handleScroll);
    },
    async mounted(){
        this.screenWidth = screen.width
        await axios.get('https://nash.enott.com.ua/api/getItem/' + this.$route.params['bar'])
        .then(response => {
            this.goodsList = response.data.Items;
            this.tastyList = response.data.subCategories
            this.weightList = response.data.Weights
            this.itemImage = response.data.mainImg
            this.allTasty = response.data.tastyList
            this.$store.dispatch('setLoader', false);
        })
        this.handleScroll()
    }
}
</script>

<style>

</style>