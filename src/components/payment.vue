<template>
  <section class="pay">
      <div class="container">
        <form action="" class="form">
          <label for="value">
            Сумма
            <input type="number" name="value" placeholder="value" v-model="this.value">
          </label>
          <label for="comments">
            Коментар
            <input type="text" name="comments" placeholder="value" v-model="this.valComments">
          </label>
          <button @click.prevent="payment()">Submit</button>
        </form>
      </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{            
            value: '',
            valData: '',
            valComments: ''
        }
    },
    methods:{
        payment(){
        var privatKey = 'sandbox_xQs3173QoGmt3fD3olfWAjUQrgsmCh7Zgmdb9LpX'
        var json_string = '{"public_key":"sandbox_i23769093976","version":"3","action":"pay","amount":"' + this.value + '","currency":"UAH","description":"' + this.valComments + '","order_id":"000001"}'
        this.valData = btoa(json_string)
        window.location.href = 'https://www.liqpay.ua/api/3/checkout?data=' + this.valData + '&signature=' + CryptoJS.SHA1(privatKey + this.valData + privatKey).toString(CryptoJS.enc.Base64)
        },
    },
    // computed:{
    //     async sha1() {
    //     const buf = Uint8Array.from(unescape(encodeURIComponent(this.valData)), c=>c.charCodeAt(0)).buffer;
    //     const digest = await crypto.subtle.digest('SHA-1', buf);
    //     const raw = String.fromCharCode.apply(null, new Uint8Array(digest));
    //     return raw; // 20-символьная строка
    //     }
    // }
}
</script>

<style>

</style>