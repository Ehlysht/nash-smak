<template>
    <div class="wrapper">
        <my-header/>
        <router-view />
        <transition name="showCart">
            <div class="head-cart" v-if="cartVisible && currentRouteName != 'Cart'">
                <p class="head-cart_text" @click.prevent="closeCart()">
                <img src="@/assets/img/return.png" alt="Return"> Повернутися до покупок
                </p>
                <cart-list/>
            </div>
        </transition>
        <transition name="openLogin">
            <div class="login" v-if="loginVisible">
                <form class="login-form">
                    <div class="login-top">
                        <h2 class="login-title">
                            Увійти
                        </h2>
                        <svg @click.prevent="closeLogin" class="login-close" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M17 1L1 17M1 1L17 17" stroke="#470D04" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="login-left">
                        <div class="login-write" v-if="this.clickBtn == 'login'">
                            <label for="login-input" class="login-label">
                                Email
                                <input type="email" name="email" id="login-input" class="login-input" v-model="this.email">
                            </label>
                            <label for="login-input" class="login-label">
                                Пароль
                                <input type="password" name="password" id="login-input" class="login-input" v-model="this.pass">
                            </label>
                            <button class="login-btn" @click.prevent="loginUser">
                                Увійти
                            </button>
                            <div class="login-more">
                                <button class="register-btn" @click.prevent="this.clickBtn = 'register'">
                                    Зареєструватись
                                </button>
                                <button class="register-btn" @click.prevent="this.clickBtn = 'remind'">
                                    Нагадати пароль
                                </button>
                            </div>
                        </div>
                        <div class="login-write" v-if="this.clickBtn == 'register'">
                            <label for="login-input" class="login-label">
                                Email
                                <input type="email" name="email" id="login-input" class="login-input" v-model="this.email">
                            </label>
                            <label for="login-input" class="login-label">
                                Пароль
                                <p class="register-alert" v-if="this.password != this.password2">
                                    Паролі повинні співпадати
                                </p>
                                <input :type="this.changeVis" v-model="this.password" name="password" id="login-input" class="login-input">
                                <label for="callback" class="login-pass container-check">
                                    <input type="checkbox" id="callback" v-model="this.visiblePass">
                                    <span class="checkmark" style="position: relative;"></span>
                                    <p>Показати пароль</p>
                                </label>
                            </label>
                            <label for="login-input" class="login-label">
                                Повторити пароль
                                <input :type="this.changeVis" v-model="this.password2" name="password" id="login-input" class="login-input">
                            </label>
                            <button class="login-btn" @click.prevent="registerUser">
                                Зареєструватись
                            </button>
                        </div>
                        <div class="login-write" v-if="this.clickBtn == 'remind'">
                            <label for="login-input" class="login-label">
                                Email
                                <input type="email" name="email" id="login-input" class="login-input" v-model="this.email">
                            </label>
                            <button class="login-btn" @click.prevent="restorePass">
                                Нагадати пароль
                            </button>
                        </div>
                        <p class="login-and login-right">
                            або
                        </p>
                        <google-login class="login-right"/>
                    </div>
                </form>
            </div>
        </transition>
        <my-footer/>
        <div class="overlay" v-if="overlay"></div>
        <Transition name="fade" v-show="isLoading">
            <Loader />
        </Transition>
    </div>
</template>

<script>
import axios from 'axios'
import myHeader from '@/components/Header.vue'
import myFooter from '@/components/Footer.vue'
import cartList from '@/components/cart.vue'
import Loader from '@/components/Loader.vue'
import googleLogin from '@/components/googleLogin.vue'
export default {
    components:{
        myHeader, myFooter, cartList, Loader, googleLogin
    },
    data(){
        return{
            email: '',
            pass: '',
            clickBtn: 'login',
            password: '',
            password2: '',
            visiblePass: false
        }
    },
    computed:{
        loginVisible(){
            return this.$store.getters.loginVisible
        },
        cartVisible(){
            return this.$store.getters.cartVisible
        },
        overlay(){
            return this.$store.getters.overlay
        },
        currentRouteName() {
            return this.$route.name;
        },
        isLoading(){
            return this.$store.getters.loader
        },
        changeVis(){
            if(this.visiblePass){
                return 'text'
            }else{
                return 'password'
            }
        }
    },
    methods:{
        async registerUser(){
            let checkEmpty = true
            var existUser = ''
            if(this.email && this.password && this.password2){
                if(this.password != this.password2){
                    checkEmpty = false
                }
            }else{
                checkEmpty = false
            }
            if(checkEmpty){
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                let formData = new FormData();
                formData.append('email', this.email);
                formData.append('pass', this.password);
                await axios.post('https://nash.enott.com.ua/api/register', formData, config)
                .then(response => {
                    if(response.data.status){
                        this.$router.push({ path : '/ThankYou' });
                    }else{
                        alert("Такий користувач вже зареєстрований!")
                    }
                })
            }
        },
        async loginUser(){
            let checkEmpty = true
            var existUser = ''
            var userInfo = []
            if(this.email && this.pass){
                checkEmpty = true
            }else{
                checkEmpty = false
            }
            if(checkEmpty){
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                let formData = new FormData();
                formData.append('email', this.email);
                formData.append('pass', this.pass);
                if(localStorage.getItem('user')){
                    if(JSON.parse(localStorage.getItem('user'))[0].role == 'tempUser'){
                        formData.append('tempLogin', JSON.parse(localStorage.getItem('user'))[0].email);
                    }
                }
                await axios.post('https://nash.enott.com.ua/api/loginUser', formData, config)
                .then(response => {
                    if(response.data.status){
                        userInfo = [
                            {'email': this.email, 'role': response.data.role, 'token': response.data.token}
                        ]
                        localStorage.setItem("user", JSON.stringify(userInfo))
                        if(this.fromPage == '/Cart'){
                            this.$router.push({ path : '/Cart' });
                        }else{
                            this.$router.push({ path : '/Cabinet/main' });
                        }
                        
                        this.$store.dispatch('setPosInCart');
                    }else{
                        alert("Такого користувача неіснує або пошта/пароль невірні")
                        localStorage.removeItem("user")
                    }
                })
            }
        },
        closeCart(){
            this.$store.dispatch('setCartVisible', false);
            this.$store.dispatch('setOverlay', false);
            // document.body.style.overflow = "auto";
        },
        closeLogin(){
            this.$store.dispatch('setLoginVisible', false);
            this.$store.dispatch('setOverlay', false);
            this.clickBtn = 'login'
            // document.body.style.overflow = "auto";
        },
        restorePass(){
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            let formData = new FormData();
            formData.append('email', this.email);
            axios.post('https://nash.enott.com.ua/api/restorePass', formData, config)
            .then(response => {

            })
        }
    },
}
</script>

<style>
    .head-cart{
        max-width: 600px;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 999;
        background: #FFF7ED;
        padding: 40px 0 68px;
        overflow-y: hidden;
    }
    .head-cart>div{
        width: auto;
        padding: 0 40px;
    }
    .head-cart_text{
        display: flex;
        align-items: center;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #000000;
        margin-left: 40px;
        cursor: pointer;
    }
    .head-cart_text:hover{
        color: #00A439;
    }
    .head-cart_text:hover img{
        filter: brightness(0) saturate(100%) invert(38%) sepia(37%) saturate(5553%) hue-rotate(125deg) brightness(97%) contrast(101%);
    }
    .head-cart_text>img{
        margin-right: 10px;
    }
    .overlay{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.4);
        z-index: 1;
    }
    @media (max-width: 600px) {
        .head-cart{
            width: 100%;
            padding: 32px 20px 0;
        }
        .head-cart_text{
            margin-bottom: 40px;
        }
        .head-cart_text, .head-cart>div{
            margin-left: 0px;
            padding: 0;
        }
    }
    @media (max-width: 360px) {
        .head-cart{
            padding: 24px 20px 0 15px;
        }
    }
</style>