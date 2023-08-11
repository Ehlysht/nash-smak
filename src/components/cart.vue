<template>
    <div class="cart-goods">
        <h3 class="cart-title" v-if="this.screenWidth <= 680 && this.routeName">
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
            <TransitionGroup class="cart-goods_list" name="list" tag="ul">
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
                                <img src="@/assets/img/cart-minus.png" alt="Minus" class="cart-goods_qty_change cart-goods_qty_less" @click.prevent="changeQty('minus', cart.id, cart.bar)">
                                <input type="number" class="cart-goods_qty_input" @change="changeQty('change', $event, cart.bar)" :id="`changeInput${cart.id}`" min="1" oninput="this.value = Math.abs(this.value)" :value="cart.userQty">
                                <img src="@/assets/img/cart-plus.png" style="transform: rotate(180deg);" alt="Plus" class="cart-goods_qty_change" @click.prevent="changeQty('plus', cart.id, cart.bar)">
                            </div>
                            <p class="cart-goods_item_price" :id="`item_price${cart.id}`">
                                {{ cart.price }} <span>грн</span>
                            </p>
                        </div>
                    </div>
                    <p class="cart-goods_item_exist">
                        <img @click.prevent="this.openInfo = cart.bar" src="@/assets/img/info.png" alt="Information" v-if="cart.existInfo != 'В наявності'">
                        {{ cart.existInfo }}
                        <span class="cart-goods_exist_info" v-if="this.openInfo == cart.bar">
                            Товари з позначкою "під замовлення" потребують додатковий час, приблизно 1 - 3 дні на виготовлення.
                            <img src="@/assets/img/delete.png" alt="Delete" @click.prevent="this.openInfo = false" class="cart-goods_exist_delete">
                        </span>
                    </p>
                </li>
            </TransitionGroup>
            <div class="cart-goods_ads cart-goods_item">
                <p>
                    Тут могла б бути ваша реклама!
                </p>
            </div>
            <div v-if="this.screenWidth > 680 || !this.routeName">
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
                        {{ this.posInCart }} товари на суму
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
                <button @click.prevent="buyItems()" class="cart-goods_btn cart-goods_btn_active" v-if="this.sumValue >= 200 && this.routeName">
                    <a href="#">Оформити замовлення</a>
                </button>
                <button class="cart-goods_btn cart-goods_btn_active" v-if="this.sumValue >= 200 && !this.routeName">
                    <router-link to="/Cart">Оформити замовлення</router-link>
                </button>
                <button class="cart-goods_btn cart-goods_btn_disable" v-if="this.sumValue < 200">
                    Оформити замовлення
                </button>
                <label for="cart-goods_agreement" class="cart-goods_agreement container-check" v-if="this.routeName">
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
import { setTransitionHooks } from 'vue'
export default {
    props:['routeName', 'email', 'fname', 'sname', 'phone', 'cityValue', 'depCheck', 'addressValuePosht', 'addressValueDel', 'payCheck', 'userTextarea', 'agree', 'cartSum'],
    data(){
        return{
            userCart: [],
            sumValue: '',
            sumPercent: '',
            agree: true,
            screenWidth: '',
            openInfo: false,
            posInCart: 0,
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
            this.$store.dispatch('setPosInCart');
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
                    this.$store.dispatch('setPosInCart');
                    this.$store.dispatch('setIfExistCart');
                })
            })
        },
        closeCart(){
            this.$store.dispatch('setOverlay', false);
            this.$store.dispatch('setCartVisible', false);
        },  
        async buyItems(){
            if(this.email != "" && this.fname != "" && this.sname != "" && this.phone != "" && this.cityValue != "" && this.depCheck != "" && this.payCheck != ""){
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                let formData = new FormData();
                if(JSON.parse(localStorage.getItem('user'))[0].role === 'tempUser'){
                    formData.append('tempUser', JSON.parse(localStorage.getItem('user'))[0].email);
                }
                formData.append('email', this.email);
                formData.append('fname', this.fname);
                formData.append('sname', this.sname);
                formData.append('phone', this.phone);
                formData.append('cityValue', this.cityValue);
                formData.append('depCheck', this.depCheck);
                formData.append('payCheck', this.payCheck);
                formData.append('userTextarea', this.userTextarea);
                if(this.agree){
                    formData.append('agree', 'Не передзвонюйте мені для уточнення замовлення');
                }else{
                    formData.append('agree', 'Передзвоніть для уточнення');
                }
                if(this.depCheck == 'Нова Пошта (поштомат)'){
                    formData.append('address', this.addressValuePosht);
                }else if(this.depCheck == 'Нова Пошта (відділення)' || this.depCheck == 'Укрпошта'){
                    formData.append('address', this.addressValueDel);
                }
                await axios.post('https://nash.enott.com.ua/api/sendOrder', formData, config)
                .then(response => {
                    if(response.data.orderId){
                        if(this.payCheck == 'Онлайн оплата'){
                            var privatKey = 'sandbox_xQs3173QoGmt3fD3olfWAjUQrgsmCh7Zgmdb9LpX'
                            var json_string = '{"public_key":"sandbox_i23769093976","version":"3","action":"pay","amount":"' + this.cartSum + '","currency":"UAH","description":"Buy items","order_id":"'+ response.data.orderId + '"}'
                            this.valData = btoa(json_string)
                            window.open('https://www.liqpay.ua/api/3/checkout?data=' + this.valData + '&signature=' + CryptoJS.SHA1(privatKey + this.valData + privatKey).toString(CryptoJS.enc.Base64), '_blank')
                        }
                        this.$store.dispatch('setPosInCart', false);
                        this.$router.push({ path : '/ordered' });
                    }
                })
            }else{
                alert("Заповніть всі обов'язкові поля!")
            }
        },
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
                this.$store.dispatch('setSum', this.sumValue);
                this.$store.dispatch('setPosInCart', this.posInCart);
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