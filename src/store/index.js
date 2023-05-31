import { createStore } from 'vuex'
import axios from 'axios'
import NovaPoshta from 'novaposhta';
const store = createStore({
  state: {
    cartVisible: false,
    openCatalog: false,
    overlay: false,
    regions: [],
    city: [],
    wh: [],
    loader: true,
    sumValue: 0
  },
  getters: {
    cartVisible(state){
      return state.cartVisible;
    },
    openCatalog(state){
      return state.openCatalog;
    },
    overlay(state){
      return state.overlay;
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
    }
  },
  mutations: {
    updateCartVisible(state, cartVisibleVal){
      state.cartVisible = cartVisibleVal
    },
    updateOpenCatalog(state, openCatalogVal){
      state.openCatalog = openCatalogVal
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
  },
  actions: {
    setCartVisible({ commit }, cartValue){
      commit('updateCartVisible', cartValue)
    },
    setOpenCatalog({ commit }, catVal){
      commit('updateOpenCatalog', catVal)
    },
    setOverlay({ commit }, overlayVal){
      commit('updateOverlay', overlayVal)
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
      }, 1000);
    },
    setSum({ commit }, sumVal){
      commit('updateSum', sumVal)
    },
  }
});

export default store;