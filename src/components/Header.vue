<template>
  <header class="header" id="header">
    <div class="container">
        <nav class="header-nav">
            <router-link to="/" class="nav-logo">
                <img src="@/assets/img/logo.png" alt="Logo" class="nav-logo_link">
            </router-link>
            <ul class="nav-menu" v-if="this.screenWidth > 650 || this.openVis">
                <li class="menu-item" @click="openMenu(1)">
                    Наше печиво <img src="@/assets/img/menu-arrow.png" alt="Arrow" class="menu-arrow" :class="`${this.visibleMenu == 1 ? 'menu-arrow_active' : ''}`">
                    <ul class="menu-sublist" v-if="this.visibleMenu == 1">
                        <li class="sublist-item"><router-link to="/Goods/Онлайн крамниця">Онлайн крамниця</router-link></li>
                        <li class="sublist-item"><router-link to="/Catalog/Каталог">Каталог</router-link></li>
                    </ul>
                </li>
                <li class="menu-item" @click="openMenu(2)">
                    Наша історія <img src="@/assets/img/menu-arrow.png" alt="Arrow" class="menu-arrow" :class="`${this.visibleMenu == 2 ? 'menu-arrow_active' : ''}`">
                    <ul class="menu-sublist" v-if="this.visibleMenu == 2">
                        <li class="sublist-item"><router-link to="/">Item1</router-link></li>
                        <li class="sublist-item"><router-link to="/">Item2</router-link></li>
                        <li class="sublist-item"><router-link to="/">Item3</router-link></li>
                        <li class="sublist-item"><router-link to="/">Item4</router-link></li>
                        <li class="sublist-item"><router-link to="/">Item5</router-link></li>
                    </ul>
                </li>
                <li class="menu-item">
                    B2B
                </li>
            </ul>
            <p class="land-text land-text_active" @click="this.openLand = true" v-if="this.screenWidth <= 768 && !this.openLand">
                {{ this.userLand }}
            </p>
            <ul class="nav-land" v-if="this.screenWidth > 768 || this.openLand">
                <li class="land-text" @click="changeLand('ua')" :class="`${this.userLand == 'ua' ? 'land-text_active' : ''}`">
                    UA
                </li>
                <li class="land-text" @click="changeLand('en')" :class="`${this.userLand == 'en' ? 'land-text_active' : ''}`">
                    EN
                </li>
            </ul>
            <ul class="nav-login">
                <li class="login-item">
                    <router-link to="/Login">
                        <img src="@/assets/img/login.svg" alt="Login">
                    </router-link>
                </li>
                <li class="login-item">
                    <a href="#" @click.prevent="openCart()">
                        <img src="@/assets/img/cart.svg" alt="Cart">
                    </a>
                </li>
            </ul>
            <div id="nav-icon4" @click.prevent="burgerChange()" :class="`${openVis ? 'open' : ''}`">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    </div>
  </header>
</template>

<script>
export default {
    data(){
        return{
            visibleMenu: false,
            userLand: '',
            screenWidth: '',
            openLand: false,
            openVis: false,
        }
    },
    computed:{
        cartVisible(){
            return this.$store.getters.cartVisible
        },
    },
    methods:{   
        openMenu(id){
            if(id == this.visibleMenu){
                this.visibleMenu = false
            }else{
                this.visibleMenu = id
            }
        },
        changeLand(land){
            localStorage.setItem('user-land', land)
            location.reload()
        },
        burgerChange(){
            this.openVis = !this.openVis
        },
        openCart(){
            if(JSON.parse(localStorage.getItem('user'))){
                this.$store.dispatch('setCartVisible', true);
            }else{
                alert("Please login or register!")
            }
        }
    },
    mounted(){
        if(localStorage.getItem('user-land')){
            this.userLand = localStorage.getItem('user-land')
        }else{
            this.userLand = 'ua'
        }
        this.screenWidth = screen.width
    }
}
</script>

<style>

</style>