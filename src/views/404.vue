<template>
  
</template>

<script>
export default {
    mounted(){
        this.$store.dispatch('setLoader', false);
        this.$store.dispatch('setCartVisible', false);
        this.$store.dispatch('setVisibleMenu', false);
    }
}
</script>

<style>

</style>