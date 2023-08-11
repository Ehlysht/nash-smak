<template>
    <ul class="cabinetAdm-menu">
        <li class="cabinetAdm-item cabinetAdm-item_btn">
            <router-link to="/CMS/orders" class="cabinetAdm-link">
                <img src="@/assets/img/cart.svg" alt="Cart"> Замовлення
            </router-link>
        </li>
        <li class="cabinetAdm-item cabinetAdm-item_block">
            <p>Онлайн крамниця</p>
            <ul class="cabinetAdm-submenu">
                <router-link to="/CMS/goodsUpdate" class="cabinetAdm-link">
                    Оновити весь товар
                </router-link>
                <router-link to="/CMS/goodsItemUpdate" class="cabinetAdm-link">
                    Редагувати товар
                </router-link>
                <router-link to="/CMS/goodsAddPhoto" class="cabinetAdm-link">
                    Додати фото
                </router-link>
                <router-link to="/CMS/tasty" class="cabinetAdm-link">
                    Редагувати смаки
                </router-link>
            </ul>
        </li>
        <li class="cabinetAdm-item cabinetAdm-item_block">
            <p>Каталог</p>
            <ul class="cabinetAdm-submenu">
                <router-link to="/CMS/catalogItemUpdate" class="cabinetAdm-link">
                    Редагувати товар
                </router-link>
                <router-link to="/CMS/catalogPage" class="cabinetAdm-link">
                    Фонові фото
                </router-link>
            </ul>
        </li>
        <div class="cabinetAdm-item_block">
            <li class="cabinetAdm-item">
                <router-link to="/CMS/carusel" class="cabinetAdm-link">
                    Банери
                </router-link>
            </li>
            <li class="cabinetAdm-item">
                <router-link to="/CMS/advertising" class="cabinetAdm-link">
                    Рекламний блок
                </router-link>
            </li>
            <li class="cabinetAdm-item">
                <router-link to="/CMS/sendAdv" class="cabinetAdm-link">
                    Розсилка реклами
                </router-link>
            </li>
            <li class="cabinetAdm-item">
                <router-link to="/CMS/instagram" class="cabinetAdm-link">
                    Інстаграм пости
                </router-link>
            </li>
            <li class="cabinetAdm-item">
                <router-link to="/CMS/question" class="cabinetAdm-link">
                    Питання та відповіді
                </router-link>
            </li>
            <li class="cabinetAdm-item">
                <router-link to="/CMS/vacancy" class="cabinetAdm-link">
                    Вакансії
                </router-link>
            </li>
        </div>
    </ul>
</template>

<script>
export default {

}
</script>

<style scoped>
    .cabinetAdm-menu{
        width: 361px;
        margin-top: 40px;
        border-radius: 15px;
        height: 100%;
    }
    .cabinetAdm-item_block{
        padding: 24px;
        background: #FFFEFC;
        box-shadow: 0px 4px 15px rgba(207, 205, 149, 0.17);
        border-radius: 15px;
        margin-bottom: 32px;
    }
    .cabinetAdm-item{
        padding-bottom: 10px;
    }
    .cabinetAdm-item p{
        color: #00A439;
        font-weight: 400;
        font-size: 18px;
        line-height: 26px;
        margin-bottom: 16px;
        margin-left: 16px;
    }
    .cabinetAdm-item a{
        font-weight: 400;
        font-size: 18px;
        line-height: 26px;
        color: #470D04;
        margin-left: 32px;
        margin-bottom: 16px;
    }
    .cabinetAdm-item_btn a{
        border: 1px solid #00A439;
        box-shadow: 0px 4px 15px rgba(207, 205, 149, 0.17);
        border-radius: 15px;
        padding: 15px 0;
        text-align: center;
        width: 100%;
        margin-bottom: 32px;
    }
    .cabinetAdm-item_btn a{
        color: #470D04;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0;
        margin-bottom: 0;
    }
    .cabinetAdm-item_btn img{
        margin-right: 16px;
        width: 32px;
        height: 32px;
    }
    .cabinetAdm-submenu{
        padding-left: 24px;
        display: flex;
        flex-direction: column;
    }
    .cabinetAdm-link{
        color: #470D04;
        padding-bottom: 3px;
    }
    .cabinetAdm-link:hover{
        color: #00A439;
    }
    .cabinetAdm-submenu .router-link-active, .cabinetAdm-item .router-link-active{
        color: #00A439;
    }
    .cabinetAdm-item_btn:hover a{
        background: #00A439;
        color: #fff;
        box-shadow: 0px 4px 15px 0px rgba(207, 205, 149, 0.17);
    }
    .cabinetAdm-item_btn:hover img{
        filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(12deg) brightness(106%) contrast(103%);
    }
    .cabinetAdm-item_btn .router-link-active{
        background: #00A439;
        color: #fff;
        box-shadow: 0px 4px 15px 0px rgba(207, 205, 149, 0.17);
    }
    .cabinetAdm-item_btn .router-link-active img{
        filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(12deg) brightness(106%) contrast(103%);
    }
</style>