<template>
  <div>
    <form class="adminPage-form" v-if="this.routeVal == 'goodsUpdate'">
        <h2 class="adminPage-title">
            Онлайн крамниця
        </h2>
        <p class="adminPage-subtitle">
            Оновити весь товар
        </p>
        <div class="file-drop-area">
            <span v-if="!this.file.name" class="fake-btn">Завантажити файл</span>
            <span v-if="this.file.name" class="file-msg" v-html="this.file.name"></span>
            <input class="file-input" type="file" ref="file" @change="onChangeFileUpload()">
        </div>
        <button class="adminPage-btn" @click.prevent="this.popAppAccept = 'updateGoods'">Оновити</button>
    </form>
    <form class="adminPage-form" v-if="this.routeVal == 'goodsItemUpdate'">
        <h2 class="adminPage-title">
            Онлайн крамниця
        </h2>
        <p class="adminPage-subtitle">
            Редагувати товар
        </p>
        <label class="adminPage-search" for="itemSearch" v-if="!this.visibleItem">
            <input type="text" id="itemSearch" class="file-drop-area" v-model="this.search" placeholder="Знайти товар">
        </label>
        <ul class="goods-list adminGoods-list" v-if="!this.itemArray.length">
            <li class="goods-item" v-for="item in filteredGoods" :key="item.bar">
                <button class="adminGoods-item_edit" @click.prevent="openItem(item.bar)">
                    <img src="@/assets/img/edit.png" alt="Edit">
                </button>
                <div class="goods-img">
                    <div :style="`background:url('https://nash.enott.com.ua/api/upload/${item.imgItem}')center center/100% no-repeat;width:100%;height:100%`"></div>
                </div>
                <p>
                    {{ item.subCategory }}
                </p>
                <h3 class="goods-name">
                    {{ item.name }}
                </h3>
                <div class="goods-bottom">
                    <p class="goods-weight">
                        {{ item.weight }}г
                    </p>
                    <p class="goods-price">
                        {{ item.price }} грн
                    </p>
                </div>
            </li>
        </ul>
        <button v-if="this.visibleItem" @click.prevent="this.visibleItem = false; this.itemArray = []; this.search = ''" style="color: #00A439;cursor: pointer; display:flex; align-items:center;margin: 20px 0;"><img src="@/assets/img/arrow-right.svg" alt="" style="transform: rotate(180deg);"> Повернутись</button>
        <div class="adminPage-item" v-for="goods in this.itemArray" :key="goods.bar">
            <div>
                <div v-if="this.imageUrl" class="adminPage-item_mainImage" :style="`background:url('${this.imageUrl}')center center/100% no-repeat`"></div>
                <div v-if="!this.imageUrl" class="adminPage-item_mainImage" :style="`background:url('https://nash.enott.com.ua/api/upload/${this.mainImage}')center center/100% no-repeat`"></div>
                <div class="file-drop-area" style="width: 90%;">
                    <span v-if="!this.file.name" class="fake-btn">Завантажити нове фото</span>
                    <span v-if="this.file.name" class="file-msg" v-html="this.file.name"></span>
                    <input class="file-input" type="file" ref="file" @change="onChangeFileUpload2($event)">
                </div>
                <button class="adminPage-btn" v-if="this.visibleItem" @click.prevent="this.popAppAccept = 'updateItem'">
                    Зберегти
                </button>
            </div>
            <div class="adminPage-item_info">
                <label for="text1">
                    Назва
                    <input id="text1" type="text" v-model="this.itemName">
                </label>
                <label for="text111">
                    Під назва
                    <input id="text111" type="text" v-model="this.itemSubName">
                </label>
                <label for="text23" class="adminPage-select">
                    Категорія
                    <div class="adminPage-mainSelect">
                        <p @click="openLists('cat')" class="adminPage-mainSelect_visibleText">
                            {{ this.itemCategory }}
                            <svg :style="`${this.openList == 'cat' ? 'transform: rotate(0deg);' : 'transform: rotate(180deg);'} margin-left: auto;`" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none" >
                                <path d="M1 6.5L5.11616 1.90683C5.60227 1.36439 6.39773 1.36439 6.88384 1.90683L11 6.5" stroke="#00A439" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </p>
                        <ul v-if="this.openList == 'cat'" class="adminPage-hiddenList">
                            <li v-if="this.itemCategory != 'Без начинки'" @click="this.itemCategory = 'Без начинки'; this.openList = false">
                                Без начинки
                            </li>
                            <li v-if="this.itemCategory != 'З начинкою'" @click="this.itemCategory = 'З начинкою'; this.openList = false">
                                З начинкою
                            </li>
                            <li v-if="this.itemCategory != 'У глазурі'" @click="this.itemCategory = 'У глазурі'; this.openList = false">
                                У глазурі
                            </li>
                            <li v-if="this.itemCategory != 'Бісквіти'" @click="this.itemCategory = 'Бісквіти'; this.openList = false">
                                Бісквіти
                            </li>
                            <li v-if="this.itemCategory != 'Набори'" @click="this.itemCategory = 'Набори'; this.openList = false">
                                Набори
                            </li>
                            <li v-if="this.itemCategory != 'До посту'" @click="this.itemCategory = 'До посту'; this.openList = false">
                                До посту
                            </li>
                        </ul>
                    </div>
                </label>
                <label for="text23" class="adminPage-select">
                    Смак
                    <div class="adminPage-mainSelect">
                        <p @click="openLists('subCat')" class="adminPage-mainSelect_visibleText">
                            {{ this.itemSubCategory }}
                            <svg :style="`${this.openList == 'subCat' ? 'transform: rotate(0deg);' : 'transform: rotate(180deg);'} margin-left: auto;`" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none" >
                                <path d="M1 6.5L5.11616 1.90683C5.60227 1.36439 6.39773 1.36439 6.88384 1.90683L11 6.5" stroke="#00A439" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </p>
                        <ul v-if="this.openList == 'subCat'" class="adminPage-hiddenList">
                            <li v-for="subCat in this.subCatList" :key="subCat.bar" @click="this.itemSubCategory = subCat.subCategory; this.openList = false">
                                {{ subCat.subCategory }}
                            </li>
                        </ul>
                    </div>
                </label>
                <div class="adminPage-switch">
                    <label for="text222" class="adminPage-select" style="width:25%;">
                        Новий товар
                        <label class="switch">
                            <input type="checkbox" v-model="this.itemNewItem">
                            <span class="slider round"></span>
                        </label>
                    </label>
                    <label for="text20" class="adminPage-select" style="width:25%;">
                        Вегатеріанське
                        <label class="switch">
                            <input type="checkbox" v-model="this.itemVegan">
                            <span class="slider round"></span>
                        </label>
                    </label>
                    <label for="text202" class="adminPage-select" style="width:25%;">
                        Бестселлер
                        <label class="switch">
                            <input type="checkbox" v-model="this.stamps1">
                            <span class="slider round"></span>
                        </label>
                    </label>
                    <label for="text202" class="adminPage-select" style="width:25%;">
                        Улюблене
                        <label class="switch">
                            <input type="checkbox" v-model="this.itemFav">
                            <span class="slider round"></span>
                        </label>
                    </label>
                </div>
                <div class="adminPage-switch">
                    <label for="text15" class="adminPage-select"  style="width:18%;">
                        Ціна
                        <input id="text15" type="text" v-model="this.itemPrice">
                    </label>
                    <label for="text24" class="adminPage-select"  style="width:18%;">
                        Знижка %
                        <input id="text24" type="text" v-model="this.stamps2">
                    </label>
                    <label for="text21" class="adminPage-select"  style="width:18%;">
                        Вага
                        <input id="text21" type="text" v-model="this.itemWeight">
                    </label>
                    <label for="text21" class="adminPage-select"  style="width:41%;">
                        Наявність
                        <input id="text21" type="text" v-model="this.itemExisting">
                    </label>
                </div>
                <label for="text14" class="adminPage-select">
                    Пакування
                    <div class="adminPage-mainSelect">
                        <p @click="this.openLists('box')" class="adminPage-mainSelect_visibleText">
                            {{ this.itemPacking }}
                            <svg :style="`${this.openList == 'box' ? 'transform: rotate(0deg);' : 'transform: rotate(180deg);'} margin-left: auto;`" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none" >
                                <path d="M1 6.5L5.11616 1.90683C5.60227 1.36439 6.39773 1.36439 6.88384 1.90683L11 6.5" stroke="#00A439" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </p>
                        <ul v-if="this.openList == 'box'" class="adminPage-hiddenList">
                            <li v-if="this.itemPacking != 'гофрокоробка з віконичком'" @click="this.itemPacking = 'гофрокоробка з віконичком'; this.openList = false">
                                гофрокоробка з віконичком
                            </li>
                            <li v-if="this.itemPacking != 'гофрокоробка лоток'" @click="this.itemPacking = 'гофрокоробка лоток'; this.openList = false">
                                гофрокоробка лоток
                            </li>
                            <li v-if="this.itemPacking != 'картонна коробка'" @click="this.itemPacking = 'картонна коробка'; this.openList = false">
                                картонна коробка
                            </li>
                            <li v-if="this.itemPacking != 'флекс (мягка упаковка)'" @click="this.itemPacking = 'флекс (мягка упаковка)'; this.openList = false">
                                флекс (мягка упаковка)
                            </li>
                        </ul>
                    </div>
                </label>
                <label for="text17" class="adminPage-item_info__textarea">
                    Опис
                    <QuillEditor ref="quilEditor" :toolbar="false" class="contacts-textarea" v-model:content="this.itemShortDescr" v-if="this.itemShortDescr" contentType="html"/>
                </label>
                <div class="adminPage-switch">
                    <h4>
                        Умови зберігання
                    </h4>
                    <label for="text22" class="adminPage-select adminPage-select_long">
                        Термін Придатності
                        <input id="text22" type="text" v-model="this.itemExpiration">
                    </label>
                    <label for="text4" class="adminPage-select adminPage-select_short">
                        Вологість
                        <input id="text4" type="text" v-model="this.itemHumidity">
                    </label>
                    <label for="text19" class="adminPage-select adminPage-select_short">
                        УЗ_t
                        <input id="text19" type="text" v-model="this.itemTemperature">
                    </label>
                </div>
                <label for="text18" class="adminPage-item_info__textarea">
                    УЗ_опис
                    <input id="text19" type="text" v-model="this.itemStoreRoles_descr">
                </label>
                <label for="text16" class="adminPage-item_info__textarea adminPage-item_info__long">
                    Склад
                    <QuillEditor ref="quilEditor" :toolbar="false" class="contacts-textarea" v-model:content="this.itemRecipe" v-if="this.itemRecipe" contentType="html"/>
                </label>
                <div class="adminPage-switch">
                    <h4>
                        Харчова цінність
                    </h4>
                </div>
                <label for="text6" class="adminPage-label_descr">
                    <p>Калорійність</p>
                    <input id="text6" type="text" v-model="this.itemNutritionalValue1">
                </label>
                <label for="text7" class="adminPage-label_descr">
                    <p>Енергетична цінність</p>
                    <input id="text7" type="text" v-model="this.itemNutritionalValue2">
                </label>
                <label for="text8" class="adminPage-label_descr">
                    <p>Жирів</p>
                    <input id="text8" type="text" v-model="this.itemNutritionalValue3">
                </label>
                <label for="text9" class="adminPage-label_descr">
                    <p>З яких насичених</p>
                    <input id="text9" type="text" v-model="this.itemNutritionalValue4">
                </label>
                <label for="text10" class="adminPage-label_descr">
                    <p>Вуглеводів</p>
                    <input id="text10" type="text" v-model="this.itemNutritionalValue5">
                </label>
                <label for="text11" class="adminPage-label_descr">
                    <p>З яких цукрів</p>
                    <input id="text11" type="text" v-model="this.itemNutritionalValue6">
                </label>
                <label for="text12" class="adminPage-label_descr">
                    <p>Білків</p>
                    <input id="text12" type="text" v-model="this.itemNutritionalValue7">
                </label>
                <label for="text13" class="adminPage-label_descr">
                    <p>Сіль</p>
                    <input id="text13" type="text" v-model="this.itemNutritionalValue8">
                </label>
            </div>
        </div>
    </form>
    <form class="adminPage-form" v-if="this.routeVal == 'goodsAddPhoto'">
        <h2 class="adminPage-title">
            Онлайн крамниця
        </h2>
        <p class="adminPage-subtitle">
            Додати фото
        </p>
        <label class="adminPage-search" for="itemSearch" v-if="!this.visibleImg">
            Пошук товару
            <input type="text" id="itemSearch" class="file-drop-area" v-model="this.search">
        </label>
        <ul class="goods-list adminGoods-list" v-if="!this.visibleImg">
            <li class="goods-item" v-for="(item, index) in filteredGoods2" :key="index">
                <button class="adminGoods-item_edit" @click.prevent="getPhotos(item.name)">
                    <img src="@/assets/img/edit.png" alt="Edit">
                </button>
                <div class="goods-img">
                    <div :style="`background:url('https://nash.enott.com.ua/api/upload/${item.img}')center center/100% no-repeat;width:100%;height:100%`"></div>
                </div>
                <h3 class="goods-name">
                    {{ item.name }}
                </h3>
            </li>
        </ul>
        <div v-if="this.showProcessLine" :style="`background: rgb(0, 164, 57);width: ${this.progress}%;height:10px;`"></div>
        <div class="photosList">
            <button v-if="this.visibleImg" @click.prevent="this.visibleImg = false; this.imageLinks = []; this.search = ''" style="color: #00A439;cursor: pointer; display:flex; align-items:center;margin: 20px 0;"><img src="@/assets/img/arrow-right.svg" alt="" style="transform: rotate(180deg);"> Повернутись</button>
            <h4 style="width:100%;font-size: 24px;color:#470D04;margin-top:-20px;font-weight:500;" class="photosList-name" v-if="this.visibleImg">
                {{ this.visibleImg }}
            </h4>
            <div class="file-drop-area fake-mass_btn" v-if="this.visibleImg">
                <div style="text-align: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M41.4993 1.67578C41.4993 0.847354 40.8277 0.175781 39.9993 0.175781C39.1709 0.175781 38.4993 0.847354 38.4993 1.67578V38.496H1.67529C0.846866 38.496 0.175293 39.1676 0.175293 39.996C0.175293 40.8244 0.846866 41.496 1.67529 41.496H38.4993V78.325C38.4993 79.1534 39.1709 79.825 39.9993 79.825C40.8277 79.825 41.4993 79.1534 41.4993 78.325V41.496H78.3245C79.1529 41.496 79.8245 40.8244 79.8245 39.996C79.8245 39.1676 79.1529 38.496 78.3245 38.496H41.4993V1.67578Z" fill="#00A439"/>
                    </svg>
                    <p style="color:#00A439;">
                        Додати фото
                    </p>
                </div>
                <span class="file-msg" v-html="this.file.name"></span>
                <input class="file-input" type="file" ref="file" multiple="multiple" v-if="this.visibleImg" @change="massUpload($event)">
            </div>
            <div v-for="img in this.imageLinks" :key="img.id" class="photosList-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" class="photosList-delete" @click.prevent="this.popAppAccept = 'deleteImg'; this.modal1 = img.id; this.modal2 = img.name">
                    <path d="M17 1L1 17M1 1L17 17" stroke="#470D04" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <img :src="img.file" :alt="img.file">
            </div>
        </div>
        <button class="adminPage-btn" style="margin-top:40px;" @click.prevent="this.popAppAccept = 'uploadImg'" v-if="this.visibleImg">Зберегти</button>
    </form>
    <form class="adminPage-form" v-if="this.routeVal == 'tasty'">
        <h2 class="adminPage-title">
            Онлайн крамниця
        </h2>
        <p class="adminPage-subtitle">
            Редагувати смаки
        </p>
        <div class="item-tasty" style="display: flex;border-bottom: 1px solid #FFF7ED;border-top: 1px solid #FFF7ED;padding: 15px 0;width:100%;" v-for="tasty in this.tastyList" :key="tasty.id">
            <p v-if="this.tastyId != tasty.id" style="width: 400px;color: #470D04;">
                {{ tasty.name }}
            </p>
            <li v-if="this.tastyId != tasty.id" style="width:64px;height:64px;margin:0;">
                <a href="#" class="tasty-link" style="cursor:auto;">
                    <img :src="`https://nash.enott.com.ua/api/upload/${tasty.image}`" alt="" class="tasty-img">
                </a>
            </li>
            <button v-if="this.tastyId != tasty.id" class="tasty-btn" @click.prevent="this.tastyId = tasty.id; this.tastyName = tasty.name; this.tastyLink = 'https://nash.enott.com.ua/api/upload/' + tasty.image">
                Змінити
            </button>
            <label v-if="this.tastyId == tasty.id" for="tasty" class="adminPage-select" style="margin-right:12px;width:400px;">
                Назва
                <input id="tasty" type="text" v-model="this.tastyName">
            </label>
            <li v-if="this.tastyId == tasty.id" style="width:64px;height:64px;margin:0;">
                <a href="#" class="tasty-link">
                    <img :src="this.tastyLink" alt="" class="tasty-img">
                </a>
            </li>
            <div v-if="this.tastyId == tasty.id" class="file-drop-area" style="width: auto;padding:10px;margin-left:12px;">
                <span class="fake-btn">Завантажити нове фото</span>
                <input class="file adminPage-item_changeImg file-input" type="file" ref="file" @change="changeTastyImg($event)" >
            </div>
            <button v-if="this.tastyId == tasty.id" class="tasty-btn tasty-btn_yes" @click.prevent="this.popAppAccept = 'changeTasty'; this.modal1 = tasty.image; this.modal2 = tasty.name" >
                Зберегти
            </button>
            <button v-if="this.tastyId == tasty.id" class="tasty-btn tasty-btn_no" @click.prevent="this.tastyId = ''; this.tastyName = ''">
                Відмінити
            </button>
        </div>
    </form>
    
    <Transition name="fade">
        <div class="access-popApp" v-if="this.popAppAccept">
            <div class="access-popApp_block">
                <p class="access-popApp_text" v-if="this.popAppAccept != 'Done'">
                    Ви дійсно хочете зберегти зміни?
                </p>
                <p class="access-popApp_text" v-if="this.popAppAccept == 'Done'">
                    Готово
                </p>
                <div class="access-popApp_btns">
                    <button class="access-popApp_yes btn" v-if="this.popAppAccept == 'updateGoods'" @click.prevent="updateGoods()"><a href="#">Так</a></button>
                    <button class="access-popApp_yes btn" v-if="this.popAppAccept == 'updateItem'" @click.prevent="updateItem()"><a href="#">Так</a></button>
                    <button class="access-popApp_yes btn" v-if="this.popAppAccept == 'uploadImg'" @click.prevent="uploadImg()"><a href="#">Так</a></button>
                    <button class="access-popApp_yes btn" v-if="this.popAppAccept == 'deleteImg'" @click.prevent="deleteImg(this.modal1, this.modal2)"><a href="#">Так</a></button>
                    <button class="access-popApp_yes btn" v-if="this.popAppAccept == 'changeTasty'" @click.prevent="changeTasty(this.modal1, this.modal2)"><a href="#">Так</a></button>
                        <button class="access-popApp_no btn" v-if="this.popAppAccept != 'Done'" @click.prevent="this.popAppAccept = false; this.modal1 = ''; this.modal2 = ''"><a href="#">Ні</a></button>
                        <button class="access-popApp_yes btn" v-if="this.popAppAccept == 'Done'"  @click.prevent="reloadPage()"><a href="#">Ok</a></button>
                </div>
            </div>
        </div>
    </Transition>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    props:['routeVal'],
    data(){
        return{
            popAppAccept: false,
            modal1: '',
            modal2: '',
            file: '',
            allGoods: [],
            visibleItem: false,
            search: '',
            itemArray: [],
            progress: '',
            mainImage: '',
            itemBar: '',
            itemName: '',
            itemSubName: '',
            itemCategory: '',
            itemSubCategory: '',
            itemHumidity: '',
            itemNewItem: '',
            itemNutritionalValue1: '',
            itemNutritionalValue2: '',
            itemNutritionalValue3: '',
            itemNutritionalValue4: '',
            itemNutritionalValue5: '',
            itemNutritionalValue6: '',
            itemNutritionalValue7: '',
            itemNutritionalValue8: '',
            stamps1: false,
            stamps2: false,
            itemPacking: '',
            itemPrice: '',
            itemRecipe: '',
            itemShortDescr: '',
            itemStoreRoles_descr: '',
            itemTemperature: '',
            itemVegan: '',
            itemWeight: '',
            itemExpiration: '',
            itemExisting: '',
            imageUrl: '',
            imageList: [],
            imageLinks: [],
            itemFav: '',
            openList: [],

            uniqGoods: [],
            visibleImg: false,
            showProcessLine: false,

            tastyList: [],
            tastyId: '',
            tastyName: '',
            tastyImg: '',
            tastyLink: '',
        }
    },
    watch: {
        $route(to, from) {
            this.visibleItem = false
            this.itemArray = []
            this.search = ''
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
        reloadPage(){
            location.reload(true)
        },
        onChangeFileUpload(){
            this.file = this.$refs.file.files[0];
        },
        onChangeFileUpload2(e){
            this.file = e.target.files[0]
            this.imageUrl = URL.createObjectURL(this.file);
        },
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
                this.popAppAccept = 'Done'
            })
            .catch(function(){
                alert("Перевірьте чи правильно заповнили всі поля");
            });
        },
        openItem(bar){
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.itemBar = bar
            this.visibleItem = true
            axios.get('https://nash.enott.com.ua/api/getItem/' + bar)
            .then(response => {
                this.itemArray = response.data.Items;
                this.itemName = response.data.Items[0].name
                this.itemSubName = response.data.Items[0].subName
                this.itemCategory = response.data.Items[0].category
                this.itemSubCategory = response.data.Items[0].subCategory
                this.itemHumidity = response.data.Items[0].humidity
                if(response.data.Items[0].newItem == 'yes'){
                    this.itemNewItem = true
                }else{
                    this.itemNewItem = false
                }
                this.itemNutritionalValue1 = response.data.Items[0].nutritionalValue1
                this.itemNutritionalValue2 = response.data.Items[0].nutritionalValue2
                this.itemNutritionalValue3 = response.data.Items[0].nutritionalValue3
                this.itemNutritionalValue4 = response.data.Items[0].nutritionalValue4
                this.itemNutritionalValue5 = response.data.Items[0].nutritionalValue5
                this.itemNutritionalValue6 = response.data.Items[0].nutritionalValue6
                this.itemNutritionalValue7 = response.data.Items[0].nutritionalValue7
                this.itemNutritionalValue8 = response.data.Items[0].nutritionalValue8
                this.itemPacking = response.data.Items[0].packing
                this.itemPrice = response.data.Items[0].price
                this.itemRecipe = response.data.Items[0].recipe
                this.itemShortDescr = response.data.Items[0].shortDescr
                this.itemStoreRoles_descr = response.data.Items[0].storeRoles_descr
                this.itemTemperature = response.data.Items[0].temperature
                if(response.data.Items[0].vegan == 'yes'){
                    this.itemVegan = true
                }else{
                    this.itemVegan = false
                }
                if(response.data.Items[0].pop){
                    this.itemFav = true
                }else{
                    this.itemFav = false
                }
                this.itemWeight = response.data.Items[0].weight
                this.itemExpiration = response.data.Items[0].еxpiration
                this.itemExisting = response.data.Items[0].existing
                if(response.data.Items[0].stamps1 != 0){
                    this.stamps1 = true
                }
                this.stamps2 = response.data.Items[0].stamps2
                this.mainImage = response.data.mainImg;
                this.subCatList = response.data.adminSubCategories
            })
        },
        openLists(name){
            if(name == this.openList){
                this.openList = false
            }else{
                this.openList = name
            }
        },
        updateItem(){
            let formData = new FormData();
            formData.append('bar', this.itemBar);
            formData.append('name', this.itemName);
            formData.append('subName', this.itemSubName);
            formData.append('category', this.itemCategory);
            formData.append('subCategory', this.itemSubCategory);
            formData.append('humidity', this.itemHumidity);
            if(this.itemNewItem){
                formData.append('newItem', 'yes'); 
            }else{
                formData.append('newItem', '');
            }
            formData.append('nutritionalValue1', this.itemNutritionalValue1);
            formData.append('nutritionalValue2', this.itemNutritionalValue2);
            formData.append('nutritionalValue3', this.itemNutritionalValue3);
            formData.append('nutritionalValue4', this.itemNutritionalValue4);
            formData.append('nutritionalValue5', this.itemNutritionalValue5);
            formData.append('nutritionalValue6', this.itemNutritionalValue6);
            formData.append('nutritionalValue7', this.itemNutritionalValue7);
            formData.append('nutritionalValue8', this.itemNutritionalValue8);
            formData.append('packing', this.itemPacking);
            formData.append('price', this.itemPrice);
            formData.append('recipe', this.itemRecipe);
            formData.append('shortDescr', this.itemShortDescr);
            formData.append('storeRoles_descr', this.itemStoreRoles_descr);
            formData.append('temperature', this.itemTemperature);
            if(this.itemVegan){
                formData.append('vegan', 'yes'); 
            }else{
                formData.append('vegan', '');
            }
            formData.append('weight', this.itemWeight);
            formData.append('expiration', this.itemExpiration);
            if(this.file){
                formData.append('file', this.file);
                formData.append('oldFile', this.mainImage);
            }
            if(this.stamps1){
                formData.append('stamps1', 1);
            }else{
                formData.append('stamps1', 0);
            }
            formData.append('existing', this.itemExisting);
            formData.append('stamps2', this.stamps2);
            formData.append('itemName', this.itemName);
            if(this.itemFav){
                formData.append('pop', 'yes');
            }else{
                formData.append('pop', '');
            }
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            axios.post('https://nash.enott.com.ua/api/updateItem', formData, config
            ).then(function(response){

            })
            .catch(function(){
                alert("Перевірьте чи правильно заповнили всі поля");
            });
            this.popAppAccept = 'Done'
        },
    
        getPhotos(name){
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.visibleImg = name
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            axios.get('https://nash.enott.com.ua/api/getPhotoArray/' + name, config)
            .then(response => {
                this.imageLinks = response.data
            })
        },
        massUpload(e){
            for (var i = 0; i < e.target.files.length; i++ ){
                let file = e.target.files[i];
                var links = URL.createObjectURL(file);
                if(this.imageLinks){
                    var newId = Number(this.imageLinks.length) + 1
                }else{
                    var newId = 1
                }
                this.imageList.push({"id": newId, "file": file})
                if(!this.imageLinks){
                    this.imageLinks = []
                }
                this.imageLinks.push({"id": newId, "file": links})
            }
        },
        async uploadImg(){
            this.showProcessLine = true
            let formData = new FormData();
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            var loadStep = 100 / this.imageList.length
            this.progress = 0
            for(let i = 0; i < this.imageList.length; i++){
                var oneFile = this.imageList[i].file
                formData.append('itemName', this.visibleImg);
                formData.append('file', oneFile);
                await axios.post('https://nash.enott.com.ua/api/updatePhotos', formData, config)
                .then(response => {

                })
                .catch(function(){
                    alert("Перевірьте чи правильно заповнили всі поля");
                });
                this.progress = this.progress + loadStep
            }
            this.showProcessLine = false
            this.popAppAccept = 'Done'
        },
        deleteImg(id, name){
            let formData = new FormData();
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            formData.append('itemName', this.visibleImg);
            formData.append('fileName', name);
            axios.post('https://nash.enott.com.ua/api/deletePhoto', formData, config)
            .then(response => {
                this.popAppAccept = 'Done'
            })
            .catch(function(){
                alert("Перевірьте чи правильно заповнили всі поля");
            });
            this.imageLinks = this.imageLinks.filter(function(item) {
                return item.id !== id
            })
            this.imageList = this.imageList.filter(function(item) {
                return item.id !== id
            })
        },

        changeTasty(oldImg, oldName){
            window.scrollTo({ top: 0, behavior: 'smooth' });
            let formData = new FormData();
            formData.append('name', this.tastyName);
            formData.append('oldName', oldName);
            formData.append('newPhoto', this.tastyImg);
            formData.append('id', this.tastyId);
            formData.append('deleteImg', oldImg);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            axios.post('https://nash.enott.com.ua/api/changeTasty', formData, config
            ).then(function(){
                this.popAppAccept = 'Done'
            })
            .catch(function(){
                alert("Перевірьте чи правильно заповнили всі поля");
            });
        },
        changeTastyImg(e){
            this.tastyImg = e.target.files[0]
            this.tastyLink = URL.createObjectURL(this.tastyImg);
        },
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
        axios.get('https://nash.enott.com.ua/api/getTasty')
        .then(response => {
            this.tastyList = response.data;
        })
    }
}
</script>

<style>

</style>