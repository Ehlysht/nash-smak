<template>
    <GoogleLogin :callback="callback"/>
</template>

<script>
import { decodeCredential } from 'vue3-google-login'
import axios from 'axios'
export default {
    data(){
        return{
            callback: (response) => {
                const userData = decodeCredential(response.credential)
                if(userData.email_verified){
                    var userInfo = []
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    let formData = new FormData();
                    formData.append('email', userData.email);
                    formData.append('fname', userData.family_name);
                    formData.append('sname', userData.given_name);
                    if(localStorage.getItem('user')){
                        if(JSON.parse(localStorage.getItem('user'))[0].role == 'tempUser'){
                            formData.append('tempLogin', JSON.parse(localStorage.getItem('user'))[0].email);
                        }
                    }
                    axios.post('https://nash.enott.com.ua/api/loginGoogle', formData, config)
                    .then(response => {
                        if(response.data.status){
                            userInfo = [
                                {'email': userData.email, 'role': response.data.role, 'token': response.data.token}
                            ]
                            localStorage.setItem("user", JSON.stringify(userInfo))
                            this.$router.push({ path : '/Cabinet/main' });
                            this.$store.dispatch('setPosInCart');
                        }else{
                            alert("Такого користувача неіснує або пошта/пароль невірні")
                            localStorage.removeItem("user")
                        }
                    })
                }
            }
        }
    }
}
</script>

<style>

</style>