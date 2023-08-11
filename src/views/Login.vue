<template>
    <section class="cabinet">
        <div class="container">
            <form class="cabinet-form">
                <div class="cabiten-top">
                    <h2 class="cabiten-title">
                        Увійти
                    </h2>
                    <p class="login-google">
                        <google-login/>
                    </p>
                </div>
                <label for="cabinet-input" class="cabinet-label">
                    Email
                    <input type="email" name="email" id="cabinet-input" class="cabinet-input" v-model="this.email">
                </label>
                <label for="cabinet-input" class="cabinet-label">
                    Пароль
                    <input type="password" name="password" id="cabinet-input" class="cabinet-input" v-model="this.pass">
                </label>
                <div>
                    <button class="login-btn" @click.prevent="loginUser">
                        Увійти
                    </button>
                </div>
                <button class="register-btn">
                    <router-link to="/Register">
                        Зареєструватись
                    </router-link>
                </button>
            </form>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import googleLogin from '@/components/googleLogin.vue'
export default {
    components:{
        googleLogin
    },
    data(){
        return{
            email: '',
            pass: '',
            fromPage: ''
        }
    },
    methods:{
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
        }
    },
    async mounted(){
        if(JSON.parse(localStorage.getItem('user'))){
            if(JSON.parse(localStorage.getItem('user'))[0].role != 'tempUser'){
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                let formData = new FormData();
                formData.append('email', JSON.parse(localStorage.getItem('user'))[0].email);
                formData.append('token', JSON.parse(localStorage.getItem('user'))[0].token);
                await axios.post('https://nash.enott.com.ua/api/checkToken', formData, config)
                .then(response => {
                    if(response.data.status){
                        if(this.fromPage == '/Cart'){
                            this.$router.push({ path : '/Cart' });
                        }else{
                            this.$router.push({ path : '/Cabinet/main' });
                        }
                    }else{
                        localStorage.removeItem("user")
                    }
                })
            }
            this.$store.dispatch('setPosInCart');
        }
        this.$store.dispatch('setLoader', false);
        this.$store.dispatch('setVisibleMenu', false);
        this.fromPage = this.$router.options.history.state.back
    },
}
</script>

<style scoped>
    .cabiten-top{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .cabinet-form{
        width: 40%;
        margin: 0 auto;
    }
    .cabiten-top{
        margin-bottom: 32px;
    }
    .cabiten-title, .cabinet-label{
        width: 100%;
    }
    .cabiten-title{
        margin-bottom: 0;   
    }
    .login-btn{
        background: #00A439;
        border-radius: 25px;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        text-transform: uppercase;
        color: #fff;
        padding: 14px;
        cursor: pointer;
        width: 150px;
    }
    .login-google{
        margin-left: auto;
        display: flex;
        flex-direction: column;
        align-self: center;
    }
    @media (max-width: 1000px) {
        .cabinet-form{
            margin: 60px auto;
            width: 90%;

        }
    }
</style>