import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import Maska from 'maska'
import { QuillEditor } from '@vueup/vue-quill'
import VWave from 'v-wave'

import '@vueup/vue-quill/dist/vue-quill.snow.css';

import './assets/main.css';

const app = createApp(App)

app.use(store)
app.use(VueAxios, axios)
app.use(router)
app.use(Maska)
app.component('QuillEditor', QuillEditor)
app.use(VWave)
app.mount('#app')