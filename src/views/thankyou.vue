<template>    
    <section class="cabinet">
        <div class="container">
            <h2 class="cabiten-title">
                Дякуємо за реєстрацію
            </h2>
            <p class="descr-content_item">
                Прохання перейти на пошту для підтвердження 
            </p>
        </div>
    </section>
</template>

<script>
export default {
    mounted(){
        this.$store.dispatch('setLoader', false);
    }
}
</script>

<style>

</style>