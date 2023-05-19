<template>
    <section class="cabinet">
        <div class="container">
            <route routeName="Кабінет"/>
            <form class="cabinet-form">
                <h2 class="cabiten-title">
                    Зареєструватись
                </h2>
                <label for="cabinet-input" class="cabinet-label">
                    Email
                    <input type="email" name="email" id="cabinet-input" class="cabinet-input" v-model="this.email">
                </label>
                <label for="cabinet-input" class="cabinet-label">
                    Пароль
                    <p class="register-alert" v-if="this.password != this.password2">
                        Паролі повинні співпадати
                    </p>
                    <input :type="this.changeVis" v-model="this.password" name="password" id="cabinet-input" class="cabinet-input">
                </label>
                <label class="register-checker" for="changer2">
                    <input type="checkbox" id="changer2" v-model="this.visiblePass">Показати пароль
                </label>
                <label for="cabinet-input" class="cabinet-label">
                    Повторити пароль
                    <p class="register-alert" v-if="this.password != this.password2">
                        Паролі повинні співпадати
                    </p>
                    <input :type="this.changeVis" v-model="this.password2" name="password" id="cabinet-input" class="cabinet-input">
                </label>
                <label for="cabinet-input" class="cabinet-label">
                    Прізвище
                    <input type="text" name="subName" id="cabinet-input" class="cabinet-input" v-model="this.fname">
                </label>
                <label for="cabinet-input" class="cabinet-label">
                    Ім'я
                    <input type="text" name="firstName" id="cabinet-input" class="cabinet-input" v-model="this.sname">
                </label>
                <button class="login-btn" @click.prevent="registerUser">
                    Зареєструватись
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
            visiblePass: false,
            password: '',
            password2: '',
            email: '',
            fname: '',
            sname: '',
            checkSuccess: ''
        }
    },
    methods:{
        async registerUser(){
            let checkEmpty = true
            var existUser = ''
            if(this.email && this.password && this.password2 && this.fname && this.sname){
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
                formData.append('fname', this.fname);
                formData.append('sname', this.sname);
                await axios.post('https://nash.enott.com.ua/api/register', formData, config)
                .then(response => {
                    if(response.data.status){
                        this.$router.push({ path : '/ThankYou' });
                    }else{
                        alert("Такий користувач вже зареєстрований!")
                    }
                })
                // if(existUser){
                //     this.checkSuccess = true
                // }else{
                //     window.scrollTo(0, 0);
                //     this.existUserMessage = true
                // }
            }
        }
    },
    computed:{
        changeVis(){
            if(this.visiblePass){
                return 'text'
            }else{
                return 'password'
            }
        }
    },
    mounted(){
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
        width: 250px;
    }
    .register-checker{
        margin-top: -20px;
        margin-bottom: 20px;
    }
    .register-alert{
        width: 100%;
        font-size: 12px;
        color: red;
    }
</style>