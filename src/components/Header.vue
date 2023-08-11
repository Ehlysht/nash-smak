<template>
  <header class="header" id="header" :style="`z-index: ${this.visibleMenu ? 2 : 1}`">
    <div :class="`${this.screenWidth <= 480 ? 'container-fluid' : 'container'}`">
        <nav class="header-nav">
            <router-link to="/" class="nav-logo">
                <img src="@/assets/img/logo.png" alt="Logo" class="nav-logo_link">
            </router-link>
            <ul class="nav-menu" v-if="this.screenWidth > 650 || this.openVis">
                <li class="menu-item" @click="openMenu(1)">
                    Наше печиво <img src="@/assets/img/menu-arrow.png" alt="Arrow" class="menu-arrow" :class="`${this.visibleMenu == 1 ? 'menu-arrow_active' : ''}`">
                </li>
                <li class="menu-item" @click="openMenu(2)">
                    Про нас <img src="@/assets/img/menu-arrow.png" alt="Arrow" class="menu-arrow" :class="`${this.visibleMenu == 2 ? 'menu-arrow_active' : ''}`">
                </li>
                <li class="menu-item">
                    <router-link to="/btb">
                        B2B
                    </router-link>
                </li>
            </ul>
            <transition name="showHide">
                <ul class="menu-sublist" v-if="this.visibleMenu == 1 || this.visibleMenu == 'all'">
                    <div class="container">
                        <h3 class="menu-sublist_title" v-if="this.screenWidth <= 480">
                            Наше печиво
                        </h3>
                        <li class="sublist-item sublist-item1">
                            <img src="@/assets/img/goods.png" alt="Image" class="sublist-item_img">
                            <h3>
                                Онлайн крамниця
                            </h3>
                            <router-link to="/Goods/Онлайн крамниця" class="sublist-item_link">Придбати печиво 
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
                                    <path d="M1.03326 15.0391L7.39723 8.6751C7.78775 8.28458 7.78477 7.65442 7.39057 7.26761L0.966713 0.964111" stroke="#470D04" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                            </router-link>
                            
                        </li>
                        <li class="sublist-item sublist-item2">
                            <img src="@/assets/img/catalog.png" alt="Image" class="sublist-item_img">
                            <h3>
                                Каталог
                            </h3>
                            <router-link to="/Catalog/Каталог" class="sublist-item_link">Переглянути каталог 
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
                                    <path d="M1.03326 15.0391L7.39723 8.6751C7.78775 8.28458 7.78477 7.65442 7.39057 7.26761L0.966713 0.964111" stroke="#470D04" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                            </router-link>
                        </li>
                    </div>
                </ul>
            </transition>
            <transition name="showHide">
                <ul class="menu-sublist menu-sublist_about" v-if="this.visibleMenu == 2 || this.visibleMenu == 'all'">  
                    <div class="container">
                        <h3 class="menu-sublist_title" v-if="this.screenWidth <= 480">
                            Про нас
                        </h3>
                        <li class="sublist-item">
                            <router-link class="sublist-item_link sublist-about_link" to="/btb">
                                <h4>
                                    Наша історія
                                </h4>
                                <p>
                                    Від початку до сьогодення: Огляд нашого розвитку.
                                </p>
                                <img src="@/assets/img/history.png" alt="Image" class="sublist-about_img">
                            </router-link>
                        </li>
                        <li class="sublist-item">
                            <router-link class="sublist-item_link sublist-about_link" to="/vacancy">
                                <h4>
                                    Вакансії
                                </h4>
                                <p>
                                    Приєднуйтесь до нашої історії: Актуальні вакансії.
                                </p>
                                <img src="@/assets/img/vacancy.png" alt="Image" class="sublist-about_img sublist-about_img__small">
                            </router-link>
                        </li>
                        <li class="sublist-item">
                            <router-link class="sublist-item_link sublist-about_link" to="/faq">
                                <h4>
                                    Питання та відповіді
                                </h4>
                                <p>
                                    Часті запитання: Відповіді на ваші популярні питання.
                                </p>
                                <img src="@/assets/img/faq.png" alt="Image" class="sublist-about_img sublist-about_img__small">
                            </router-link>
                        </li>
                        <li class="sublist-item">
                            <router-link class="sublist-item_link sublist-about_link" to="/Contacts">
                                <h4>
                                    Контакти
                                </h4>
                                <p>
                                    Ми готові відповісти на ваші запитання - наша контактна інформацію тут.
                                </p>
                                <img src="@/assets/img/contacs.png" alt="Image" class="sublist-about_img sublist-about_img__small">
                            </router-link>
                        </li>
                    </div>
                    <div class="container sublist-btb" v-if="this.screenWidth <= 480">
                        <h3 class="menu-sublist_title">
                            B2B
                        </h3>
                        <li class="sublist-item">
                            <router-link class="sublist-item_link sublist-about_link" to="/btb">
                                <h4>
                                    B2B Печиво
                                </h4>
                                <p>
                                    Насолоджуйтесь солодким бізнесом. Оптові пропозиції для партнерів.
                                </p>
                                <img src="@/assets/img/btb.png" alt="Image" class="sublist-about_img sublist-about_btbImg">
                            </router-link>
                        </li>
                    </div>
                </ul>
            </transition>
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
                    <a href="#" @click.prevent="openLogin()">
                        <img src="@/assets/img/login.svg" alt="Login">
                    </a>
                </li>
                <li class="login-item">
                    <a href="#" @click.prevent="openCart()">
                        <img src="@/assets/img/cart.svg" alt="Cart">
                        <span class="login-cart_count" v-if="posInCart">{{ posInCart }}</span>
                    </a>
                </li>
            </ul>
            <div id="nav-icon4" class="nav-icon4" @click.prevent="openMenu('all')" :class="`${visibleMenu ? 'open' : ''}`">
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
        visibleMenu(){
            return this.$store.getters.visibleMenu
        },
        posInCart(){
            return this.$store.getters.posInCart
        }
    },
    methods:{   
        openMenu(id){
            if(id == this.visibleMenu){
                this.$store.dispatch('setVisibleMenu', false);
                this.$store.dispatch('setOverlay', false);
            }else{
                this.$store.dispatch('setVisibleMenu', id);
                this.$store.dispatch('setOverlay', true);
            }
        },
        changeLand(land){
            localStorage.setItem('user-land', land)
            location.reload()
        },
        burgerChange(){
            this.openVis = !this.openVis
            this.$store.dispatch('setOverlay', this.openVis);
        },
        openCart(){
            if(JSON.parse(localStorage.getItem('user'))){
                if(this.$route.name != 'Cart'){
                    this.$store.dispatch('setCartVisible', true);
                    this.$store.dispatch('setOverlay', true);
                }
            }else{
                alert("Please login or register!")
            }
        },
        openLogin(){
            if(!JSON.parse(localStorage.getItem('user'))){
                this.$store.dispatch('setLoginVisible', true);
                this.$store.dispatch('setOverlay', true);
                // document.body.style.overflow = "hidden";
            }else{
                if(JSON.parse(localStorage.getItem('user'))[0].role == 'tempUser'){
                    this.$store.dispatch('setLoginVisible', true);
                    this.$store.dispatch('setOverlay', true);
                    // document.body.style.overflow = "hidden";
                }else{
                    this.$router.push({ path : '/Cabinet/main' });
                }
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
        this.$store.dispatch('setVisibleMenu', false);
        this.$store.dispatch('setPosInCart');
    }
}
</script>

<style>

</style>