<template>
  <form class="vacancy-callback_form" id="vacancy-callback_form">
        <p class="vacancy-callback_formTitle">
            Подати заявку
        </p>
        <label for="name" class="vacancy-callback_formLabel">
            <p>Ім'я <span>*</span></p>
            <input type="text" name="name" id="name" class="vacancy-callback_formInput" v-model="this.vacName" required>
        </label>
        <label for="sname" class="vacancy-callback_formLabel">
            <p>Прізвище <span>*</span></p>
            <input type="text" name="sname" id="sname" class="vacancy-callback_formInput" v-model="this.vacSName" required>
        </label>
        <label for="phone" class="vacancy-callback_formLabel">
            <p>Телефон <span>*</span></p>
            <input type="text" v-maska="'+38 ### ### ## ##'" name="phone" id="phone" class="vacancy-callback_formInput" v-model="this.vacPhone" required>
        </label>
        <label for="email" class="vacancy-callback_formLabel">
            <p>Email <span>*</span></p>
            <input type="email" name="email" id="email" class="vacancy-callback_formInput" v-model="this.vacEmail" required>
        </label>
        <div class="vacancy-callback_formfiles">
            <label class="vacancy-callback_formLabel">
                <p>Ваше резюме (doc, pdf, txt) <span>*</span></p>
                <div class="file-drop-area">
                    <span class="fake-btn">Завантажити файл</span>
                    <span class="file-msg" v-html="this.file1.name"></span>
                    <input class="file-input" accept=".pdf, .txt, .doc, .docx" type="file" ref="file1" required>
                </div>
            </label>
            <label class="vacancy-callback_formLabel">
                <p>Мотиваційний лист (doc, pdf, txt)</p>
                <div class="file-drop-area">
                    <span class="fake-btn">Завантажити файл</span>
                    <span class="file-msg" v-html="this.file2.name"></span>
                    <input class="file-input" accept=".pdf, .txt, .doc, .docx" type="file" ref="file2">
                </div>
            </label>
            <label class="vacancy-callback_formLabel">
                <p>Рекомендації (doc, pdf, txt)</p>
                <div class="file-drop-area">
                    <span class="fake-btn">Завантажити файл</span>
                    <span class="file-msg" v-html="this.file2.name"></span>
                    <input class="file-input" accept=".pdf, .txt, .doc, .docx" type="file" ref="file3">
                </div>
            </label>
        </div>
        <p class="vacancy-callback_formAlert">
            * Обов’язкове поле для заповнення
        </p>
        <button class="btn vacancy-callback_formBtn" @click.prevent="sendMail()">
            Надіслати
        </button>
        <label for="cart-goods_agreement" class="cart-goods_agreement container-check">
            <input type="checkbox" id="cart-goods_agreement" value="approved" v-model="this.agree"><p>Даю згоду на обробку персональних даних</p>
            <span class="checkmark" style="position: relative;"></span>
        </label>
        <div v-html="this.testMess"></div>
    </form>
</template>

<script>
import axios from 'axios'
export default {
    props: ['jobName', 'jobId'],
    data(){
        return{
            file1: '',
            file2: '',
            file3: '',
            vacName: '',
            vacSName: '',
            vacPhone: '',
            vacEmail: '',
            agree: true,
            testMess: ''
        }
    },
    methods:{
        sendMail(){
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            let formData = new FormData();
            if(this.jobId){
                formData.append('vacSubject', 'Подача резюме на вакансію ' + this.jobName);
                formData.append('linkToJob', '<p>Хочу податись на вакансію <a href="https://nash.enott.com.ua/vacancy/' + this.jobId + '/' + this.jobName + '">' + this.jobName + '</a></p>');
            }else{
                formData.append('vacSubject', 'Шукаю роботу у вас');
            }
            formData.append('file1', this.$refs.file1.files[0]);
            formData.append('file2', this.$refs.file2.files[0]);
            formData.append('file3', this.$refs.file3.files[0]);
            formData.append('vacName', this.vacName);
            formData.append('vacSName', this.vacSName);
            formData.append('vacPhone', this.vacPhone);
            formData.append('vacEmail', this.vacEmail);
            axios.post('https://nash.enott.com.ua/api/vacMail', formData, config)
            .then(response => {
                alert(response.data)
            })
        }
    }
}
</script>

<style>

</style>