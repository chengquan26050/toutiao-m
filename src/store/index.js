import Vue from 'vue'
import Vuex from 'vuex'
import {setItem,getItem} from '@/utils/storage'
Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // user: JSON.parse(localStorage.getItem(TOKEN_KEY)),
    user: getItem(TOKEN_KEY),
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
      setItem(TOKEN_KEY, data)
    },
  },
  actions: {},
  modules: {},
})
