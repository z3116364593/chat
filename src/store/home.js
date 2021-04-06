import io from 'socket.io-client'
import { ip } from '../api/ap'
import { requestUserinfo } from '../api/home'

const socket = io.connect('ws://' + ip)

export default {
    state: {
        allUsers: [],
        login: false,
        user: {},
        adverse: JSON.parse(localStorage.getItem('adverse')) || {},
        chatInfo: [],
        status: true,
        userInfo: {}
    },
    mutations: {
        // 设置当前用户信息
        async setUserInfo(state) {
            let phone = localStorage.getItem('phone')
            let response = await requestUserinfo({ phone })
            localStorage.setItem('userInfo', JSON.stringify(response.data.user))
            state.userInfo = response.data.user
            console.log(state.userInfo)
        },
        // 获取所有用户
        getUsers(state) {
            socket.on('userList', (data) => {
                state.allUsers = data
                // console.log('data', data)
            })
        },
        // 通过id连接后台
        connect(state, id) {
            socket.emit('userConnect', id)
        },
        // 发送消息
        sendMsg(state, data) {
            socket.emit('to-msg', data)
        },
        // 获取消息
        getMsg(state) {
            socket.on('on-msg', (res) => {
                let user = JSON.parse(localStorage.getItem('token'))
                let adverse = JSON.parse(localStorage.getItem('adverse'))
                try {
                    if(
                        (res[res.length - 1].oneseif === user.phone && res[res.length - 1].adverse === adverse.phone) ||
                        (res[res.length - 1].oneseif === adverse.phone && res[res.length - 1].adverse === user.phone)
                    ) {
                        state.chatInfo = res
                        console.log('获取信息', state.chatInfo)
                    }
                } catch(err) {
                    state.chatInfo = []
                }
            })
        }
    },
}