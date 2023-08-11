<template>
    <section class="cart" id="cart">
        <div :class="`${this.screenWidth <= 680 ? 'container-fluid' : 'container'}`">
            <route routeName="Оформлення замовлення"/>
            <div class="cart-content">
                <form class="cart-form">
                    <h3 class="cart-title" v-if="this.screenWidth > 680">
                        Будь ласка, заповніть контактну форму
                    </h3>
                    <div class="cart-user">
                        <p class="cart-subTitle">
                            Ваші контактні дані
                        </p>
                        <p v-if="this.checkUser" class="cart-login">
                            Ви вже зареєстровані? <router-link to="/Login">Увійти</router-link>
                        </p>
                    </div>
                    <label for="cart-input" class="cart-label">
                        Прізвище
                        <input type="text" name="subName" id="cart-input" class="cart-input" v-model="this.fname">
                    </label>
                    <label for="cart-input" class="cart-label">
                        Ім'я
                        <input type="text" name="firstName" id="cart-input" class="cart-input" v-model="this.sname">
                    </label>
                    <label for="cart-input" class="cart-label">
                        Телефон
                        <input type="text" v-maska="'+38 ### ### ## ##'" name="phone" id="cart-input" class="cart-input" v-model="this.phone">
                    </label>
                    <label for="cart-input" class="cart-label">
                        Email
                        <input type="email" name="email" id="cart-input" class="cart-input" v-model="this.email">
                    </label>
                    <p class="user-alert">
                        Наші сповіщення будуть надходити на E-mail, вони можуть потрапити в папку «спам»
                    </p>
                    <div class="user-delivery">
                        <p class="user-delivery_title">
                            Спосіб доставки
                        </p>
                        <div class="user-radio">
                            <input @click="this.cityValue = ''; this.addressValueDel = ''; this.addressValuePosht = ''" type="radio" name="delivery" id="user-radio1" value="Нова Пошта (відділення)" v-model="this.depCheck">
                            <label for="user-radio1" class="user-label">Нова Пошта (відділення)</label>
                            <label v-if="this.depCheck == 'Нова Пошта (відділення)'" v-click-outside="onClickOutsideSearch" for="city" class="cabinet-label cabinet-label_select">
                                Місто
                                <input @click="this.completeCity = false; cityList()" @input="cityList()" type="text" name="firstName" id="cabinet-input" class="cabinet-input" v-model="this.cityValue" placeholder="Оберіть місто">
                                <ul class="cabinet-list" v-if="!this.completeCity" @scroll="handleScroll('cabinet-list_city')" id="cabinet-list_city">
                                    <li @click.prevent="cityList(city.citys)" v-for="city in this.citysList" :key="city.citys" :value="city.citys">
                                        {{ city.citys }}
                                    </li>
                                </ul>
                            </label>
                            <label v-if="this.depCheck == 'Нова Пошта (відділення)'" v-click-outside="onClickOutsideSearchAdd" for="delSelect" class="cabinet-label cabinet-label_select">
                                Відділення Пошти
                                <p @click="this.completeAddress = !this.completeAddress" id="cabinet-input" class="cabinet-input cabinet-input_text">{{ this.addressValueDel }}<img src="@/assets/img/select-down.png" alt="" :class="`${!this.completeAddress ? 'cabinet-input_arrow' : ''}`" style="margin-left: auto;"></p>
                                <ul class="cabinet-list" v-if="!this.completeAddress" id="cabinet-list_address">
                                    <li v-if="waitingInfo">
                                        Завантаження даних
                                    </li>
                                    <li @click.prevent="this.addressValueDel = address.Description; this.completeAddress = true" v-for="address in this.FullListDel" :key="address.Description" :value="address.Description">
                                        <p v-if="!waitingInfo">{{ address.Description }}</p>
                                    </li>
                                </ul>
                            </label>
                        </div>
                        <div class="user-radio">
                            <input @click="this.cityValue = ''; this.addressValueDel = ''; this.addressValuePosht = ''" type="radio" name="delivery" id="user-radio2" value="Нова Пошта (поштомат)" v-model="this.depCheck">
                            <label for="user-radio2" class="user-label">Нова Пошта (поштомат)</label>
                            <label v-if="this.depCheck == 'Нова Пошта (поштомат)'" v-click-outside="onClickOutsideSearch" for="city" class="cabinet-label cabinet-label_select">
                                Місто
                                <input @click="this.completeCity = false; cityList()" @input="cityList()" type="text" name="firstName" id="cabinet-input" class="cabinet-input" v-model="this.cityValue" placeholder="Оберіть місто">
                                <ul class="cabinet-list" v-if="!this.completeCity" @scroll="handleScroll('cabinet-list_city')" id="cabinet-list_city">
                                    <li @click.prevent="cityList(city.citys)" v-for="city in this.citysList" :key="city.citys" :value="city.citys">
                                        {{ city.citys }}
                                    </li>
                                </ul>
                            </label>
                            <label v-if="this.depCheck == 'Нова Пошта (поштомат)'" v-click-outside="onClickOutsideSearchAdd" for="delSelect" class="cabinet-label cabinet-label_select">
                                Відділення Пошти
                                <p @click="this.completeAddress = !this.completeAddress" id="cabinet-input" class="cabinet-input cabinet-input_text">{{ this.addressValuePosht }}<img src="@/assets/img/select-down.png" alt="" :class="`${!this.completeAddress ? 'cabinet-input_arrow' : ''}`" style="margin-left: auto;"></p>
                                <ul class="cabinet-list" v-if="!this.completeAddress" @scroll="handleScroll('cabinet-list_address')" id="cabinet-list_address">
                                    <li v-if="waitingInfo">
                                        Завантаження даних
                                    </li>
                                    <li @click.prevent="this.addressValuePosht = address.Description; this.completeAddress = true" v-for="address in this.FullListPosht" :key="address.Description" :value="address.Description">
                                        {{ address.Description }}
                                    </li>
                                </ul>
                            </label>
                        </div>
                        <div class="user-radio">
                            <input @click="this.cityValue = ''; this.addressValueDel = ''; this.addressValuePosht = ''" type="radio" name="delivery" id="user-radio3" value="Укрпошта" v-model="this.depCheck">
                            <label for="user-radio3" class="user-label">Укрпошта</label>
                            <label v-if="this.depCheck == 'Укрпошта'" v-click-outside="onClickOutsideSearch" for="city" class="cabinet-label cabinet-label_select">
                                Місто
                                <input @click="this.completeCity = false; cityList()" @input="cityList()" type="text" name="firstName" id="cabinet-input" class="cabinet-input" v-model="this.cityValue" placeholder="Оберіть місто">
                                <ul class="cabinet-list" v-if="!this.completeCity" @scroll="handleScroll('cabinet-list_city')" id="cabinet-list_city">
                                    <li @click.prevent="cityList(city.citys)" v-for="city in this.citysList" :key="city.citys" :value="city.citys">
                                        {{ city.citys }}
                                    </li>
                                </ul>
                            </label>
                            <label v-if="this.depCheck == 'Укрпошта'" v-click-outside="onClickOutsideSearchAdd" for="delSelect" class="cabinet-label cabinet-label_select">
                                Відділення Пошти
                                <p @click="this.completeAddress = !this.completeAddress" id="cabinet-input" class="cabinet-input cabinet-input_text">{{ this.addressValueDel }}<img src="@/assets/img/select-down.png" alt="" :class="`${!this.completeAddress ? 'cabinet-input_arrow' : ''}`" style="margin-left: auto;"></p>
                                <ul class="cabinet-list" v-if="!this.completeAddress" @scroll="handleScroll('cabinet-list_address')" id="cabinet-list_address">
                                    <li v-if="waitingInfo">
                                        Завантаження даних
                                    </li>
                                    <li @click.prevent="this.addressValueDel = address.Description; this.completeAddress = true" v-for="address in this.FullListPosht" :key="address.Description" :value="address.Description">
                                        {{ address.Description }}
                                    </li>
                                </ul>
                            </label>
                        </div>
                        <div class="user-radio">
                            <input type="radio" name="delivery" id="user-radio4" value="Самовивіз з фабрики" v-model="this.depCheck">
                            <label for="user-radio4" class="user-label">Самовивіз з фабрики</label>
                            <p class="user-radio_map_text" v-if="this.depCheck == 'Самовивіз з фабрики'">
                                <img src="@/assets/img/maps.png" alt="Maps"> вул. Перемоги, 1, с. Старий Любар 13133
                            </p>
                            <iframe class="user-radio_map" v-if="this.depCheck == 'Самовивіз з фабрики'" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3138.0413495486246!2d27.689560976870318!3d49.86020562968645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472dc8dcece86957%3A0x81c06db17ece39be!2sVul.%20Peremohy%2C%201%2C%20Pedynka%2C%20Zhytomyrs&#39;ka%20oblast%2C%2013144!5e1!3m2!1sen!2sua!4v1684421514485!5m2!1sen!2sua" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                    <div class="user-payment">
                        <p class="user-payment_title">
                            Спосіб оплати
                        </p>
                        <p class="user-payment_alert">
                            Інтернет-магазин працює на умовах 100% передоплати
                        </p>
                        <div class="user-radio">
                            <input type="radio" name="payment" id="user-radio5" value="Онлайн оплата" v-model="this.payCheck">
                            <label for="user-radio5" class="user-label">Банківською карткою VISA / MasterCard</label>
                        </div>
                        <div class="user-radio">
                            <input type="radio" name="payment" id="user-radio6" value="За реквізитами" v-model="this.payCheck">
                            <label for="user-radio6" class="user-label">За банківськими реквізитами</label>
                            <p class="user-payment_descr">
                                На картку або розрахунковий рахунок, наш менеджер зателефонує Вам для узгодження способу оплати
                            </p>
                        </div>
                    </div>
                    <label for="callback" class="user-callback container-check">
                        <input type="checkbox" id="callback" value="Не передзвонюйте мені для уточнення замовлення" v-model="this.agree">
                        <span class="checkmark" style="position: relative;"></span>
                        <p>Не передзвонюйте мені для уточнення замовлення</p>
                    </label>
                    <div class="user-comments">
                        <p class="user-comments_title">
                            Коментар до замовлення
                        </p>
                        <QuillEditor :toolbar="false" class="user-textarea" contentType="html" v-model:content="this.userTextarea"/>
                    </div>
                </form>
                <cart-list :routeName="true" :email="this.email" :fname="this.fname" :sname="this.sname" :phone="this.phone" :cityValue="this.cityValue" :depCheck="this.depCheck" :addressValuePosht="this.addressValuePosht" :addressValueDel="this.addressValueDel" :payCheck="this.payCheck" :userTextarea="this.userTextarea" :agree="this.agree" :cartSum="this.cartSum"/>
            </div>
            
            <div class="cart-summary" v-if="this.screenWidth <= 680">
                <div class="cart-goods_sum">
                    <p>
                        Вартість доставки
                    </p>
                    <span v-if="this.sumAll > 0">
                        за тарифами перевізника
                    </span>
                    <span v-if="this.sumAll <= 0">
                        безкоштовна
                    </span>
                </div>
                <div class="cart-goods_sum">
                    <p>
                        {{ this.userCart.length }} товари на суму
                    </p>
                    <span>
                        {{ cartSum }} грн
                    </span>
                </div>
                <div class="cart-goods_final">
                    <p class="cart-goods_final_text">
                        До оплати
                    </p>
                    <p class="cart-goods_final_value">
                        {{ cartSum }} <span>грн</span>
                    </p>
                </div>
                <p class="cart-goods_alert" v-if="cartSum < 200">
                    <img src="@/assets/img/alert-cart.png" alt="Alert"> Мінімальна сума замовлення 200 грн
                </p>
                <button @click.prevent="buyItems()" class="cart-goods_btn cart-goods_btn_active" v-if="cartSum >= 200">
                    <a href="#">Оформити замовлення</a>
                </button>
                <button class="cart-goods_btn cart-goods_btn_disable" v-if="cartSum < 200">
                    Оформити замовлення
                </button>
                <label for="cart-goods_agreement" class="cart-goods_agreement container-check">
                    <input type="checkbox" id="cart-goods_agreement" value="approved" v-model="this.agreePolicy"><p>Даю згоду на обробку персональних даних</p>
                    <span class="checkmark" style="position: relative;"></span>
                </label>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import route from '@/components/route.vue'
import cartList from '@/components/cart.vue'
import NovaPoshta from 'novaposhta';
import vClickOutside from 'click-outside-vue3'
export default {
    components: {
        route, cartList
    },
    directives: {
        clickOutside: vClickOutside.directive
    },
    data(){
        return{
            checkUser: false,
            userInfo: [],
            testCity: [],
            addressValuePosht: '',
            addressValueDel: '',
            completeCity: true,
            citysList: [],
            cityValue: '',
            agree: '',
            agreePolicy: '',
            addressList: [],
            maxLength: 100,
            completeAddress: true,
            FullList: [],
            depCheck: '',
            payCheck: '',
            screenWidth: '',
            sumAll: 0,
            userCart: [],
            userTextarea: '',
            waitingInfo: true,
            ukrCity: [],
            urkAddress: [],
        }
    },
    computed:{
        cartSum(){
            var sum = this.$store.getters.sumValue
            if((2000 - sum) > 0){
                this.sumAll = 2000 - sum
            }else{
                this.sumAll = 0
            }
            return sum
        },  
        
        
    },
    methods:{
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
        handleScroll(id){
            const element = document.getElementById(id);
            let lastScrollTop = 0;
            if (element.scrollTop < lastScrollTop){
                // upscroll 
                return;
            } 
            lastScrollTop = element.scrollTop <= 0 ? 0 : element.scrollTop;
            if (element.scrollTop + element.offsetHeight >= element.scrollHeight ){
                this.maxLength = this.maxLength + 100
                if(id == 'cabinet-list_city'){
                    this.cityList()
                }else{
                    this.addList()
                }
            }
        },
        changeNP(val){
            this.NPVal = val
        },
        cityList(clickedItem){
            var array = this.testCity
            if(this.depCheck == 'Укрпошта'){
                var array = this.ukrCity
            }
            var maxValue = 0
            if(this.maxLength >= array.length){
                maxValue = array.length
            }else{
                maxValue = this.maxLength
            }
            this.citysList = []
            this.completeCity = false
            for (var i = 0; i < array.length; i++){
                if(this.cityValue){
                    if(array[i].citys.toLowerCase().substring(0, this.cityValue.length) == this.cityValue.toLowerCase()){
                        if(this.citysList.length < maxValue){
                            this.citysList.push(array[i])
                        }
                    }
                }else{
                    if(this.citysList.length < maxValue){
                        this.citysList.push(array[i])
                    }
                }
            }
            if(clickedItem){
                this.addressValueDel = ''
                this.FullListDel = []
                this.FullListPosht = []
                this.cityValue = clickedItem
                this.completeCity = true
                if(this.depCheck == 'Укрпошта'){
                    this.addressList = this.urkAddress
                }else{
                    const api = new NovaPoshta({ apiKey: '1805304084717f37c3824fd9898eece6' });
                    api.address
                    .getWarehouses({'CityName': clickedItem.substring(0, clickedItem.search(' - ')), 'BicycleParking ': '1'})
                    .then((json) => {
                        this.addressList = json.data
                        this.addressValueDel = ''
                    })
                    .catch((errors) => {
                        if (Array.isArray(errors)) {
                            errors.forEach((error) => console.log(`[${ error.code || '-' }] ${ error.en || error.uk || error.ru || error.message }`));
                        }
                    });
                }
                this.addressDell();
                this.addressPosht();
            }
        },
        addressDell(){
            if(this.cityValue){ 
                this.waitingInfo = true
                var answ = []
                const api = new NovaPoshta({ apiKey: '1805304084717f37c3824fd9898eece6' });
                api.address
                .getWarehouses({'CityName': this.cityValue.substring(0, this.cityValue.search(' - ')), 'BicycleParking ': '1'})
                .then((json) => {
                    this.FullListDel = json.data
                    for(var i = 0; i < this.FullListDel.length; i++){
                        if(this.FullListDel[i].Description.substring(0,10) == 'Відділення'){
                            answ.push(this.FullListDel[i])
                            this.waitingInfo = false
                        }
                    }
                    this.FullListDel = answ
                })
                .catch((errors) => {
                    if (Array.isArray(errors)) {
                        errors.forEach((error) => console.log(`[${ error.code || '-' }] ${ error.en || error.uk || error.ru || error.message }`));
                    }
                });
            }
        },
        addressPosht(){
            if(this.cityValue){
                this.waitingInfo = true
                if(this.depCheck == 'Укрпошта'){
                    this.FullListPosht = this.urkAddress
                    this.waitingInfo = false
                }else{
                    const api = new NovaPoshta({ apiKey: '1805304084717f37c3824fd9898eece6' });
                    api.address
                    .getWarehouses({'CityName': this.cityValue.substring(0, this.cityValue.search(' - ')), 'BicycleParking ': '1', 'CategoryOfWarehouse': 'Postomat'})
                    .then((json) => {
                        this.FullListPosht = json.data
                        this.waitingInfo = false
                    })
                    .catch((errors) => {
                        if (Array.isArray(errors)) {
                            errors.forEach((error) => console.log(`[${ error.code || '-' }] ${ error.en || error.uk || error.ru || error.message }`));
                        }
                    });
                }
            }
        },
        onClickOutsideSearch(){
            this.completeCity = true
        },
        onClickOutsideSearchAdd(){
            this.completeAddress = true
        },
        
    },
    mounted(){
        this.screenWidth = screen.width
        if(!JSON.parse(localStorage.getItem('user'))){
            this.checkUser = true
        }else{
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            let formData = new FormData();
            formData.append('email', JSON.parse(localStorage.getItem('user'))[0].email);
            axios.post('https://nash.enott.com.ua/api/getUser', formData, config)
            .then(response => {
                this.userInfo = response.data.answerAdm
                if(JSON.parse(localStorage.getItem('user'))[0].role == 'tempUser'){
                    this.email = ''
                    this.checkUser = true
                }else{
                    this.email = JSON.parse(localStorage.getItem('user'))[0].email
                    this.fname = response.data.answerAdm[0].first_name
                    this.sname = response.data.answerAdm[0].second_name
                    this.phone = response.data.answerAdm[0].phone
                    this.cityValue = response.data.answerAdm[0].city
                    this.depCheck = response.data.answerAdm[0].department
                    if(this.depCheck == 'Нова Пошта (поштомат)'){
                        this.addressValuePosht = response.data.answerAdm[0].delivery
                    }else{
                        this.addressValueDel = response.data.answerAdm[0].delivery
                    }
                    if(this.cityValue){
                        this.addressDell();
                        this.addressPosht();
                    }
                }
            })
            axios.get('https://nash.enott.com.ua/api/getCart/' + JSON.parse(localStorage.getItem('user'))[0].email)
            .then(response => {
                this.userCart = response.data
                this.$store.dispatch('setLoader', false);
            })
        }
        var cityList = []
        const api = new NovaPoshta({ apiKey: '1805304084717f37c3824fd9898eece6' });
        api.address
        .getCities()
        .then((json) => {
            cityList = json.data
            for(let i = 0; i < cityList.length; i++){
                this.testCity.push({'citys': cityList[i].Description + " - (" + cityList[i].AreaDescription + ")"})
            }
        })
        .catch((errors) => {
            if (Array.isArray(errors)) {
                errors.forEach((error) => console.log(`[${ error.code || '-' }] ${ error.en || error.uk || error.ru || error.message }`));
            }
        });
        axios.get('https://nash.enott.com.ua/api/getUkrPoshta')
        .then(response => {
            this.ukrCity = response.data.uniqList;
            this.urkAddress = response.data.allList;
        })
        this.$store.dispatch('setVisibleMenu', false);
        
    },
}
</script>

<style>

</style>