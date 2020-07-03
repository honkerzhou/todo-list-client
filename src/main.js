import Vue from 'vue'
import http from './utils/http'
import App from './App.vue'
import router from './router'
import store from './store'

// 按需引入element ui
import {
  Button, Input, Checkbox, Link, CheckboxGroup, Row, Col, Form, FormItem, TimePicker, Tabs,
  TabPane, Collapse, CollapseItem, Radio, RadioGroup, Message, Alert
} from 'element-ui'
Vue.use(Button)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Link)
Vue.use(CheckboxGroup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(TimePicker)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Alert)
Vue.prototype.$message = Message

// 在Vue原型上挂载axios实例，以在vue实例中可以通过$http使用axios
Vue.prototype.$http = http

Vue.config.errorHandler = function (err, vm, info) {
  console.log('抛出全局异常')
  console.log(vm)
  console.log(err)
  console.log(info)
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
