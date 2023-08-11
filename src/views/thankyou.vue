<template>    
    <section class="thankYou">
        <div class="container">
            <h2 class="thankYou-title">
                Дякуємо за реєстрацію
            </h2>
            <p class="thankYou-descr">
                Прохання перейти на пошту для підтвердження 
            </p>
        </div>
    </section>
</template>

<script>
export default {
    mounted(){
        this.$store.dispatch('setLoader', false);
        this.$store.dispatch('setVisibleMenu', false);
        this.$store.dispatch('setLoginVisible', false);
        this.$store.dispatch('setOverlay', false);
    }
}
</script>

<style scoped>
    .thankYou{
        padding: 80px 0;
    }
</style>