import Vue from 'vue'
import App from './App'
new Vue({
  el: '#app',
  render(home) {
    return home(App)
  }
})