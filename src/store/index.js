import { createStore } from 'vuex'
import axios from 'axios'
import NovaPoshta from 'novaposhta';
const store = createStore({
  state: {
    loginVisible: false,
    cartVisible: false,
    visibleMenu: false,
    openCatalog: false,
    overlay: false,
    posInCart: 0,
    regions: [],
    city: [],
    wh: [],
    loader: true,
    sumValue: 0,
    ifExistCart: []
  },
  getters: {
    loginVisible(state){
      return state.loginVisible;
    },
    cartVisible(state){
      return state.cartVisible;
    },
    visibleMenu(state){
      return state.visibleMenu;
    },
    openCatalog(state){
      return state.openCatalog;
    },
    overlay(state){
      return state.overlay;
    },
    posInCart(state){
      return state.posInCart;
    },
    regions(state){
      return state.regions;
    },
    city(state){
      return state.city;
    },
    wh(state){
      return state.wh;
    },
    loader(state){
      return state.loader;
    },
    sumValue(state){
      return state.sumValue
    },
    ifExistCart(state){
      return state.ifExistCart
    }
  },
  mutations: {
    updateLoginVisible(state, loginVisibleVal){
      state.loginVisible = loginVisibleVal
    },
    updateCartVisible(state, cartVisibleVal){
      state.cartVisible = cartVisibleVal
    },
    updateVisibleMenu(state, visibleMenuVal){
      state.visibleMenu = visibleMenuVal
    },
    updateOpenCatalog(state, openCatalogVal){
      state.openCatalog = openCatalogVal
    },
    updatePosInCart(state, posInCartVal){
      state.posInCart = posInCartVal
    },
    updateOverlay(state, overlayVal){
      state.overlay = overlayVal
    },
    updateCity(state){
      const api = new NovaPoshta({ apiKey: '1805304084717f37c3824fd9898eece6' });
      api.address
      .getCities()
      .then((json) => {
        state.city = json.data
      })
      .catch((errors) => {
          if (Array.isArray(errors)) {
              errors.forEach((error) => console.log(`[${ error.code || '-' }] ${ error.en || error.uk || error.ru || error.message }`));
          }
      });
    },
    updateWh(state, cityVal){
      const api = new NovaPoshta({ apiKey: '1805304084717f37c3824fd9898eece6' });
      api.address
      .getWarehouses({'CityName': cityVal, 'BicycleParking ': '1'})
      .then((json) => {
        state.wh = json.data
      })
      .catch((errors) => {
          if (Array.isArray(errors)) {
              errors.forEach((error) => console.log(`[${ error.code || '-' }] ${ error.en || error.uk || error.ru || error.message }`));
          }
      });
    },
    updateLoder(state, loaderVal){
      state.loader = loaderVal
    },
    updateSum(state, sumVal){
      state.sumValue = sumVal
    },
    updateIfExistCart(state, ifExistCartVal){
      state.ifExistCart = ifExistCartVal
    },
  },
  actions: {
    setLoginVisible({ commit }, loginValue){
      commit('updateLoginVisible', loginValue)
    },
    setCartVisible({ commit }, cartValue){
      commit('updateCartVisible', cartValue)
    },
    setVisibleMenu({ commit }, visibleMenuValue){
      commit('updateVisibleMenu', visibleMenuValue)
    },
    setOpenCatalog({ commit }, catVal){
      commit('updateOpenCatalog', catVal)
    },
    setOverlay({ commit }, overlayVal){
      commit('updateOverlay', overlayVal)
    },
    setPosInCart({ commit }){
      if(localStorage.getItem('user')){
        axios.get('https://nash.enott.com.ua/api/countCart/' + JSON.parse(localStorage.getItem('user'))[0].email)
        .then(response => {
          commit('updatePosInCart', response.data.qty.sumQty)
        })
      }else{
        commit('updatePosInCart', 0)
      }
    },
    setCity({ commit }){
      commit('updateCity')
    },
    setWh({ commit }, cityVal){
      commit('updateWh', cityVal)
    },
    setLoader({ commit }, loaderVal){
      commit('updateLoder', loaderVal)
      setTimeout(() => {
        commit('updateLoder', false)
      }, 2000);
    },
    setSum({ commit }, sumVal){
      commit('updateSum', sumVal)
    },
    setIfExistCart({ commit }){
      if(localStorage.getItem('user')){
        axios.get('https://nash.enott.com.ua/api/countCart/' + JSON.parse(localStorage.getItem('user'))[0].email)
        .then(response => {
            commit('updateIfExistCart', response.data.bars)
        })
        
      }
    },
  }
});

export default store;