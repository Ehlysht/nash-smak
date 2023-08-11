<template>
    <div>
        <ul class="cabinet-menu">
            <li class="cabinet-item">
                <router-link to="/Cabinet/main" class="cabinet-link">
                    <img src="@/assets/img/profile.png" alt="profile">
                    Особисті дані
                </router-link>
            </li>
            <li class="cabinet-item">
                <router-link to="/Cabinet/address" class="cabinet-link">
                    <img src="@/assets/img/house.png" alt="house">
                    Адреса
                </router-link>
            </li>
            <li class="cabinet-item">
                <router-link to="/Cabinet/password" class="cabinet-link">
                    <img src="@/assets/img/settings.png" alt="settings">
                    Пароль
                </router-link>
            </li>
            <li class="cabinet-item">
                <a href="#" class="cabinet-link" @click.prevent="this.popAppAccept = true">
                    <img src="@/assets/img/log-out.png" alt="log-out">
                    Вийти
                </a>
            </li>
            <li class="cabinet-item" v-if="this.njvfiAdmin">
                <router-link to="/CMS/orders" class="cabinet-link">
                    <img src="@/assets/img/settings.png" alt="settings">
                    Адміністратор
                </router-link>
            </li>
        </ul>
        <Transition name="fade">
            <div class="access-popApp" v-if="this.popAppAccept">
                <div class="access-popApp_block">
                    <p class="access-popApp_text">
                        Ви дійсно хочете вийти?
                    </p>
                    <div class="access-popApp_btns">
                        <button class="access-popApp_yes btn" @click.prevent="logout()"><a href="#">Так</a></button>
                        <button class="access-popApp_no btn" @click.prevent="this.popAppAccept = false"><a href="#">Ні</a></button>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
export default {
    data(){
        return{
            popAppAccept: false,
            njvfiAdmin: false
        }
    },
    methods:{
        logout(){
            localStorage.removeItem("user")
            this.$store.dispatch('setPosInCart');
            this.$router.push({ path : '/' });
        }
    },
    mounted(){
        if(JSON.parse(localStorage.getItem('user'))[0].role == 'admin'){
            this.njvfiAdmin = true
        }
    }
}
</script>

<style>

</style>