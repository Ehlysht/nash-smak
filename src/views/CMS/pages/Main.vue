<template>
  <section class="adminPage">
    <div class="container">
        <form>
            <input type="file" ref="file" @change="onChangeFileUpload()">
            <button @click.prevent="updateGoods()">Submit</button>
        </form>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            file: ''
        }
    },
    methods:{
        updateGoods(){
            let formData = new FormData();
            formData.append('file', this.file);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            axios.post('https://nash.enott.com.ua/api/updateGoods', formData, config
            ).then(function(){
                alert("Змінено")
                location.reload(true)
            })
            .catch(function(){
                alert("Перевірьте чи правильно заповнили всі поля");
            });
        },        
        onChangeFileUpload(){
            this.file = this.$refs.file.files[0];
        },
    },
    mounted(){
        this.$store.dispatch('setLoader', false);
    }
}
</script>

<style>

</style>