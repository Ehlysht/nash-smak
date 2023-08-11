import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import Maska from 'maska'
import { QuillEditor } from '@vueup/vue-quill'
import VWave from 'v-wave'
import vue3GoogleLogin from 'vue3-google-login'
import Vue3ColorPicker from "vue3-colorpicker";
import AOS from 'aos';

import 'aos/dist/aos.css'; 
import "vue3-colorpicker/style.css";
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import './assets/main.css';

const CLIENT_ID = '808829308864-gk9cfs3teh6poia07ospricfbo5l38vo.apps.googleusercontent.com'
const app = createApp(App)

app.use(store)
app.use(VueAxios, axios)
app.use(router)
app.use(Maska)
app.component('QuillEditor', QuillEditor)
app.use(vue3GoogleLogin, {
    clientId: CLIENT_ID
})
app.use(Vue3ColorPicker)
app.use(VWave)
app.mount('#app')
AOS.init();