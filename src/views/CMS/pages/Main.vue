<template>
  <section class="adminPage">
    <div class="container">
        <div class="adminPage-content">
            <adm-menu/>
            <div class="adminPage-info">
                <orders :routeVal="this.$route.params.choice"/>
                <goods :routeVal="this.$route.params.choice"/>
                <catalog :routeVal="this.$route.params.choice"/>
                <form class="adminPage-form" v-if="this.$route.params.choice == 'carusel'">
                    <h2 class="adminPage-subtitle">
                        Банери
                    </h2>
                    <div class="file-drop-area">
                        <span class="fake-btn">Завантажити файл</span>
                        <input class="file-input" type="file" ref="file" @change="addBanner()">
                    </div>
                    <div class="adminPage-carusels">
                        <transition-group name="list">
                            <div v-for="slide in this.bannersList" :key="slide.id" style="position:relative;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" class="photosList-delete" @click.prevent="this.popAppAccept = 'deleteBanner'; this.modal1 = slide.id; this.modal2 = slide.img">
                                    <path d="M17 1L1 17M1 1L17 17" stroke="#470D04" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <img style="width:100%;height:auto" :src="`https://nash.enott.com.ua/api/upload/${slide.img}`" alt="Banners">
                            </div>
                        </transition-group>
                    </div>
                </form>
                <form class="adminPage-form" v-if="this.$route.params.choice == 'advertising'">
                    <h2 class="adminPage-subtitle">
                        Рекламний блок
                    </h2>
                    <div class="adv-admin">
                        <label for="adv1" class="adminPage-select">
                            Назва
                            <input id="adv1" type="text" v-model="this.advTitle">
                        </label>
                        <div class="adminPage-select_row">
                            <label>
                                Колір
                            </label>
                            <input type="color" class="adv-admin_color" v-model="this.advTextColor">
                        </div>
                        <label for="adv2" class="adminPage-select">
                            Текст
                            <QuillEditor style="margin-bottom: 16px;" ref="quilEditor" :toolbar="false" class="contacts-textarea" v-model:content="this.advDescr" v-if="this.advDescr" contentType="html"/>
                        </label>
                        <div class="adminPage-select_row">
                            <label>
                                Колір
                            </label>
                            <input type="color" class="adv-admin_color" v-model="this.advDescrColor">
                        </div>
                        <div class="adminPage-select_row">
                            <label for="adv1" class="adminPage-select" style="width:28%;">
                                Назва кнопки
                                <input id="adv1" type="text" v-model="this.advBtnText" style="width:88%;">
                            </label>
                            <label for="adv1" class="adminPage-select" style="width:72%;">
                                Посилання для кнопки
                                <input id="adv1" type="text" v-model="this.advLinkTo">
                            </label>
                        </div>  
                        <label for="adv1" class="adminPage-select" style="width:72%;">
                            Фото
                            <div class="file-drop-area" style="width: 90%;">
                                <span class="fake-btn">Завантажити файл</span>
                                <input class="file-input" type="file" ref="file" @change="advHeadChange($event)">
                            </div>
                        </label>
                        <p class="adminPage-text" style="color: #470D04;font-weight:500;font-size: 18px;margin-top:40px;">
                            Фон
                        </p>

                        <div class="adminPage-select_row__bg">
                            <div class="adminPage-select_row" style="margin-bottom: 32px;">
                                <label>
                                    Колір
                                </label>
                                <input type="color" class="adv-admin_color" v-model="this.advDescrColor">
                            </div>
                            <label style="margin: 0 48px 32px 48px;color:#A6A4A2;">
                                або
                            </label>
                            <label for="adv1" class="adminPage-select" style="width:72%;">
                                Фото
                                <div class="file-drop-area" style="width: 100%;">
                                    <span class="fake-btn">Завантажити файл</span>
                                    <input class="file-input" type="file" ref="file" @change="advBg($event)">
                                </div>
                            </label>
                            <label style="margin: 0 48px 32px 48px;color:#A6A4A2;">
                                або
                            </label>
                            <label for="adv1" class="adminPage-select" style="width:72%;">
                                Градієнт
                                <input id="adv1" type="text" v-model="this.advBgColor">
                            </label>
                        </div>
                        <label for="text222" class="adminPage-select" style="color:#470D04;font-size: 18px;font-weight:500;margin-bottom:16px;">
                            Активна реклама
                            <label class="switch">
                                <input type="checkbox" v-model="this.advShow">
                                <span class="slider round"></span>
                            </label>
                        </label>
                        <button class="adminPage-btn" @click.prevent="this.popAppAccept = 'updateAdv'">
                            Зберегти
                        </button>
                    </div>
                    
                </form>
                <form class="adminPage-form" v-if="this.$route.params.choice == 'instagram'">
                    <h2 class="adminPage-subtitle">
                        INSTAGRAM галерея
                    </h2>
                    <button v-if="this.instaId" @click.prevent="this.instaId = false; this.instaImgFile = ''" style="color: #00A439;cursor: pointer; display:flex; align-items:center;margin: 20px 0;"><img src="@/assets/img/arrow-right.svg" alt="" style="transform: rotate(180deg);"> Повернутись</button>
                    <div class="adv-admin">
                        <div class="adv-admin_label" v-if="this.instaId">
                            <div class="adminPage-item_info">
                                <label>
                                    Посилання
                                    <input type="text" v-model="this.instaLink">
                                </label>
                            </div>
                            <div class="file-drop-area">
                                <span class="fake-btn">Змінити фото</span>
                                <span class="file-msg" v-html="this.file.name"></span>
                                <input class="file-input" type="file" ref="file" @change="editInstaImg($event)">
                            </div>
                            <div :style="`width:240px;height:240px;border-radius: 15px;background:url('${this.instaImgFile ? this.instaImg : this.siteLink + this.instaImg}')center center/cover no-repeat`"></div>
                            <button class="adminPage-btn" @click.prevent="this.popAppAccept = 'editInsta'">
                                Змінити
                            </button>
                        </div>
                    </div>
                    <section class="insta" id="insta" style="padding:0px 0 48px" v-if="!this.instaId">
                        <ul class="insta-carusel">
                            <li style="width:240px;height:240px;" class="insta-slide" v-for="slide in this.instaArray" :key="slide.id">
                                <button class="adminGoods-item_edit" @click.prevent="editInsta(slide.id, 'write', slide.img, slide.link)">
                                    <img src="@/assets/img/edit.png" style="width:20px;height:20px;" alt="Edit">
                                </button>
                                <a :href="slide.link" target="_blank">
                                    <div :style="`width:240px;height:240px;border-radius: 15px;background:url('https://nash.enott.com.ua/api/upload/${slide.img}')center center/cover no-repeat`"></div>
                                </a>
                            </li>
                        </ul>
                    </section>
                </form>
                <form class="adminPage-form" v-if="this.$route.params.choice == 'question'">
                    <h2 class="adminPage-subtitle">
                        Питання та відповіді
                    </h2>
                    <div class="adminPage-item_info" style="width:100%;">
                        <label style="width:100%;">
                            Питання
                            <input style="margin-top:8px;" type="text" v-model="this.questionTitle">
                        </label>
                    </div>
                    <div class="adminPage-item_info" style="width:100%;">
                        <label style="width:100%;">
                            Відповідь
                            <QuillEditor style="margin-top:8px;" ref="quilEditor" :toolbar="false" class="contacts-textarea" v-model:content="this.questionDescr" contentType="html"/>
                        </label>
                    </div>
                    <button style="margin-top:32px;" v-if="this.descrValue == 'add'" class="adminPage-btn" @click.prevent="this.popAppAccept = 'addFaq'">
                        Додати
                    </button>
                    <button style="margin-top:32px;" v-if="this.descrValue != 'add'" class="adminPage-btn" @click.prevent="this.popAppAccept = 'addFaq1'">
                        Змінити
                    </button>
                    <section class="faq">
                        <div class="container">
                            <ul class="faq-list">
                                <li class="faq-item" style="display:flex;flex-wrap:wrap;justify-content: space-between;padding: 0 24px;" v-for="item in this.faqList" :key="item.id">
                                    <h3 style="color:#470D04;font-size: 18px;font-weight: 500;padding:24px 0;" @click.prevent="this.descrValue = 'faq' + item.id">
                                        {{ item.title }}
                                    </h3>
                                    <div style="padding:24px 0;display:flex;">
                                        <button style="color:#00A439;cursor:pointer;margin-right:10px;" @click.prevent="editFaq(item.id)">
                                            Редагувати
                                        </button>
                                        <svg style="cursor:pointer;" @click.prevent="this.popAppAccept = 'deleteFaq'; this.modal1 = item.id" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M11.25 3C10.8574 3 10.4561 3.1377 10.1719 3.42188C9.8877 3.70605 9.75 4.10742 9.75 4.5V5.25H5.25V6.75H6V18.75C6 19.9834 7.0166 21 8.25 21H17.25C18.4834 21 19.5 19.9834 19.5 18.75V6.75H20.25V5.25H15.75V4.5C15.75 4.10742 15.6123 3.70605 15.3281 3.42188C15.0439 3.1377 14.6426 3 14.25 3H11.25ZM11.25 4.5H14.25V5.25H11.25V4.5ZM7.5 6.75H18V18.75C18 19.166 17.666 19.5 17.25 19.5H8.25C7.83398 19.5 7.5 19.166 7.5 18.75V6.75ZM9 9V17.25H10.5V9H9ZM12 9V17.25H13.5V9H12ZM15 9V17.25H16.5V9H15Z" fill="#00A439"/>
                                        </svg>
                                    </div>
                                    <div style="width:100%;" class="faq-item_descr" v-html="item.descr"></div>
                                </li>
                            </ul>
                        </div>
                    </section>
                </form>
                <form class="adminPage-form" v-if="this.$route.params.choice == 'sendAdv'">
                    <h2 class="adminPage-subtitle">
                        Розсилка реклами
                    </h2>
                    <label class="adminPage-search">
                        Тема листа
                        <input type="text" id="itemSearch" class="file-drop-area" v-model="this.mailSubject">
                    </label>
                    <label for="text17" class="adminPage-item_info__textarea contacts-textarea_show">
                        Опис листа
                        <QuillEditor ref="quilEditor" toolbar="minimal" class="contacts-textarea" v-model:content="this.mailDescr" contentType="html"/>
                    </label>
                    <div class="adminPage-switch">
                        <label for="text222" class="adminPage-select" style="width:25%;margin:32px 0;">
                            Надіслати новинки товарів?
                            <label class="switch">
                                <input type="checkbox" v-model="this.mailNew">
                                <span class="slider round"></span>
                            </label>
                        </label>
                    </div>
                    <p style="width: 100%; font-size: 24px; color: rgb(71, 13, 4); margin-top: 32px; font-weight: 500;">
                        Приклад повідомлення:
                    </p>
                    <p class="showMail-subject">
                        {{ this.mailSubject }}
                    </p>
                    <div class="showMail">
                        <a href="https://nash.enott.com.ua"><img src="https://nash.enott.com.ua/api/upload/logo.png" alt="Logo" class="showMail-logo"></a>
                        <div v-html="this.mailDescr" class="showMail-descr"></div>
                        <ul class="showMail-list" v-if="this.mailNew">
                            <li class="showMail-item" v-for="item in newItemList" :key="item.id">
                                <router-link :to="`/Goods/${item.name}/${item.bar}`" class="showMail-link">
                                    <img :src="`https://nash.enott.com.ua/api/upload/${item.mainImage}`" style="width:100%;height:170px;">
                                    <h3 class="showMail-name">
                                        {{ item.name }}
                                    </h3>
                                    <div class="showMail-bottom">
                                        <p class="showMail-weight">
                                            Від {{ item.weight }}г
                                        </p>
                                        <p class="showMail-price">
                                            Від {{ item.price }} грн
                                        </p>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <button class="adminPage-btn" style="margin-top:32px;"  @click.prevent="this.popAppAccept = 'sendMail'">
                        Відправити
                    </button>
                </form>
                <form class="adminPage-form" v-if="this.$route.params.choice == 'vacancy'">
                    <h2 class="adminPage-subtitle">
                        Вакансії
                    </h2>
                    <div class="adminPage-item_info" style="width:100%;">
                        <label style="width:100%;">
                            Назва
                            <input style="margin-top:8px;" type="text" v-model="this.vacName">
                        </label>
                    </div>
                    <div class="adminPage-item_info" style="width:100%;">
                        <label style="width:100%;">
                            Місто
                            <input style="margin-top:8px;" type="text" v-model="this.vacCity">
                        </label>
                    </div>
                    <label for="text17" class="adminPage-item_info__textarea contacts-textarea_show">
                        Опис
                        <QuillEditor ref="quilEditor" toolbar="minimal" class="contacts-textarea" v-model:content="this.vacDescr" contentType="html"/>
                    </label>
                    <button style="margin-top:32px;" v-if="this.descrValue == 'add'" class="adminPage-btn" @click.prevent="this.popAppAccept = 'addVac'">
                        Додати
                    </button>
                    <button style="margin-top:32px;" v-if="this.descrValue != 'add'" class="adminPage-btn" @click.prevent="this.popAppAccept = 'addVac1'">
                        Змінити
                    </button>
                    <ul class="vacancy-list">
                        <li class="vacancy-item" v-for="vacancy in this.vacancyList" :key="vacancy.id">
                            <div style="padding:24px 0;display:flex;">
                                <button style="color:#00A439;cursor:pointer;margin-right:10px;" @click.prevent="editVac(vacancy.id)">
                                    Редагувати
                                </button>
                                <svg style="cursor:pointer;"  @click.prevent="this.popAppAccept = 'deleteVac'; this.modal1 = vacancy.id" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M11.25 3C10.8574 3 10.4561 3.1377 10.1719 3.42188C9.8877 3.70605 9.75 4.10742 9.75 4.5V5.25H5.25V6.75H6V18.75C6 19.9834 7.0166 21 8.25 21H17.25C18.4834 21 19.5 19.9834 19.5 18.75V6.75H20.25V5.25H15.75V4.5C15.75 4.10742 15.6123 3.70605 15.3281 3.42188C15.0439 3.1377 14.6426 3 14.25 3H11.25ZM11.25 4.5H14.25V5.25H11.25V4.5ZM7.5 6.75H18V18.75C18 19.166 17.666 19.5 17.25 19.5H8.25C7.83398 19.5 7.5 19.166 7.5 18.75V6.75ZM9 9V17.25H10.5V9H9ZM12 9V17.25H13.5V9H12ZM15 9V17.25H16.5V9H15Z" fill="#00A439"/>
                                </svg>
                            </div>
                            <h3 class="vacancy-item_title">
                                {{ vacancy.name }}
                            </h3>
                            <div class="vacancy-item_city">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <path d="M4.22303 9.91151C6.52137 -0.19182 21.4897 -0.180153 23.7764 9.92318C25.118 15.8498 21.4314 20.8665 18.1997 23.9698C15.8547 26.2332 12.1447 26.2332 9.78804 23.9698C6.56804 20.8665 2.88137 15.8382 4.22303 9.91151Z" fill="#00A439"/>
                                    <path d="M13.9999 15.6628C16.0102 15.6628 17.6399 14.0331 17.6399 12.0228C17.6399 10.0125 16.0102 8.38281 13.9999 8.38281C11.9895 8.38281 10.3599 10.0125 10.3599 12.0228C10.3599 14.0331 11.9895 15.6628 13.9999 15.6628Z" fill="white"/>
                                </svg>
                                <p class="vacancy-item_city__text">
                                    {{ vacancy.city }}
                                </p>
                            </div>
                            <div class="vacancy-item_descr" v-html="vacancy.descr.substring(0,130) + '...'"></div>
                            <router-link :to="`/vacancy/${vacancy.id}/${vacancy.name}`" class="vacancy-link">
                                Детальніше
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
                                    <path d="M2.02661 12.6289L6.97636 7.67916C7.36688 7.28864 7.3639 6.65848 6.9697 6.27166L1.97337 1.36895" stroke="#470D04" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </router-link>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        <section class="advertising" id="advertising" v-if="this.$route.params.choice == 'advertising'">
            <div :class="`${this.screenWidth <= 360 ? 'container-fluid' : 'container'}`">
                <div class="advertising-cont" :style="`background: url('${this.advBgfile ? this.advBgImg : this.siteLink + this.advBgImg}')left bottom/cover no-repeat, ${this.advBgColor};`">
                    <div class="advertising-info">
                        <h2 class="advertising-title" :style="`color: ${this.advTextColor}`">
                        {{ this.advTitle }}
                        </h2>
                        <p class="advertising-text" :style="`color: ${this.advDescrColor}`" v-html="this.advDescr"></p>
                        <button class="btn advertising-btn">
                        <router-link :to="this.advLinkTo">
                            {{ this.advBtnText }} <img src="@/assets/img/arrow-right.svg" alt="Arrow">
                        </router-link>
                        </button>
                    </div>
                    <div class="advertising-img" :style="`background: url('${this.advHeadfile ? this.advHeadImg : this.siteLink + this.advHeadImg}')left bottom/cover no-repeat;`"></div>
                </div>
            </div>
        </section>
        <Transition name="fade">
            <div class="access-popApp" v-if="this.popAppAccept">
                <div class="access-popApp_block">
                    <p class="access-popApp_text">
                        Ви дійсно хочете зберегти зміни?
                    </p>
                    <div class="access-popApp_btns">
                        <button class="access-popApp_yes btn" v-if="this.popAppAccept == 'updateAdv'"  @click.prevent="updateAdv(this.advId)"><a href="#">Так</a></button>
                        <button class="access-popApp_yes btn" v-if="this.popAppAccept == 'editInsta'" @click.prevent="editInsta(this.instaId)"><a href="#">Так</a></button>
                        <button class="access-popApp_yes btn" v-if="this.popAppAccept == 'addFaq'"  @click.prevent="addFaq('', 'add')"><a href="#">Так</a></button>
                        <button class="access-popApp_yes btn" v-if="this.popAppAccept == 'addFaq1'" @click.prevent="addFaq(this.descrValue, 'change')"><a href="#">Так</a></button>
                        <button class="access-popApp_yes btn" v-if="this.popAppAccept == 'deleteFaq'" @click.prevent="deleteFaq(this.modal1)" ><a href="#">Так</a></button>
                        <button class="access-popApp_yes btn" v-if="this.popAppAccept == 'sendMail'" @click.prevent="sendMail()"><a href="#">Так</a></button>
                        <button class="access-popApp_yes btn" v-if="this.popAppAccept == 'addVac'"  @click.prevent="addVac('', 'add')"><a href="#">Так</a></button>
                        <button class="access-popApp_yes btn" v-if="this.popAppAccept == 'addVac1'" @click.prevent="addVac(this.descrValue, 'change')"><a href="#">Так</a></button>
                        <button class="access-popApp_yes btn" v-if="this.popAppAccept == 'deleteVac'" @click.prevent="deleteVac(this.modal1)"><a href="#">Так</a></button>
                        <button class="access-popApp_yes btn" v-if="this.popAppAccept == 'deleteBanner'"  @click.prevent="deleteBanner(this.modal1, this.modal2)"><a href="#">Так</a></button>
                        
                        <button class="access-popApp_no btn" @click.prevent="this.popAppAccept = false; this.modal1 = ''; this.modal2 = ''"><a href="#">Ні</a></button>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import route from '@/components/route.vue'
import admMenu from '@/views/CMS/components/menu.vue'
import orders from '@/views/CMS/components/orders.vue'
import goods from '@/views/CMS/components/goods.vue'
import catalog from '@/views/CMS/components/catalog.vue'
export default {
    components: {
        admMenu, route, orders, goods, catalog
    },
    data(){
        return{
            popAppAccept: false,
            modal1: '',
            modal2: '',
            file: '',
            allGoods: [],
            uniqGoods: [],
            allCatalog: [],
            search: '',
            mailSubject: '',
            mailDescr: '',
            mailNew: false,
            newItemList: '',
            visibleItem: false,
            visibleImg: false,
            showProcessLine: false,
            
            progress: 0,
            descr: '',
            stamp1: '',
            stamp2: '',
            stamp3: '',
            stamp4: '',
            Expiration: '',
            Expiration1: '',
            Expiration2: '',
            box1: '',
            box2: '',
            box3: '',
            box4: '',
            box5: '',
            box6: '',
            catalogCatList: [],
            routersArray: [],
            advArray: [],
            advBgImg: '',
            advBgColor: '',
            advTextColor: '',
            advTitle: '',
            advDescrColor: '',
            advDescr: '',
            advLinkTo: '',
            advBtnText: '',
            advHeadImg: '',
            advBgfile: '',
            advHeadfile: '',
            advId: '',
            advShow: '',
            questionTitle: '',
            questionDescr: '',
            siteLink: 'https://nash.enott.com.ua/api/upload/',
            faqList: [],
            descrValue: 'add',
            instaArray: [],
            istaImg: '',
            instaLink: '',
            instaId: '',
            instaImgFile: '',
            oldInsta: '',
            startButton: '',
            bannersList: [],
            openList: false,
            vacancyList: [],
            vacName: '',
            vacCity: '',
            vacDescr: '',
            tastyList: [],
            tastyId: '',
            tastyName: '',
            tastyImg: '',
            tastyLink: '',
            catImgList: [],
            catId: '',
            catTitle: '',
            catDescr: '',
            catImg: '',
            catLink: ''
        }
    },
    computed:{
        filteredGoods(){
            var array = []
            for(let i = 0; i < this.allGoods.length; i++){
                if(this.allGoods[i].name.slice(0, this.search.length).toLowerCase() == this.search.toLowerCase()){
                    array.push(this.allGoods[i])
                }
            }
            return array
        },
        // filteredCatalog(){
        //     var array = []
        //     for(let i = 0; i < this.allCatalog.length; i++){
        //         if(this.allCatalog[i].name.slice(0, this.search.length).toLowerCase() == this.search.toLowerCase()){
        //             array.push(this.allCatalog[i])
        //         }
        //     }
        //     return array
        // },
        filteredGoods2(){
            var array = []
            for(let i = 0; i < this.uniqGoods.length; i++){
                if(this.uniqGoods[i].name.slice(0, this.search.length).toLowerCase() == this.search.toLowerCase()){
                    array.push(this.uniqGoods[i])
                }
            }
            return array
        }
    },
    methods:{
        // updateCatalog(){
        //     let formData = new FormData();
        //     formData.append('file', this.file);
        //     let config = {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     }
        //     axios.post('https://nash.enott.com.ua/api/updateCatalog', formData, config
        //     ).then(function(){
        //         alert("Змінено")
        //         location.reload(true)
        //     })
        //     .catch(function(){
        //         alert("Перевірьте чи правильно заповнили всі поля");
        //     });
        // },       
        // onChangeFileUpload2(e){
        //     this.file = e.target.files[0]
        //     this.imageUrl = URL.createObjectURL(this.file);
        // },
        advBg(e){
            this.advBgfile = e.target.files[0]
            this.advBgImg = URL.createObjectURL(this.advBgfile);
        },
        advHeadChange(e){
            this.advHeadfile = e.target.files[0]
            this.advHeadImg = URL.createObjectURL(this.advHeadfile);
        },
        editInstaImg(e){
            this.instaImgFile = e.target.files[0]
            this.instaImg = URL.createObjectURL(this.instaImgFile);
        },
        changeTastyImg(e){
            this.tastyImg = e.target.files[0]
            this.tastyLink = URL.createObjectURL(this.tastyImg);
        },
        changeCatImg(e){
            this.catImg = e.target.files[0]
            this.catLink = URL.createObjectURL(this.catImg);
        },
        addBanner(){
            let formData = new FormData();
            formData.append('file', this.$refs.file.files[0]);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            axios.post('https://nash.enott.com.ua/api/addBanner', formData, config
            ).then(function(res){
                alert("Додано")
                location.reload(true)
            })
            
        },
        // openItem(bar){
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        //     this.itemBar = bar
        //     this.visibleItem = true
        //     axios.get('https://nash.enott.com.ua/api/getItem/' + bar)
        //     .then(response => {
        //         this.itemArray = response.data.Items;
        //         this.itemName = response.data.Items[0].name
        //         this.itemSubName = response.data.Items[0].subName
        //         this.itemCategory = response.data.Items[0].category
        //         this.itemSubCategory = response.data.Items[0].subCategory
        //         this.itemHumidity = response.data.Items[0].humidity
        //         if(response.data.Items[0].newItem == 'yes'){
        //             this.itemNewItem = true
        //         }else{
        //             this.itemNewItem = false
        //         }
        //         this.itemNutritionalValue1 = response.data.Items[0].nutritionalValue1
        //         this.itemNutritionalValue2 = response.data.Items[0].nutritionalValue2
        //         this.itemNutritionalValue3 = response.data.Items[0].nutritionalValue3
        //         this.itemNutritionalValue4 = response.data.Items[0].nutritionalValue4
        //         this.itemNutritionalValue5 = response.data.Items[0].nutritionalValue5
        //         this.itemNutritionalValue6 = response.data.Items[0].nutritionalValue6
        //         this.itemNutritionalValue7 = response.data.Items[0].nutritionalValue7
        //         this.itemNutritionalValue8 = response.data.Items[0].nutritionalValue8
        //         this.itemPacking = response.data.Items[0].packing
        //         this.itemPrice = response.data.Items[0].price
        //         this.itemRecipe = response.data.Items[0].recipe
        //         this.itemShortDescr = response.data.Items[0].shortDescr
        //         this.itemStoreRoles_descr = response.data.Items[0].storeRoles_descr
        //         this.itemTemperature = response.data.Items[0].temperature
        //         if(response.data.Items[0].vegan == 'yes'){
        //             this.itemVegan = true
        //         }else{
        //             this.itemVegan = false
        //         }
        //         if(response.data.Items[0].pop){
        //             this.itemFav = true
        //         }else{
        //             this.itemFav = false
        //         }
        //         this.itemWeight = response.data.Items[0].weight
        //         this.itemExpiration = response.data.Items[0].еxpiration
        //         this.itemExisting = response.data.Items[0].existing
        //         if(response.data.Items[0].stamps1 != 0){
        //             this.stamps1 = true
        //         }
        //         this.stamps2 = response.data.Items[0].stamps2
        //         this.mainImage = response.data.mainImg;
        //         this.subCatList = response.data.adminSubCategories
        //     })
        // },
        openCatalog(bar){
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.itemBar = bar
            this.visibleItem = true
            axios.get('https://nash.enott.com.ua/api/getCatalog/' + bar)
            .then(response => {
                this.itemArray = response.data.Items;
                this.itemName = response.data.Items[0].name
                this.descr = response.data.Items[0].descr
                if(response.data.Items[0].stamp1 == 'yes'){
                    this.stamp1 = true
                }
                if(response.data.Items[0].stamp2 == 'yes'){
                    this.stamp2 = true
                }
                if(response.data.Items[0].stamp3 == 'yes'){
                    this.stamp3 = true
                }
                if(response.data.Items[0].stamp4 == 'yes'){
                    this.stamp4 = true
                }
                this.Expiration = response.data.Items[0].Expiration
                this.Expiration1 = response.data.Items[0].Expiration1
                this.Expiration2 = response.data.Items[0].Expiration2
                this.box1 = response.data.Items[0].box1
                this.box2 = response.data.Items[0].box2
                this.box3 = response.data.Items[0].box3
                this.box4 = response.data.Items[0].box4
                this.box5 = response.data.Items[0].box5
                this.box6 = response.data.Items[0].box6
                this.mainImage = response.data.mainImg;
            })
        },
        // updateItem(){
        //     let formData = new FormData();
        //     formData.append('bar', this.itemBar);
        //     formData.append('name', this.itemName);
        //     formData.append('subName', this.itemSubName);
        //     formData.append('category', this.itemCategory);
        //     formData.append('subCategory', this.itemSubCategory);
        //     formData.append('humidity', this.itemHumidity);
        //     if(this.itemNewItem){
        //         formData.append('newItem', 'yes'); 
        //     }else{
        //         formData.append('newItem', '');
        //     }
        //     formData.append('nutritionalValue1', this.itemNutritionalValue1);
        //     formData.append('nutritionalValue2', this.itemNutritionalValue2);
        //     formData.append('nutritionalValue3', this.itemNutritionalValue3);
        //     formData.append('nutritionalValue4', this.itemNutritionalValue4);
        //     formData.append('nutritionalValue5', this.itemNutritionalValue5);
        //     formData.append('nutritionalValue6', this.itemNutritionalValue6);
        //     formData.append('nutritionalValue7', this.itemNutritionalValue7);
        //     formData.append('nutritionalValue8', this.itemNutritionalValue8);
        //     formData.append('packing', this.itemPacking);
        //     formData.append('price', this.itemPrice);
        //     formData.append('recipe', this.itemRecipe);
        //     formData.append('shortDescr', this.itemShortDescr);
        //     formData.append('storeRoles_descr', this.itemStoreRoles_descr);
        //     formData.append('temperature', this.itemTemperature);
        //     if(this.itemVegan){
        //         formData.append('vegan', 'yes'); 
        //     }else{
        //         formData.append('vegan', '');
        //     }
        //     formData.append('weight', this.itemWeight);
        //     formData.append('expiration', this.itemExpiration);
        //     if(this.file){
        //         formData.append('file', this.file);
        //         formData.append('oldFile', this.mainImage);
        //     }
        //     if(this.stamps1){
        //         formData.append('stamps1', 1);
        //     }else{
        //         formData.append('stamps1', 0);
        //     }
        //     formData.append('existing', this.itemExisting);
        //     formData.append('stamps2', this.stamps2);
        //     formData.append('itemName', this.itemName);
        //     if(this.itemFav){
        //         formData.append('pop', 'yes');
        //     }else{
        //         formData.append('pop', '');
        //     }
        //     let config = {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     }
        //     axios.post('https://nash.enott.com.ua/api/updateItem', formData, config
        //     ).then(function(response){
        //         alert("Змінено")
        //         location.reload(true)
        //     })
        //     .catch(function(){
        //         alert("Перевірьте чи правильно заповнили всі поля");
        //     });
        // },
        // updateCatalog(){
        //     let formData = new FormData();
        //     formData.append('bar', this.itemBar);
        //     formData.append('name', this.itemName);
        //     formData.append('category', this.itemCategory);
        //     formData.append('subCategory', this.itemSubCategory);
        //     formData.append('descr', this.descr);
        //     if(this.stamp1){
        //         formData.append('stamp1', 'yes'); 
        //     }else{
        //         formData.append('stamp1', '');
        //     }
        //     if(this.stamp2){
        //         formData.append('stamp2', 'yes'); 
        //     }else{
        //         formData.append('stamp2', '');
        //     }
        //     if(this.stamp3){
        //         formData.append('stamp3', 'yes'); 
        //     }else{
        //         formData.append('stamp3', '');
        //     }
        //     if(this.stamp4){
        //         formData.append('stamp4', 'yes'); 
        //     }else{
        //         formData.append('stamp4', '');
        //     }
        //     formData.append('Expiration', this.Expiration);
        //     formData.append('Expiration1', this.Expiration1);
        //     formData.append('Expiration2', this.Expiration2);
        //     formData.append('box1', this.box1);
        //     formData.append('box2', this.box2);
        //     formData.append('box3', this.box3);
        //     formData.append('box4', this.box4);
        //     formData.append('box5', this.box5);
        //     formData.append('box6', this.box6);
        //     if(this.file){
        //         formData.append('file', this.file);
        //         formData.append('oldFile', this.mainImage);
        //     }
        //     let config = {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     }
        //     axios.post('https://nash.enott.com.ua/api/updateCatItem', formData, config
        //     ).then(function(){
        //         alert("Змінено")
        //         location.reload(true)
        //     })
        //     .catch(function(){
        //         alert("Перевірьте чи правильно заповнили всі поля");
        //     });
        // },
        // getPhotos(name){
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        //     this.visibleImg = name
        //     let config = {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     }
        //     axios.get('https://nash.enott.com.ua/api/getPhotoArray/' + name, config)
        //     .then(response => {
        //         this.imageLinks = response.data
        //     })
        // },
        // massUpload(e){
        //     for (var i = 0; i < e.target.files.length; i++ ){
        //         let file = e.target.files[i];
        //         var links = URL.createObjectURL(file);
        //         if(this.imageLinks){
        //             var newId = Number(this.imageLinks.length) + 1
        //         }else{
        //             var newId = 1
        //         }
        //         this.imageList.push({"id": newId, "file": file})
        //         if(!this.imageLinks){
        //             this.imageLinks = []
        //         }
        //         this.imageLinks.push({"id": newId, "file": links})
        //     }
        // },
        // async uploadImg(){
        //     this.showProcessLine = true
        //     let formData = new FormData();
        //     let config = {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     }
        //     var loadStep = 100 / this.imageList.length
        //     this.progress = 0
        //     for(let i = 0; i < this.imageList.length; i++){
        //         var oneFile = this.imageList[i].file
        //         formData.append('itemName', this.visibleImg);
        //         formData.append('file', oneFile);
        //         await axios.post('https://nash.enott.com.ua/api/updatePhotos', formData, config)
        //         .then(response => {

        //         })
        //         .catch(function(){
        //             alert("Перевірьте чи правильно заповнили всі поля");
        //         });
        //         this.progress = this.progress + loadStep
        //     }
        //     this.showProcessLine = false
        //     alert("Done")
        // },
        // deleteImg(id, name){
        //     let formData = new FormData();
        //     let config = {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     }
        //     formData.append('itemName', this.visibleImg);
        //     formData.append('fileName', name);
        //     axios.post('https://nash.enott.com.ua/api/deletePhoto', formData, config)
        //     .then(response => {

        //     })
        //     .catch(function(){
        //         alert("Перевірьте чи правильно заповнили всі поля");
        //     });
        //     this.imageLinks = this.imageLinks.filter(function(item) {
        //         return item.id !== id
        //     })
        //     this.imageList = this.imageList.filter(function(item) {
        //         return item.id !== id
        //     })
        // },
        deleteBanner(id, name){
            let formData = new FormData();
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            formData.append('fileId', id);
            formData.append('fileName', name);
            axios.post('https://nash.enott.com.ua/api/deleteBanner', formData, config)
            .then(response => {
                axios.get('https://nash.enott.com.ua/api/getBanners')
                .then(response => {
                    this.bannersList = response.data;
                })
            })
            .catch(function(){
                alert("Перевірьте чи правильно заповнили всі поля");
            });
        },
        updateAdv(id){
            let formData = new FormData();
            formData.append('id', id);
            formData.append('title', this.advTitle);
            formData.append('textColor', this.advTextColor);
            formData.append('descr', this.advDescr);
            formData.append('descrColor', this.advDescrColor);
            formData.append('bgColor', this.advBgColor);
            formData.append('btnText', this.advBtnText);
            formData.append('linkTo', this.advLinkTo);
            formData.append('advShow', this.advShow);
            if(this.advBgfile){
                formData.append('bgImg', this.advBgfile);
            }else{
                formData.append('bgImgName', this.advBgImg);
            }
            if(this.advHeadfile){
                formData.append('headImg', this.advHeadfile);
            }else{
                formData.append('headImgName', this.advHeadImg);
            }
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            axios.post('https://nash.enott.com.ua/api/updateAdv', formData, config
            ).then(function(){
                alert("Змінено")
                location.reload(true)
            })
            .catch(function(){
                alert("Перевірьте чи правильно заповнили всі поля");
            });
        },
        addFaq(id, val){
            let formData = new FormData();
            formData.append('title', this.questionTitle);
            formData.append('descr', this.questionDescr);
            formData.append('id', id);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            if(val == 'add'){
                axios.post('https://nash.enott.com.ua/api/addFaq', formData, config
                ).then(function(){
                    alert("Додано")
                    location.reload(true)
                })
                .catch(function(){
                    alert("Перевірьте чи правильно заповнили всі поля");
                });
            }else{
                axios.post('https://nash.enott.com.ua/api/changeFaq', formData, config
                ).then(function(){
                    alert("Змінено")
                    location.reload(true)
                })
                .catch(function(){
                    alert("Перевірьте чи правильно заповнили всі поля");
                });
            }
            
        },
        editFaq(id){
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.descrValue = id
            for(let i = 0; i < this.faqList.length; i++){
                if(this.faqList[i].id == id){
                    this.questionTitle = this.faqList[i].title
                    this.questionDescr = this.faqList[i].descr
                }
            }
        },
        deleteFaq(id){
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            let formData = new FormData();
            formData.append('id', id);
            axios.post('https://nash.enott.com.ua/api/deleteFaq', formData, config
            ).then(function(){
                alert("Видалено")
                location.reload(true)
            })
            .catch(function(){
                alert("Перевірьте чи правильно заповнили всі поля");
            });
        },
        editInsta(id, val, img, link){
            this.instaId = id
            if(val == 'write'){
                this.instaImg = img
                this.instaLink = link
                this.oldInsta = img
            }else{
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                let formData = new FormData();
                formData.append('file', this.instaImgFile);
                formData.append('link', this.instaLink);
                formData.append('old', this.oldInsta);
                formData.append('id', id);
                axios.post('https://nash.enott.com.ua/api/changeInsta', formData, config
                ).then(function(){
                    alert("Змінено")
                    location.reload(true)
                })
                .catch(function(){
                    alert("Перевірьте чи правильно заповнили всі поля");
                });
            }
        },
        sendMail(){
            let formData = new FormData();
            formData.append('subject', this.mailSubject);
            formData.append('descr', this.mailDescr);
            formData.append('addNews', this.mailNew);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            axios.post('https://nash.enott.com.ua/api/sendAdv', formData, config
            ).then(function(){
                alert("Відправлено")
            })
            .catch(function(){
                alert("Перевірьте чи правильно заповнили всі поля");
            });
        },
        addVac(id, val){
            let formData = new FormData();
            formData.append('name', this.vacName);
            formData.append('city', this.vacCity);
            formData.append('descr', this.vacDescr);
            formData.append('id', id);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            if(val == 'add'){
                axios.post('https://nash.enott.com.ua/api/addVac', formData, config
                ).then(function(){
                    alert("Додано")
                    location.reload(true)
                })
                .catch(function(){
                    alert("Перевірьте чи правильно заповнили всі поля");
                });
            }else{
                axios.post('https://nash.enott.com.ua/api/changeVac', formData, config
                ).then(function(){
                    alert("Змінено")
                    location.reload(true)
                })
                .catch(function(){
                    alert("Перевірьте чи правильно заповнили всі поля");
                });
            }
            
        },
        editVac(id){
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.descrValue = id
            for(let i = 0; i < this.vacancyList.length; i++){
                if(this.vacancyList[i].id == id){
                    this.vacName = this.vacancyList[i].name
                    this.vacCity = this.vacancyList[i].city
                    this.vacDescr = this.vacancyList[i].descr
                }
            }
        },
        deleteVac(id){
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            let formData = new FormData();
            formData.append('id', id);
            axios.post('https://nash.enott.com.ua/api/deleteVac', formData, config
            ).then(function(){
                alert("Видалено")
                location.reload(true)
            })
            .catch(function(){
                alert("Перевірьте чи правильно заповнили всі поля");
            });
        },
        // changeTasty(oldImg, oldName){
        //     window.scrollTo({ top: 0, behavior: 'smooth' });
        //     let formData = new FormData();
        //     formData.append('name', this.tastyName);
        //     formData.append('oldName', oldName);
        //     formData.append('newPhoto', this.tastyImg);
        //     formData.append('id', this.tastyId);
        //     formData.append('deleteImg', oldImg);
        //     let config = {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     }
        //     axios.post('https://nash.enott.com.ua/api/changeTasty', formData, config
        //     ).then(function(){
        //         alert("Змінено")
        //         location.reload(true)
        //     })
        //     .catch(function(){
        //         alert("Перевірьте чи правильно заповнили всі поля");
        //     });
        // },
        changeCat(oldImg, oldName){
            let formData = new FormData();
            formData.append('title', this.catTitle);
            formData.append('descr', this.catDescr);
            formData.append('oldName', oldName);
            formData.append('newPhoto', this.catImg);
            formData.append('id', this.catId);
            formData.append('deleteImg', oldImg);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            axios.post('https://nash.enott.com.ua/api/changeCatImg', formData, config
            ).then(function(){
                alert("Змінено")
                location.reload(true)
            })
            .catch(function(){
                alert("Перевірьте чи правильно заповнили всі поля");
            });
        }
    },
    watch: {
        $route(to, from) {
            this.visibleItem = false
            this.itemArray = []
            this.search = ''
            this.descrValue = 'add'
        }
    },
    mounted(){
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.get('https://nash.enott.com.ua/api/getAllGoods', config)
        .then(response => {
            this.allGoods = response.data.allGoods
            this.uniqGoods = response.data.uniqGoods
        })
        axios.get('https://nash.enott.com.ua/api/getAllCatalog', config)
        .then(response => {
            this.allCatalog = response.data.allGoods
        })
        this.$store.dispatch('setLoader', false);
        axios.get('https://nash.enott.com.ua/api/getAdv', config)
        .then(response => {
            this.advArray = response.data.adv
            this.advId = response.data.adv[0].id
            this.advBgImg = response.data.adv[0].bgImg
            this.advBgColor = response.data.adv[0].bgColor
            this.advTextColor = response.data.adv[0].textColor
            this.advTitle = response.data.adv[0].title
            this.advDescrColor = response.data.adv[0].descrColor
            this.advDescr = response.data.adv[0].descr
            this.advLinkTo = response.data.adv[0].linkTo
            this.advBtnText = response.data.adv[0].btnText
            this.advHeadImg = response.data.adv[0].headImg
            this.advShow = response.data.adv[0].advShow
        })
        axios.get('https://nash.enott.com.ua/api/getFaq')
        .then(response => {
            this.faqList = response.data;
        })
        axios.get('https://nash.enott.com.ua/api/getInsta')
        .then(response => {
            this.instaArray = response.data;
        })
        axios.get('https://nash.enott.com.ua/api/getBanners')
        .then(response => {
            this.bannersList = response.data;
        })
        this.$router.options.routes.forEach(route => {
            this.routersArray.push({
                name: route.name,
                path: route.path,
                title: route.meta
            })
        })
        axios.get('https://nash.enott.com.ua/api/goodsNames/Новинки')
        .then(response => {
            this.newItemList = response.data;
        })
        axios.get('https://nash.enott.com.ua/api/getVacancy')
        .then(response => {
            this.vacancyList = response.data.vacancy;
        })
        axios.get('https://nash.enott.com.ua/api/getTasty')
        .then(response => {
            this.tastyList = response.data;
        })
        axios.get('https://nash.enott.com.ua/api/catalogNames')
        .then(response => {
            this.catImgList = response.data.infoList;
        })
    }
}
</script>

<style scoped>
    .advertising-img{
        height: 471px;
    }
    .faq-item{
        cursor: auto;
    }
    .insta{
        background: none;
    }
    .insta-carusel{
        display: flex;
        justify-content: space-between;
    }
    .insta-slide{
        position: relative;
    }
    .insta-slide img{
        width: 288px;
        height: 288px;
    }
    .insta-slide button{
        width: 15px;
        position: absolute;
        top: 15px;
        right: 15px;
        z-index: 1;
        cursor: pointer;
        transition: all 0.5s ease;
    }
    .insta-slide button:hover{
        transform: scale(1.5);
    }
</style>