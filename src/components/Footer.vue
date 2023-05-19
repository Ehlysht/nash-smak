<template>
  <footer class="footer" id="footer">
    <cart-list v-if="this.openCart"/>
    <div class="container">
        
    </div>
  </footer>
</template>

<script>
export default {
    data(){
      return{
        openCart: true
      }
    }
}
</script>

<style>

</style>