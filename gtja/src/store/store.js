import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    CompanyCode: '',
    HeaderData: {},
    jd: 1,
    sarchText: ''
  },
  getters: {
    CompanyCode (state) {
      return state.CompanyCode
    },
    HeaderData (state) {
      return state.HeaderData
    },
    getJd (state) {
      return state.jd
    },
    getSearchData (state) {
      return state.searchText
    }
  },
  mutations: {
    getCode (state, data) {
      state.CompanyCode = data
    },
    getHeaderData (state, HeaderData) {
      state.HeaderData = HeaderData
    },
    storeJd (state, str) {
      state.jd = str
    },
    getSerch (state, str) {
      state.searchText = str
    }
  },
  actions:{
    changeJd (context, str) {
      context.commit('storeJd', str)
    },
    searchText (context, str) {
      context.commit('getSerch', str)
    }
  }
})