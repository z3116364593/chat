import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import Router from './router/index'
import Vuex from './store/index'

import { Button, Tab, Tabs, Icon, Toast, Uploader, PullRefresh, IndexBar, IndexAnchor, Cell } from 'vant';

const app = createApp(App)
app.use(Router)
app.use(Cell)
app.use(IndexBar)
app.use(IndexAnchor)
app.use(Toast)
app.use(Button)
app.use(Tab)
app.use(Tabs)
app.use(Icon)
app.use(Uploader)
app.use(PullRefresh)
app.use(Vuex)
app.mount('#app')
