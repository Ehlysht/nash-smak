<template>
  <footer class="footer" id="footer">
    <cart-list v-if="this.openCart"/>
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <router-link to="/">
            <img src="@/assets/img/logo-footer.png" alt="Logo" class="footer-logo_img">
          </router-link>
        </div>
        <ul class="footer-list">
          <li class="footer-item">
            <router-link to="/Goods/Онлайн крамниця">
              Онлайн крамниця
            </router-link>
          </li>
          <li class="footer-item">
            <router-link to="/Goods/Новинки">
              Новинки
            </router-link>
          </li>
          <li class="footer-item">
            <router-link to="/Goods/Без начинки">
              Без начинки
            </router-link>
          </li>
          <li class="footer-item">
            <router-link to="/Goods/З начинкою">
              З начинкою
            </router-link>
          </li>
          <li class="footer-item">
            <router-link to="/Goods/У глазурі">
              У глазурі
            </router-link>
          </li>
          <li class="footer-item">
            <router-link to="/Goods/Бісквіти">
              Бісквіти
            </router-link>
          </li>
          <li class="footer-item">
            <router-link to="/Goods/Набори">
              Набори
            </router-link>
          </li>
          <li class="footer-item">
            <router-link to="/Goods/До посту">
              До посту
            </router-link>
          </li>
        </ul>
        <ul class="footer-list">
          <li class="footer-item">
            <router-link to="/Catalog/Каталог">
              Каталог
            </router-link>
          </li>
          <li class="footer-item">
            <router-link to="/About">
              Про нас
            </router-link>
          </li>
          <li class="footer-item">
            <router-link to="/vacancy">
              Вакансії
            </router-link>
          </li>
          <li class="footer-item">
            <router-link to="/faq">
              Питання та відповіді
            </router-link>
          </li>
          <li class="footer-item">
            <router-link to="/Contacts">
              Контакти
            </router-link>
          </li>
          <li class="footer-item">
            <router-link to="/btb">
              B2B
            </router-link>
          </li>
          <li class="footer-item">
            <router-link to="/btb">
              Умови користування
            </router-link>
          </li>
        </ul>
        <ul class="footer-list footer-list_social">
          <li class="footer-item footer-item_links">
            <p>
              Графік роботи
            </p>
            <p>
              8:00 – 17:00  ПН-ПТ
            </p>
          </li>
          <li class="footer-item footer-item_links">
            <p>
              Зв'язок з нами
            </p>
            <div class="footer-item_social footer-item_social1">
              <a href="#">
                <img src="@/assets/img/viber.png" alt="Viber">
              </a>
              <a href="#">
                <img src="@/assets/img/telegram.png" alt="Telegram">
              </a>
            </div>
          </li>
          <li class="footer-item footer-item_links">
            <p>
              Ми у соцмережах
            </p>
            <div class="footer-item_social footer-item_social2">
              <a href="https://www.instagram.com/nashsmak.ua/" target="_blank">
                <img src="@/assets/img/insta-footer.png" alt="Instagram">
              </a>
              <a href="https://www.facebook.com/nashsmak.ua?locale=uk_UA" target="_blank">
                <img src="@/assets/img/face-footer.png" alt="Facebook">
              </a>
              <a href="https://www.tiktok.com/@nashsmak" target="_blank">
                <img src="@/assets/img/tik-footer.png" alt="Tik-Tok">
              </a>
              <a href="https://www.pinterest.com/nashsmakua/" target="_blank">
                <img src="@/assets/img/pinterest-footer.png" alt="Pinterest">
              </a>
            </div>
            <div class="footer-wallets">
              <img src="@/assets/img/visa.png" alt="Visa">
              <img src="@/assets/img/master.png" alt="Master Cart">
            </div>
          </li>
        </ul>
      </div>
      <router-link to="/" class="footer-privat">
        © 2023. Наш смак Всі права захищенно
      </router-link>
    </div>
  </footer>
</template>

<script>
export default {
    data(){
      return{
        openCart: true
      }
    }
}
</script>

<style>

</style>