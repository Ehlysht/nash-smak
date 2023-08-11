<template>
    <div>
        <form class="adminPage-form" v-if="this.routeVal == 'catalogItemUpdate'">
            <h2 class="adminPage-title">
                Каталог
            </h2>
            <p class="adminPage-subtitle">
                Змінити товар
            </p>
            <label class="adminPage-search" for="itemSearch" v-if="!this.visibleItem">
                Пошук товару
                <input type="text" id="itemSearch" class="file-drop-area" v-model="this.search">
            </label>
            <button v-if="this.visibleItem" @click.prevent="this.visibleItem = false; this.itemArray = []; this.search = ''" style="color: #00A439;cursor: pointer; display:flex; align-items:center;margin: 20px 0;"><img src="@/assets/img/arrow-right.svg" alt="" style="transform: rotate(180deg);"> Повернутись</button>
            <ul class="category-items adminPage-category_items" v-if="!this.itemArray.length">
                <li class="category-item1" v-for="item in filteredCatalog" :key="item.bar">
                    <div class="category-img">
                        <button class="adminGoods-item_edit" @click.prevent="openCatalog(item.bar)">
                            <img src="@/assets/img/edit.png" alt="Edit">
                        </button>
                        <div class="category-img_head" :style="`background:url('https://nash.enott.com.ua/api/upload/${item.imgItem}')center center/100% no-repeat;`"></div>
                    </div>  
                    <h3 class="category-name">
                        {{ item.name }}
                    </h3>
                </li>
            </ul>
            <div class="adminPage-item" v-for="goods in this.itemArray" :key="goods.bar">
                <div>
                    <div class="adminPage-item_mainImage" :style="`background:url('https://nash.enott.com.ua/api/upload/${this.mainImage}')center center/cover no-repeat`"></div>
                    <button class="adminPage-btn" v-if="this.visibleItem" @click.prevent="this.popAppAccept = 'updateCatalog'">
                        Зберегти
                    </button>
                </div>
                <div class="adminPage-item_info">
                    <p for="text1" style="font-size:24px;color:#470D04;font-weight:500;margin-bottom: 40px;">
                        {{ this.itemName }}
                    </p>
                    <div style="display:flex;gap: 0 24px;">
                        <label class="adminPage-select">
                            <img src="@/assets/img/popContent.png" alt="" style="margin-bottom: 8px;">
                            <label class="switch">
                                <input type="checkbox" v-model="this.stamp1">
                                <span class="slider round"></span>
                            </label>
                        </label>
                        <label class="adminPage-select">
                            <img src="@/assets/img/popContent1.png" alt="" style="margin-bottom: 8px;">
                            <label class="switch">
                                <input type="checkbox" v-model="this.stamp2">
                                <span class="slider round"></span>
                            </label>
                        </label>
                        <label class="adminPage-select">
                            <img src="@/assets/img/popContent2.png" alt="" style="margin-bottom: 8px;">
                            <label class="switch">
                                <input type="checkbox" v-model="this.stamp3">
                                <span class="slider round"></span>
                            </label>
                        </label>
                        <label class="adminPage-select">
                            <img src="@/assets/img/stamp4.png" alt="" style="margin-bottom: 8px;">
                            <label class="switch">
                                <input type="checkbox" v-model="this.stamp4">
                                <span class="slider round"></span>
                            </label>
                        </label>
                    </div>
                    <div class="adminPage-switch">
                        <h4 style="font-size:18px;color:#470D04;font-weight:500;">
                            Термін придатності
                        </h4>
                        <label for="text22" class="adminPage-select" style="width:25%">
                            Загальний
                            <input id="text22" type="text" v-model="this.Expiration">
                        </label>
                        <label style="display: flex;align-items: center;justify-content: center;color:#A6A4A2;width:10%">
                            або
                        </label>
                        <label for="text4" class="adminPage-select" style="width:25%">
                            В холодильнику
                            <input id="text4" type="text" v-model="this.Expiration1">
                        </label>
                        <label for="text19" class="adminPage-select" style="width:25%">
                            Без холодильника
                            <input id="text19" type="text" v-model="this.Expiration2">
                        </label>
                    </div>
                    <label for="text19" class="adminPage-label_descr">
                        Картонна коробка міні 
                        <input id="text19" type="text" v-model="this.box1">
                    </label>
                    <label for="text19" class="adminPage-label_descr">
                        Картонна коробка максі
                        <input id="text19" type="text" v-model="this.box2">
                    </label>
                    <label for="text19" class="adminPage-label_descr">
                        Картонна коробка Опт
                        <input id="text19" type="text" v-model="this.box3">
                    </label>
                    <label for="text19" class="adminPage-label_descr">
                        Картонна коробка
                        <input id="text19" type="text" v-model="this.box4">
                    </label>
                    <label for="text19" class="adminPage-label_descr">
                        Прозорий пакет
                        <input id="text19" type="text" v-model="this.box5">
                    </label>
                    <label for="text19" class="adminPage-label_descr">
                        Прозорий пакет
                        <input id="text19" type="text" v-model="this.box6">
                    </label>
                </div>
            </div>
        </form>
        <form class="adminPage-form" v-if="this.routeVal == 'catalogPage'">
            <h2 class="adminPage-title">
                Каталог
            </h2>
            <p class="adminPage-subtitle">
                Змінити фонові фото
            </p>
            <div v-for="catImg in this.catImgList" :key="catImg.id" style="margin-bottom: 32px;">
                <button v-if="this.catId != catImg.id" class="tasty-btn" style="display:flex; margin-left:auto;" @click.prevent="this.catId = catImg.id; this.catTitle = catImg.title; this.catDescr = catImg.descr; this.catLink = 'https://nash.enott.com.ua/api/upload/' + catImg.image">
                    Змінити
                </button>
                <button v-if="this.catId == catImg.id" class="tasty-btn tasty-btn_yes" style="display:flex; margin-left:auto;" @click.prevent="this.popAppAccept = 'changeCat'">
                    Зберегти
                </button>
                <button v-if="this.catId == catImg.id" class="tasty-btn tasty-btn_no" style="display:flex; margin-left:auto;" @click.prevent="this.catId = ''; this.catTitle = ''">
                    Відмінити
                </button>
                <p v-if="this.catId != catImg.id" style="color: #470D04;font-weight: 600;font-size: 40px;line-height: 40px;">
                    {{ catImg.title }}
                </p>
                <div v-html="catImg.descr" v-if="this.catId != catImg.id" style="font-weight: 400;font-size: 18px;line-height: 26px;color: #000;"></div>
                <div v-if="this.catId != catImg.id" class="category-item_head__img" :style="`background:url('https://nash.enott.com.ua/api/upload/${catImg.image}')center center/cover no-repeat;height:449px;margin-top:32px;`"></div>
                
                <label v-if="this.catId == catImg.id" for="tasty" class="adminPage-select" style="margin-right:12px;width:400px;color: #470D04;">
                    Категорія
                    <input id="tasty" type="text" v-model="this.catTitle">
                </label>
                <label v-if="this.catId == catImg.id" for="cat" class="adminPage-select" style="margin-right:12px;width:100%;color: #470D04;">
                    Опис
                    <input id="cat" type="text" v-model="this.catDescr">
                </label>
                <div v-if="this.catId == catImg.id" class="file-drop-area" style="width: 41%;padding:10px;">
                    <span class="fake-btn">Завантажити нове фото</span>
                    <input class="file adminPage-item_changeImg file-input" type="file" ref="file" @change="changeCatImg($event)" >
                </div>
                <div v-if="this.catId == catImg.id" class="category-item_head__img" :style="`background:url('${this.catLink}')center center/cover no-repeat;height:449px;margin-top:32px;`"></div>
            </div>
        </form>
        <Transition name="fade">
            <div class="access-popApp" v-if="this.popAppAccept">
                <div class="access-popApp_block">
                    <p class="access-popApp_text">
                        Ви дійсно хочете зберегти зміни?
                    </p>
                    <div class="access-popApp_btns">
                        <button class="access-popApp_yes btn" v-if="popAppAccept == 'updateCatalog'" @click.prevent="updateCatalog()"><a href="#">Так</a></button>
                        <button class="access-popApp_yes btn" v-if="popAppAccept == 'changeCat'" @click.prevent="changeCat(catImg.image, catImg.name)"><a href="#">Так</a></button>
                        <button class="access-popApp_no btn" @click.prevent="this.popAppAccept = false"><a href="#">Ні</a></button>
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
            allCatalog: [],
            visibleItem: false,
            search: '',
            itemBar: '',
            itemArray: [],
            itemName: '',
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
            file: '',
            imageUrl: '',
            popAppAccept: ''
        }
    },
    methods:{
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
        },
        onChangeFileUpload2(e){
            this.file = e.target.files[0]
            this.imageUrl = URL.createObjectURL(this.file);
        },
        updateCatalog(){
            let formData = new FormData();
            formData.append('bar', this.itemBar);
            formData.append('descr', this.descr);
            if(this.stamp1){
                formData.append('stamp1', 'yes'); 
            }else{
                formData.append('stamp1', '');
            }
            if(this.stamp2){
                formData.append('stamp2', 'yes'); 
            }else{
                formData.append('stamp2', '');
            }
            if(this.stamp3){
                formData.append('stamp3', 'yes'); 
            }else{
                formData.append('stamp3', '');
            }
            if(this.stamp4){
                formData.append('stamp4', 'yes'); 
            }else{
                formData.append('stamp4', '');
            }
            formData.append('Expiration', this.Expiration);
            formData.append('Expiration1', this.Expiration1);
            formData.append('Expiration2', this.Expiration2);
            formData.append('box1', this.box1);
            formData.append('box2', this.box2);
            formData.append('box3', this.box3);
            formData.append('box4', this.box4);
            formData.append('box5', this.box5);
            formData.append('box6', this.box6);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            axios.post('https://nash.enott.com.ua/api/updateCatItem', formData, config
            ).then(function(){
                alert("Змінено")
                location.reload(true)
            })
            .catch(function(){
                alert("Перевірьте чи правильно заповнили всі поля");
            });
        },
    },
    watch: {
        $route(to, from) {
            this.visibleItem = false
            this.itemArray = []
            this.search = ''
        }
    },
    computed:{
        filteredCatalog(){
            var array = []
            for(let i = 0; i < this.allCatalog.length; i++){
                if(this.allCatalog[i].name.slice(0, this.search.length).toLowerCase() == this.search.toLowerCase()){
                    array.push(this.allCatalog[i])
                }
            }
            return array
        },
    },
    mounted(){
        axios.get('https://nash.enott.com.ua/api/getAllCatalog')
        .then(response => {
            this.allCatalog = response.data.allGoods
        })
    }
}
</script>

<style>

</style>