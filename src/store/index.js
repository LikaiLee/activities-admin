import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  getters,
  modules: {
    app,
    user
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
