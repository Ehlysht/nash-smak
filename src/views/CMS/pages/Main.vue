<template>
  <section class="adminPage">
    <div class="container">
        <form>
            <input type="file" ref="file" @change="onChangeFileUpload()">
            <button @click.prevent="updateGoods()">Run онлайн крамниця</button>
            <button @click.prevent="updateCatalog()">Run каталог</button>
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
        updateCatalog(){
            let formData = new FormData();
            formData.append('file', this.file);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            axios.post('https://nash.enott.com.ua/api/updateCatalog', formData, config
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

<style scoped>
    button{
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        padding: 15px 0;
        text-align: center;
        background: #00A439;
        width: 320px;
        border-radius: 15px;
        color: #fff;
        margin-left: auto;
    }
</style>