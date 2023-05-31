<template>
    <div class="cart-goods">
        <h3 class="cart-title" v-if="this.screenWidth <= 680">
            Будь ласка, заповніть контактну форму
        </h3>
        <div v-if="this.userCart">
            <div class="cart-goods_free">
                <p class="cart-goods_text">
                    Для безкоштовної доставки залишилось <span>{{ sumAll }} грн</span>
                </p>
                <div class="cart-goods_status">
                    <div :style="`width: ${(this.sumPercent * 100) / 2000}%; max-width: 100%`"></div>
                </div>
            </div>
            <h3 class="cart-goods_title">
                Ваше замовлення
            </h3>
            <ul class="cart-goods_list">
                <li class="cart-goods_item" v-for="cart in this.userCart" :key="cart.bar">
                    <img src="@/assets/img/delete.png" alt="Delete" @click.prevent="deleteFromCart(cart.bar)" class="cart-goods_delete">
                    <div class="cart-goods_item_img" :style="`background: url('https://nash.enott.com.ua/api/upload/${cart.headImg}')top left/cover no-repeat`"></div>
                    <div class="cart-goods_item_info">
                        <router-link :to="`/Goods/${cart.name}/${cart.bar}`" class="cart-goods_item_link">
                            {{ cart.name }}
                        </router-link>
                        <p class="cart-goods_item_weight">
                            {{ cart.weight }} гр
                        </p>
                        <div class="cart-goods_item_inputs">
                            <div>
                                <img src="@/assets/img/cart-minus.png" alt="Minus" class="cart-goods_qty_change" @click.prevent="changeQty('minus', cart.id, cart.bar)">
                                <input type="number" class="cart-goods_qty_input" @change="changeQty('change', $event, cart.bar)" :id="`changeInput${cart.id}`" min="1" oninput="this.value = Math.abs(this.value)" :value="cart.userQty">
                                <img src="@/assets/img/cart-plus.png" style="transform: rotate(180deg);" alt="Plus" class="cart-goods_qty_change" @click.prevent="changeQty('plus', cart.id, cart.bar)">
                            </div>
                            <p class="cart-goods_item_price" :id="`item_price${cart.id}`">
                                {{ cart.price }} <span>грн</span>
                            </p>
                        </div>
                    </div>
                    <p class="cart-goods_item_exist">
                        <img @click.prevent="this.openInfo = !this.openInfo" src="@/assets/img/info.png" alt="Information" v-if="cart.existInfo != 'В наявності'">
                        {{ cart.existInfo }}
                        <span class="cart-goods_exist_info" v-if="this.openInfo">
                            Товари з позначкою "під замовлення" потребують додатковий час, приблизно 1 - 3 дні на виготовлення.
                            <img src="@/assets/img/delete.png" alt="Delete" @click.prevent="this.openInfo = false" class="cart-goods_exist_delete">
                        </span>
                    </p>
                </li>
            </ul>
            <div class="cart-goods_ads cart-goods_item">
                <p>
                    Тут могла б бути ваша реклама!
                </p>
            </div>
            <div v-if="this.screenWidth > 680">
                <div class="cart-goods_sum">
                    <p>
                        Вартість доставки
                    </p>
                    <span v-if="sumAll > 0">
                        за тарифами перевізника
                    </span>
                    <span v-if="sumAll <= 0">
                        безкоштовна
                    </span>
                </div>
                <div class="cart-goods_sum">
                    <p>
                        {{ this.userCart.length }} товари на суму
                    </p>
                    <span>
                        {{ this.sumValue }} грн
                    </span>
                </div>
                <div class="cart-goods_final">
                    <p class="cart-goods_final_text">
                        До оплати
                    </p>
                    <p class="cart-goods_final_value">
                        {{ this.sumValue }} <span>грн</span>
                    </p>
                </div>
                <p class="cart-goods_alert" v-if="this.sumValue < 200">
                    <img src="@/assets/img/alert-cart.png" alt="Alert"> Мінімальна сума замовлення 200 грн
                </p>
                <button @click.prevent="payment()" class="cart-goods_btn cart-goods_btn_active" v-if="this.sumValue >= 200 && this.routeName">
                    <a href="#">Оформити замовлення</a>
                </button>
                <button class="cart-goods_btn cart-goods_btn_active" v-if="this.sumValue >= 200 && !this.routeName">
                    <router-link to="/Cart">Оформити замовлення</router-link>
                </button>
                <button class="cart-goods_btn cart-goods_btn_disable" v-if="this.sumValue < 200">
                    Оформити замовлення
                </button>
                <label for="cart-goods_agreement" class="cart-goods_agreement container-check">
                    <input type="checkbox" id="cart-goods_agreement" value="approved" v-model="this.agree"><p>Даю згоду на обробку персональних даних</p>
                    <span class="checkmark" style="position: relative;"></span>
                </label>
            </div>
        </div>
        <div v-if="!this.userCart">
            <h3 class="cart-goods_title emptyCart-goods_title">
                Ваше замовлення з`явиться тут
            </h3>
            <button class="cart-goods_btn emptyCart-goods_btn" @click.prevent="closeCart">
                Повернутися до покупок
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props:['routeName'],
    data(){
        return{
            userCart: [],
            payCheck: 'card',
            sumValue: '',
            sumPercent: '',
            agree: true,
            screenWidth: '',
            openInfo: false
        }
    },
    methods:{
        changeQty(mvm, id, bar){
            for(let i = 0; i < this.userCart.length; i++){
                if(this.userCart[i].bar === bar){
                    var cartId = i
                    var elInput = this.userCart[i].userQty
                }
            }
            if(mvm == 'minus'){
                if(elInput > 1){
                    this.userCart[cartId].userQty = elInput - 1
                }else{
                    this.userCart[cartId].userQty = 1
                }
                document.getElementById('changeInput' + id).value = this.userCart[cartId].userQty
            }else if(mvm == 'plus'){
                this.userCart[cartId].userQty = Number(elInput) + 1
                document.getElementById('changeInput' + id).value = this.userCart[cartId].userQty
            }else{
                this.userCart[cartId].userQty = id.target.value
            }
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            let formData = new FormData();
            formData.append('email', JSON.parse(localStorage.getItem('user'))[0].email);
            formData.append('bar', this.userCart[cartId].bar);
            formData.append('userQty', this.userCart[cartId].userQty);
            axios.post('https://nash.enott.com.ua/api/updateCart', formData, config)
        },
        deleteFromCart(bar){
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            let formData = new FormData();
            formData.append('bar', bar);
            axios.post('https://nash.enott.com.ua/api/deleteCart', formData, config)
            .then(response => {
                axios.get('https://nash.enott.com.ua/api/getCart/' + JSON.parse(localStorage.getItem('user'))[0].email)
                .then(response => {
                    this.userCart = response.data
                })
            })
        },
        closeCart(){
            this.$store.dispatch('setCartVisible', false);
        },  
        payment(){
            if(this.payCheck == 'card'){
                var privatKey = 'sandbox_xQs3173QoGmt3fD3olfWAjUQrgsmCh7Zgmdb9LpX'
                var json_string = '{"public_key":"sandbox_i23769093976","version":"3","action":"pay","amount":"' + this.sumValue + '","currency":"UAH","description":"Buy items","order_id":"000001"}'
                this.valData = btoa(json_string)
                window.location.href = 'https://www.liqpay.ua/api/3/checkout?data=' + this.valData + '&signature=' + CryptoJS.SHA1(privatKey + this.valData + privatKey).toString(CryptoJS.enc.Base64)
            }else{
                alert("Буде приходити повідомлення на пошту про закупівлю")
            }
        },
    },
    computed:{
        sumAll(){
            var sum = 0
            this.sumValue = 0
            if(this.userCart){
                for(let i = 0; i < this.userCart.length; i++){
                    sum = sum + (this.userCart[i].price * this.userCart[i].userQty)
                    this.sumValue = this.sumValue + (this.userCart[i].price * this.userCart[i].userQty)
                }
                this.$store.dispatch('setSum', this.sumValue);
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
        this.screenWidth = screen.width
        axios.get('https://nash.enott.com.ua/api/getCart/' + JSON.parse(localStorage.getItem('user'))[0].email)
        .then(response => {
            this.userCart = response.data
        })
    }
}
</script>

<style>

</style>