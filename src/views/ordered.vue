<template>
  <section class="ordered" id="ordered">
    <div class="container">
        <div class="ordered-content">
            <div class="ordered-cart">
                <h3 class="ordered-title">
                    Дякуємо за замовлення!
                </h3>
                <p class="ordered-alert">
                    Ми вдячні за ваш вибір. Зараз ми працюємо над його обробкою та підготовкою до відправлення. Ви отримаєте повідомлення з подальшими деталями найближчим часом.
                </p>
                <h4 class="ordered-subtitle">
                    Ваше  замовлення
                </h4>
                <ul class="ordered-list">
                    <li class="ordered-item" v-for="item in this.userCart" :key="item.bar">
                        <img :src="`https://nash.enott.com.ua/api/upload/${item.headImg}`" :alt="item.headImg" class="ordered-img">
                        <div class="ordered-text_first">
                            <p class="ordered-name">
                                {{ item.itemName }}
                            </p>
                            <p class="ordered-weight">
                                {{ item.itemWeight }} гр
                            </p>
                        </div>
                        <div class="ordered-text_fake" v-if="this.screenWidth <= 768"></div>
                        <div class="ordered-text">
                            <p class="ordered-text_title">
                                Ціна
                            </p>
                            <p class="ordered-text_value">
                                {{ item.price }} <span>грн</span>
                            </p>
                        </div>
                        <div class="ordered-text">
                            <p class="ordered-text_title">
                                Кількість
                            </p>
                            <p class="ordered-text_value">
                                {{ item.userQty }} <span>шт</span>
                            </p>
                        </div>
                        <div class="ordered-text">
                            <p class="ordered-text_title">
                                Сумма
                            </p>
                            <p class="ordered-text_value">
                                {{ item.price * item.userQty }} <span>грн</span>
                            </p>
                        </div>
                        <p class="ordered-item_alert">
                            В наявності
                        </p>
                    </li>
                </ul>    
                <button class="btn ordered-btn" v-if="this.screenWidth > 480">
                    <router-link to="/Goods/Онлайн крамниця">
                        Продовжити покупки
                    </router-link>
                </button>
            </div>
            <div class="ordered-info" v-if="this.screenWidth > 480">
                <div v-for="(info, index) in userInfo" :key="index">
                    <h4 class="ordered-info_title ordered-subtitle">
                        Адреса доставки
                    </h4>
                    <div class="ordered-info_info">
                        <span>
                            Отримувач
                        </span>
                        <p>
                            {{ info.userName }}
                        </p>
                    </div>
                    <div class="ordered-info_info">
                        <span>
                            Доставка в Ужгород
                        </span>
                        <p>                        
                            {{ info.adress }}
                            <br>      
                            {{ info.adress1 }}
                        </p>
                    </div>
                    <div class="ordered-info_info">
                        <span>
                            Спосіб оплати
                        </span>
                        <p>
                            {{ info.userPayment }}
                        </p>
                    </div>
                    <div class="ordered-info_sum">
                        <span>
                            Вартість <br> доставки
                        </span>
                        <p v-if="sumAll > 0">
                            за тарифами перевізника
                        </p>
                        <p v-if="sumAll <= 0">
                            безкоштовна
                        </p>
                    </div>
                    <div class="ordered-info_sum">
                        <span>
                            {{ this.posInCart }} товари на суму
                        </span>
                        <p>
                            {{ this.sumValue }} грн
                        </p>
                    </div>
                    <div class="ordered-info_final">
                        <p class="ordered-info_final_text">
                            До оплати
                        </p>
                        <p class="ordered-info_final_value">
                            {{ this.sumValue }} <span>грн</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="ordered-info_mob" v-if="this.screenWidth <= 480">
            <div class="ordered-info" v-for="(info, index) in userInfo" :key="index">
                <h4 class="ordered-info_title ordered-subtitle">
                    Адреса доставки
                </h4>
                <div class="ordered-info_info">
                    <span>
                        Отримувач
                    </span>
                    <p>
                        {{ info.userName }}
                    </p>
                </div>
                <div class="ordered-info_info">
                    <span>
                        Доставка в Ужгород
                    </span>
                    <p>                        
                        {{ info.adress }}
                        <br>      
                        {{ info.adress1 }}
                    </p>
                </div>
                <div class="ordered-info_info">
                    <span>
                        Спосіб оплати
                    </span>
                    <p>
                        {{ info.userPayment }}
                    </p>
                </div>
                <div class="ordered-info_sum">
                    <span>
                        Вартість <br> доставки
                    </span>
                    <p v-if="sumAll > 0">
                        за тарифами перевізника
                    </p>
                    <p v-if="sumAll <= 0">
                        безкоштовна
                    </p>
                </div>
                <div class="ordered-info_sum">
                    <span>
                        {{ this.posInCart }} товари на суму
                    </span>
                    <p>
                        {{ this.sumValue }} грн
                    </p>
                </div>
                <div class="ordered-info_final">
                    <p class="ordered-info_final_text">
                        До оплати
                    </p>
                    <p class="ordered-info_final_value">
                        {{ this.sumValue }} <span>грн</span>
                    </p>
                </div>
            </div>
            <button class="btn ordered-btn" v-if="this.screenWidth <= 480">
                <router-link to="/Goods/Онлайн крамниця">
                    Продовжити покупки
                </router-link>
            </button>
        </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            userCart: [],
            userInfo: [],
            sumValue: '',
            posInCart: '',
            sumPercent: '',
            screenWidth: ''
        }
    },
    computed:{
        sumAll(){
            var sum = 0
            this.sumValue = 0
            this.posInCart = 0
            if(this.userCart){
                for(let i = 0; i < this.userCart.length; i++){
                    this.posInCart = this.posInCart + Number(this.userCart[i].userQty)
                    sum = sum + (this.userCart[i].price * this.userCart[i].userQty)
                    this.sumValue = this.sumValue + (this.userCart[i].price * this.userCart[i].userQty)
                }
                this.sumPercent = sum
                if(2000 - sum > 0){
                    return 2000 - sum
                }else{
                    return 0
                }
            }else{
                return 0
            }
        }
    },
    mounted(){
        axios.get('https://nash.enott.com.ua/api/getOrder/' + JSON.parse(localStorage.getItem('user'))[0].email + '/' + JSON.parse(localStorage.getItem('user'))[0].token)
        .then(response => {
            this.userCart = response.data.orders
            this.userInfo = response.data.orderUser
            this.$store.dispatch('setLoader', false);
        })
        this.screenWidth = screen.width
    }
}
</script>

<style>

</style>