<template>
    <section class="cabinet">
        <div class="container">
            <route routeName="Кабінет"/>
            <form class="cabinet-form">
                <h2 class="cabiten-title">
                    Увійти
                </h2>
                <label for="cabinet-input" class="cabinet-label">
                    Email
                    <input type="email" name="email" id="cabinet-input" class="cabinet-input" v-model="this.email">
                </label>
                <label for="cabinet-input" class="cabinet-label">
                    Пароль
                    <input type="password" name="password" id="cabinet-input" class="cabinet-input" v-model="this.pass">
                </label>
                <button class="login-btn" @click.prevent="loginUser">
                    Увійти
                </button>
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
export default {
    data(){
        return{
            email: '',
            pass: ''
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
                await axios.post('https://nash.enott.com.ua/api/loginUser', formData, config)
                .then(response => {
                    if(response.data.status){
                        userInfo = [
                            {'email': this.email, 'role': response.data.role, 'token': response.data.token}
                        ]
                        localStorage.setItem("user", JSON.stringify(userInfo))
                        this.$router.push({ path : '/Cabinet/main' });
                    }else{
                        alert("Такого користувача неіснує або пошта/пароль невірні")
                        localStorage.removeItem("user")
                    }
                })
            }
        }
    },
    mounted(){
        if(JSON.parse(localStorage.getItem('user'))){
            this.$router.push({ path : '/Cabinet/main' });
        }
        this.$store.dispatch('setLoader', false);
    }
}
</script>

<style scoped>
    .cabinet-form{
        width: 40%;
        margin: 0 auto;
    }
    .cabiten-title, .cabinet-label{
        width: 100%;
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
</style>