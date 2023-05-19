<template>
<div>
  <section class="cabinet" id="cabinet">
    <div class="container">
        <route routeName="Кабінет"/>
        <div class="cabinet-content">
            <cabinet-menu/>
            <div class="cabinet-info" v-for="user in this.userInfo" :key="user.id">
                <h2 class="cabiten-title">
                    {{ title }}
                </h2>
                <form v-if="this.$route.params.choice == 'main'" class="cabinet-form">
                    <label for="cabinet-input" class="cabinet-label">
                        Прізвище
                        <input type="text" name="subName" id="cabinet-input" class="cabinet-input" v-model="this.fname">
                    </label>
                    <label for="cabinet-input" class="cabinet-label">
                        Ім'я
                        <input type="text" name="firstName" id="cabinet-input" class="cabinet-input" v-model="this.sname">
                    </label>
                    <label for="cabinet-input" class="cabinet-label">
                        Телефон
                        <input type="text" v-maska="'+38 ### ### ## ##'" name="phone" id="cabinet-input" class="cabinet-input" v-model="this.phone">
                    </label>
                    <label for="cabinet-input" class="cabinet-label">
                        Email
                        <input type="email" name="email" id="cabinet-input" class="cabinet-input" v-model="this.email">
                    </label>
                    <transition name="fade">
                        <p class="cabinet-message" v-if="this.saveMessage">
                            Ви успішно змінили обліковий запис
                        </p>
                    </transition>
                    <button class="cabint-btn" @click.prevent="changeInfo()">
                        Зберегти зміни
                    </button>
                </form>
                <form v-if="this.$route.params.choice == 'address'" class="cabinet-form">
                    <label v-click-outside="onClickOutsideSearch" for="city" class="cabinet-label cabinet-label_select">
                        Місто
                        <input @click="this.completeCity = false; cityList()" @input="cityList()" type="text" name="firstName" id="cabinet-input" class="cabinet-input" v-model="this.cityValue" placeholder="Оберіть місто">
                        <ul class="cabinet-list" v-if="!this.completeCity" @scroll="handleScroll('cabinet-list_city')" id="cabinet-list_city">
                            <li @click.prevent="cityList(city.citys)" v-for="city in this.citysList" :key="city.citys" :value="city.citys">
                                {{ city.citys }}
                            </li>
                        </ul>
                    </label>
                    <div for="cabinet-radio1" class="cabinet-label cabinet-radio">
                        <input type="radio" name="delivery" id="cabinet-radio1" value="Нова Пошта" v-model="this.depCheck" :checked="this.depCheck == 'Нова Пошта (відділення)'">
                        <label for="cabinet-radio1" class="cabinet-label">Нова Пошта (відділення)</label>
                    </div>
                    <div for="cabinet-radio2" class="cabinet-label cabinet-radio cabinet-radio_second">
                        <input type="radio" name="delivery" id="cabinet-radio2" value="Укрпошта" v-model="this.depCheck" :checked="this.depCheck == 'Укрпошта'">
                        <label for="cabinet-radio2" class="cabinet-label">Укрпошта</label>
                    </div>
                    <label v-click-outside="onClickOutsideSearchAdd" for="delSelect" class="cabinet-label cabinet-label_select">
                        Відділення Пошти
                        <p @click="this.completeAddress = !this.completeAddress" id="cabinet-input" class="cabinet-input cabinet-input_text">{{ this.addressValue }}<img src="@/assets/img/select-down.png" alt="" :class="`${!this.completeAddress ? 'cabinet-input_arrow' : ''}`" style="margin-left: auto;"></p>
                        <ul class="cabinet-list" v-if="!this.completeAddress" id="cabinet-list_address">
                            <li @click.prevent="this.addressValue = address.Description; this.completeAddress = true" v-for="address in this.FullList" :key="address.Description" :value="address.Description">
                                {{ address.Description }}
                            </li>
                        </ul>
                    </label>
                    <transition name="fade">
                        <p class="cabinet-message" v-if="this.saveMessage">
                            Ви успішно змінили обліковий запис
                        </p>
                    </transition>
                    <button class="cabint-btn" @click.prevent="changeInfo()">
                        Зберегти зміни
                    </button>
                </form>
                <form v-if="this.$route.params.choice == 'password'" class="cabinet-form">
                    <label for="cabinet-input" class="cabinet-label">
                        Старий пароль
                        <input type="password" name="subName" id="cabinet-input" class="cabinet-input" v-model="this.oldPass">
                    </label>
                    <p class="register-alert" v-if="this.newPass != this.newConfirmPass">Паролі повинні співпадати</p>
                    <div class="cabinet-newPassword">
                        <label for="cabinet-input" class="cabinet-label">
                            Новий пароль
                            <input type="password" name="firstName" id="cabinet-input" class="cabinet-input" v-model="this.newPass">
                        </label>
                        <label for="cabinet-input" class="cabinet-label">
                            Підтвердити пароль
                            <input type="password" name="firstName" id="cabinet-input" class="cabinet-input" v-model="this.newConfirmPass">
                        </label>
                    </div>
                    <transition name="fade">
                        <p class="cabinet-message" v-if="this.saveMessage">
                            Ви успішно змінили обліковий запис
                        </p>
                    </transition>
                    <button class="cabint-btn" @click.prevent="changePassord()">
                        Зберегти зміни
                    </button>
                </form>
                <div class="cabinet-subscribe" v-if="this.$route.params.choice == 'main'">
                    <h3 class="cabinet-subscribe_title">
                        Підписка на Email розсилку
                    </h3>
                    <p class="cabinet-subscribe_text">
                        Ви отримуєте email повідомлення про новинки та акції Наш смак
                    </p>
                    <button class="cabinet-subscribe_btn" @click.prevent="subscribe()">
                        <p v-if="this.subStatus == 'true'">Відписатися</p>
                        <p v-if="this.subStatus == 'false'">Підписатись</p>
                    </button>
                </div>
                <div class="cabinet-remember" v-if="this.$route.params.choice == 'password'">
                    <h3 class="cabinet-subscribe_title">
                        Забули пароль?
                    </h3>
                    <button class="cabint-btn" @click.prevent="restorePass()">
                        Надіслати на Email
                    </button>
                </div>
            </div>
        </div>
    </div>
    {{ addressListss }}
  </section>
  <insta/>
</div>
</template>

<script>
import axios from 'axios'
import route from '@/components/route.vue'
import cabinetMenu from '@/components/cabinet-menu.vue'
import insta from '@/components/insta.vue'
import vClickOutside from 'click-outside-vue3'
import NovaPoshta from 'novaposhta';
export default {
    components: {
        route, cabinetMenu, insta
    },
    directives: {
        clickOutside: vClickOutside.directive
    },
    data(){
        return{
            subStatus: true,
            saveMessage: false,
            routeName: '',
            completeCity: true,
            cityValue: '',
            completeAddress: true,
            addressValue: 'Оберіть Відділення',
            depCheck: '',
            delAddress: '',
            citysList: [],
            FullList: [],
            userInfo: [],
            testCity: [],
            maxLength: 100,
            sname: '',
            fname: '',
            phone: '+38',
            email: '',
            oldPass: '',
            newPass: '',
            newConfirmPass: ''
        }
    },
    computed:{
        title(){
            if(this.$route.params.choice == 'main'){
                return 'Особисті дані'
            }else if(this.$route.params.choice == 'address'){
                return 'Адреса доставки'
            }else if(this.$route.params.choice == 'password'){
                return 'Змінити пароль'
            }
        },
        addressListss(){
            if(this.cityValue){
                var answ = []
                const api = new NovaPoshta({ apiKey: '1805304084717f37c3824fd9898eece6' });
                api.address
                .getWarehouses({'CityName': this.cityValue.substring(0, this.cityValue.search(' - ')), 'BicycleParking ': '1'})
                .then((json) => {
                    this.FullList = json.data
                    for(var i = 0; i < this.FullList.length; i++){
                        if(this.FullList[i].Description.substring(0,10) == 'Відділення'){
                            answ.push(this.FullList[i])
                        }
                    }
                    this.FullList = answ
                })
                .catch((errors) => {
                    if (Array.isArray(errors)) {
                        errors.forEach((error) => console.log(`[${ error.code || '-' }] ${ error.en || error.uk || error.ru || error.message }`));
                    }
                });
            }
        }
    },
    methods:{
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
        cityList(clickedItem){
            var array = this.testCity
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
                this.cityValue = clickedItem
                this.completeCity = true
                const api = new NovaPoshta({ apiKey: '1805304084717f37c3824fd9898eece6' });
                api.address
                .getWarehouses({'CityName': clickedItem.substring(0, clickedItem.search(' - ')), 'BicycleParking ': '1'})
                .then((json) => {
                    this.addressList = json.data
                })
                .catch((errors) => {
                    if (Array.isArray(errors)) {
                        errors.forEach((error) => console.log(`[${ error.code || '-' }] ${ error.en || error.uk || error.ru || error.message }`));
                    }
                });
            }
        },
        updateWh(){
        },
        onClickOutsideSearch(){
            this.completeCity = true
        },
        
        onClickOutsideSearchAdd(){
            this.completeAddress = true
        },
        changeInfo(){
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            let formData = new FormData();
            formData.append('email', JSON.parse(localStorage.getItem('user'))[0].email);
            formData.append('sname', this.sname);
            formData.append('fname', this.fname);
            formData.append('phone', this.phone);
            formData.append('cityValue', this.cityValue);
            formData.append('department', this.depCheck);
            formData.append('delAddress', this.addressValue);
            axios.post('https://nash.enott.com.ua/api/changeUser', formData, config)
            .then(response => {
                this.saveMessage = true;
                setTimeout(() => {
                    this.saveMessage = false;
                }, 3000);
            })
        },
        subscribe(){
            var subscribe = ''
            if(this.subStatus != 'false'){
                subscribe = 'false'
            }else{
                subscribe = 'true'
            }
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            let formData = new FormData();
            formData.append('email', JSON.parse(localStorage.getItem('user'))[0].email);
            formData.append('status', subscribe);
            axios.post('https://nash.enott.com.ua/api/subscribe', formData, config)
            .then(response => {
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                let formData = new FormData();
                formData.append('email', JSON.parse(localStorage.getItem('user'))[0].email);
                axios.post('https://nash.enott.com.ua/api/getUser', formData, config)
                .then(response => {
                    this.userInfo = response.data
                    this.email = JSON.parse(localStorage.getItem('user'))[0].email
                    this.fname = response.data[0].first_name
                    this.sname = response.data[0].second_name
                    this.phone = response.data[0].phone
                    this.cityValue = response.data[0].city
                    this.depCheck = response.data[0].department
                    this.addressValue = response.data[0].delivery
                    this.subStatus = response.data[0].subscribe
                })
                this.saveMessage = true;
                setTimeout(() => {
                    this.saveMessage = false;
                }, 3000);
            })
        },
        async changePassord(){
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            let formData = new FormData();
            formData.append('email', JSON.parse(localStorage.getItem('user'))[0].email);
            formData.append('oldPass', this.oldPass);
            formData.append('newPass', this.newPass);
            await axios.post('https://nash.enott.com.ua/api/changePassword', formData, config)
            .then(response => {
                if(response.data.status){
                    this.saveMessage = true;
                    setTimeout(() => {
                        this.saveMessage = false;
                    }, 3000);
                }else{
                    alert("Невірний пароль")
                }
            })
        },
        restorePass(){
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            let formData = new FormData();
            formData.append('email', JSON.parse(localStorage.getItem('user'))[0].email);
            axios.post('https://nash.enott.com.ua/api/restorePass', formData, config)
            .then(response => {
                this.saveMessage = true;
                setTimeout(() => {
                    this.saveMessage = false;
                }, 3000);
            })
        }
    },
    mounted(){
        this.screenWidth = screen.width
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        let formData = new FormData();
        formData.append('email', JSON.parse(localStorage.getItem('user'))[0].email);
        axios.post('https://nash.enott.com.ua/api/getUser', formData, config)
        .then(response => {
            this.userInfo = response.data
            this.email = JSON.parse(localStorage.getItem('user'))[0].email
            this.fname = response.data[0].first_name
            this.sname = response.data[0].second_name
            this.phone = response.data[0].phone
            this.cityValue = response.data[0].city
            this.depCheck = response.data[0].department
            this.addressValue = response.data[0].delivery
            this.subStatus = response.data[0].subscribe
            this.$store.dispatch('setLoader', false);
        })
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
    }
}
</script>

<style scouped>
    .register-alert{
        width: 100%;
        font-size: 12px;
        color: red;
        width: 100%;
    }
</style>