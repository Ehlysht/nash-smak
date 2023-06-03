<template>
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
            <router-link to="/" class="cabinet-link" @click.prevent="logout">
                <img src="@/assets/img/log-out.png" alt="log-out">
                Вийти
            </router-link>
        </li>
        <!-- <li class="cabinet-item">
            <router-link to="/CMS/Main" class="cabinet-link">
                <img src="@/assets/img/settings.png" alt="settings">
                Адміністратор
            </router-link>
        </li> -->
    </ul>
</template>

<script>
export default {
    methods:{
        logout(){
            localStorage.removeItem("user")
        }
    }
}
</script>

<style>

</style>