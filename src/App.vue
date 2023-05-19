<template>
    <div class="wrapper">
        <my-header/>
        <div class="head-cart" v-if="cartVisible && currentRouteName != 'Cart'">
            <p class="head-cart_text" @click.prevent="closeCart()">
               <img src="@/assets/img/return.png" alt="Return"> Повернутися до покупок
            </p>
            <cartList/>
        </div>
        <router-view />
        <my-footer/>
        <div class="overlay" v-if="cartVisible"></div>
        <Transition name="fade" v-show="isLoading">
            <Loader />
        </Transition>
    </div>
</template>

<script>
import myHeader from '@/components/Header.vue'
import myFooter from '@/components/Footer.vue'
import cartList from '@/components/cart.vue'
import Loader from '@/components/Loader.vue'
export default {
    components:{
        myHeader, myFooter, cartList, Loader
    },
    computed:{
        cartVisible(){
            return this.$store.getters.cartVisible
        },
        currentRouteName() {
            return this.$route.name;
        },
        isLoading(){
            return this.$store.getters.loader
        }
    },
    methods:{
        closeCart(){
            this.$store.dispatch('setCartVisible', false);
        }
    },
}
</script>

<style>
    .head-cart{
        width: 600px;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 999;
        background: #FFF7ED;
        padding: 40px 0 68px;
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
        z-index: 99;
    }
</style>