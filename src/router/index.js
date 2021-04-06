import { createWebHistory, createRouter, createWebHashHistory } from 'vue-router'
// const history = createWebHistory()

import Login from '../pages/login/index.vue'
import Register from '../pages/register/index.vue'
import Home from '../pages/home/index.vue'
import Info from '../pages/home/info/index.vue'
import Relation from '../pages/home/relation/index.vue'
import Discover from '../pages/home/discover/index.vue'
import Watching from '../pages/home/watching/index.vue'
import ChatInterface from '../pages/chatInterface/index.vue'
import SetPicture from '../pages/setPicture/index.vue'
import AddFriends from '../pages/addFriends/index.vue'
import PersonalitySignature from '../pages/personalitySignature/index.vue'

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            redirect: '/info',
            children: [
                {
                    path: '/info',
                    name: 'info',
                    component: Info,
                },
                {
                    path: '/relation',
                    name: 'relation',
                    component: Relation,
                },
                {
                    path: '/discover',
                    name: 'discover',
                    component: Discover,
                },
                {
                    path: '/watching',
                    name: 'watching',
                    component: Watching,
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/chatInterface',
            name: 'chatInterface',
            component: ChatInterface
        },
        {
            path: '/setPicture',
            name: 'setPicture',
            component: SetPicture
        },
        {
            path: '/addFriends',
            name: 'addFriends',
            component: AddFriends
        },
        {
            path: '/personalitySignature',
            name: 'personalitySignature',
            component: PersonalitySignature
        }
    ]
})
  
export default router;
