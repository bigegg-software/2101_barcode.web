import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import {parse} from './request/index.js'
// import config from 'static/config/index.js'
// import parse from 'parse/weapp'
// parse.serverURL =config.parseServerBaseUrl
// parse.initialize(config.ParseAppId, config.parseServerJsKey)
Vue.prototype.$Parse = parse
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
