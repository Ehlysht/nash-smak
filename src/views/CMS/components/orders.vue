<template>
    <form class="adminPage-order" v-if="this.routeVal == 'orders'">
        <h2 class="adminPage-title">
            Замовлення
        </h2>
        <ul class="adminPage-order_list" v-if="this.orderList">
            <li class="adminPage-order_header adminPage-order_item">
                <div class="adminPage-order_click">
                    <p class="adminPage-order_index">
                        №
                    </p>
                    <p class="adminPage-order_name">
                        Ім'я
                    </p>
                    <p class="adminPage-order_payment">
                        Спосіб оплати
                    </p>
                    <p class="adminPage-order_value">
                        Сума
                    </p>
                    <p class="adminPage-order_time">
                        Час замовлення
                    </p>
                </div>
                <p class="adminPage-order_status">
                    Статус
                </p>
            </li>
            <li :class="`adminPage-order_item ${order.statusColor}`" v-for="order in this.uniqOrderList" :key="order.id">
                <div class="adminPage-order_click" @click.prevent="openOrder(order.groupId)">
                    <p class="adminPage-order_index">
                        {{ order.groupId }}
                    </p>
                    <p class="adminPage-order_name">
                        {{ order.userName }}
                    </p>
                    <p class="adminPage-order_payment">
                        {{ order.userPayment }}
                    </p>
                    <p class="adminPage-order_value">
                        {{ order.totalValue }} грн.
                    </p>
                    <p class="adminPage-order_time">
                        {{ order.dateTime }}
                    </p>
                </div>
                <div class="adminPage-mainSelect_order">
                    <p @click="this.openLists(order.groupId)" class="adminPage-order_status adminPage-mainSelect_visibleText">
                        {{ order.status }}
                        <svg :style="`${this.openList == order.groupId ? 'transform: rotate(0deg);' : 'transform: rotate(180deg);'}`" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none" >
                            <path d="M1 6.5L5.11616 1.90683C5.60227 1.36439 6.39773 1.36439 6.88384 1.90683L11 6.5" stroke="#00A439" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </p>
                    <ul v-if="this.openList == order.groupId" class="adminPage-hiddenList">
                        <li class="adminPage-color1" v-if="order.status != 'Очікує оплати'" @click="updateStatus('Очікує оплати', order.groupId)">
                            Очікує оплати
                        </li>
                        <li class="adminPage-color2" v-if="order.status != 'Оплачено'" @click="updateStatus('Оплачено', order.groupId)">
                            Оплачено
                        </li>
                        <li class="adminPage-color3" v-if="order.status != 'Відправлено'" @click="updateStatus('Відправлено', order.groupId)">
                            Відправлено
                        </li>
                    </ul>
                </div>
                <ul class="adminPage-order_details" v-if="this.showOrder == order.groupId">
                    <div class="adminPage-order_cart">
                        <li v-for="details in this.orderList.filter((item) => item.groupId === order.groupId)" :key="details.id">
                            <img :src="`https://nash.enott.com.ua/api/upload/${details.headImg}`" :alt="details.headImg" class="ordered-img">
                            <div class="ordered-text_first">
                                <p class="ordered-name">
                                    {{ details.itemName }}
                                </p>
                                <p class="ordered-weight">
                                    {{ details.itemWeight }} гр
                                </p>
                            </div>
                            <div class="ordered-text">
                                <p class="ordered-text_title">
                                    Ціна
                                </p>
                                <p class="ordered-text_value">
                                    {{ details.price }} <span>грн</span>
                                </p>
                            </div>
                            <div class="ordered-text">
                                <p class="ordered-text_title">
                                    Кількість
                                </p>
                                <p class="ordered-text_value">
                                    {{ details.userQty }} <span>шт</span>
                                </p>
                            </div>
                            <div class="ordered-text">
                                <p class="ordered-text_title">
                                    Сумма
                                </p>
                                <p class="ordered-text_value">
                                    {{ details.price * details.userQty }} <span>грн</span>
                                </p>
                            </div>
                        </li>
                    </div>
                    <div class="adminPage-order_info">
                        <p>
                            <span>Отримувач</span><br> {{ order.userName }}   
                        </p>
                        <p>
                            <span>Email</span><br> {{ order.userEmail }}   
                        </p>
                        <p>
                            <span>Номер телефону</span><br> {{ order.userPhone }}
                        </p>
                        <p>
                            <span>Доставка в {{ order.userCity }}</span><br> {{ order.adress }} <br> {{ order.adress1 }}
                        </p>
                    </div>
                </ul>
            </li>
        </ul>
        <p style="font-size: 18px;margin-top: 32px;">
            Замолення відсутні
        </p>
    </form>
</template>

<script>
import axios from 'axios'
export default {
    props:['routeVal'],
    data(){
        return{
            orderList: [],
            uniqOrderList: [],
            showOrder: '',
            orderStatus: '',
            orderColor: '',
            orderId: '',
            openList: false,
        }
    },
    methods:{
        openLists(name){
            if(name == this.openList){
                this.openList = false
            }else{
                this.openList = name
            }
        },
        openOrder(id){
            if(this.showOrder == id){
                this.showOrder = false
            }else{
                this.showOrder = id
            }
        },
        async updateStatus(e, id){
            let formData = new FormData();
            formData.append('email', JSON.parse(localStorage.getItem('user'))[0].email);
            formData.append('token', JSON.parse(localStorage.getItem('user'))[0].token);
            formData.append('groupId', id);
            formData.append('status', e);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            await axios.post('https://nash.enott.com.ua/api/changeOrderStatus', formData, config)
            .then(response => {
                location.reload(true)
            })
            .catch(function(){
                alert("Перевірьте чи правильно заповнили всі поля");
            });
        },
    },
    mounted(){
        axios.get('https://nash.enott.com.ua/api/getOrderAdm/' + JSON.parse(localStorage.getItem('user'))[0].email + '/' + JSON.parse(localStorage.getItem('user'))[0].token)
        .then(response => {
            this.orderList = response.data.orders
            this.uniqOrderList = response.data.uniq
            if(this.uniqOrderList){
                for(let i = 0; i < this.uniqOrderList.length; i++){
                    if(this.uniqOrderList[i].status == 'Очікує оплати'){
                        this.uniqOrderList[i].statusColor = "adminPage-order_status__yellow";
                    }else if(this.uniqOrderList[i].status == 'Відправлено'){
                        this.uniqOrderList[i].statusColor = "adminPage-order_status__green";
                    }else{
                        this.uniqOrderList[i].statusColor = ""
                    }
                }
            }
            this.$store.dispatch('setLoader', false);
        })
    }
}
</script>

<style>

</style>