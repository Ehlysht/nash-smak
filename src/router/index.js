// Default
import { createWebHistory, createRouter } from "vue-router";
import axios from 'axios'
import store from '@/store'
//Pages
import Home from '../views/Home.vue'
const routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: 'Головна',
      },
    },
    {
      path: "/Contacts",
      name: "Contacts",
      component: () => import(/* webpackChunkName: "Goods" */ '../views/Contacts.vue'),
      meta: {
        title: 'Контакти',
      },
    },
    {
      path: "/Login",
      name: "Login",
      component: () => import(/* webpackChunkName: "Goods" */ '../views/Login.vue'),
      meta: {
        title: 'Увійти',
      },
    },
    {
      path: "/Cart",
      name: "Cart",
      component: () => import(/* webpackChunkName: "Goods" */ '../views/Cart.vue'),
      meta: {
        title: 'Корзина',
      },
    },
    {
      path: "/Catalog/:catalogName",
      name: "Catalog",
      component: () => import(/* webpackChunkName: "Goods" */ '../views/Catalog.vue'),
      meta: {
        title: 'Каталог',
      },
    },
    {
      path: "/Register",
      name: "Register",
      component: () => import(/* webpackChunkName: "Goods" */ '../views/Register.vue'),
      meta: {
        title: 'Зареєструватись',
      },
    },
    {
      path: "/thankyou",
      name: "ThankYou",
      component: () => import(/* webpackChunkName: "Goods" */ '../views/thankyou.vue'),
      meta: {
        title: 'Дякуюємо',
      },
    },
    
    {
      path: "/Goods/:category",
      name: "Goods",
      component: () => import(/* webpackChunkName: "Goods" */ '../views/Goods.vue'),
      meta: {
        title: 'Онлайн крамниця',
      },
    },
    {
      path: "/Cabinet/:choice",
      name: "Cabinet",
      component: () => import(/* webpackChunkName: "Goods" */ '../views/Cabinet.vue'),
    },
    {
      path: "/Goods/:name/:bar",
      name: "Item",
      component: () => import(/* webpackChunkName: "Partners" */ '../views/Item.vue'),
    },
    {
      path: "/CMS/Main",
      name: "Main",
      component: () => import(/* webpackChunkName: "Goods" */ '../views/CMS/pages/Main.vue'),
      meta: {
        title: 'Панель адміністратора',
      },
    },
    { 
      path: "/404",
      name: "NotFoundPage",
      component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
    },
    {
      path: "/:catchAll(.*)", // Unrecognized path automatically matches 404
      redirect: '/404',
    },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  
  scrollBehavior: function (to, _from, savedPosition) {
    store.dispatch('setCartVisible', false);
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    } else {
      store.dispatch('setLoader', true);
      window.scrollTo(0, 0);
    }
  }
});
router.beforeEach((to, from, next) => {
  to.meta.title = to.params.category;
  to.meta.title2 = to.params.catalogName;
  next();
});
// router.beforeEach((to, from) => {
//   if(to.name === 'Admin' || to.name === 'ChangeInformation' || to.name === 'ChangeItem'){
//     if(JSON.parse(localStorage.getItem('user'))[0].role != 'njvfiAdmin'){
//       router.push({ path : '/Login' });
//     }
//   }
//   if(from.name === 'Card'){
//     if(JSON.parse(localStorage.getItem('user'))){
//       if(localStorage.getItem(JSON.parse(localStorage.getItem('user'))[0].login + 'card')){
//         var userArray = JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem('user'))[0].login + 'card'))
//         for (var j = 0; j < userArray.length; j++) {
//           let config = {
//             headers: {
//               'Content-Type': 'multipart/form-data'
//             }
//           }
//           let formData = new FormData();
//           formData.append('user', JSON.parse(localStorage.getItem('user'))[0].login);
//           formData.append('token', JSON.parse(localStorage.getItem('user'))[0].token);
//           formData.append('bar', userArray[j].bar);
//           formData.append('userQty', userArray[j].userQty);
//           axios.post('https://petroma.ua/api/addCard', formData, config)
//         }
//       }
//     }
//   }
// });
export default router;