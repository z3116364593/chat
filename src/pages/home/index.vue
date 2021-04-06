<template>
    <div class="home-view">
        <div 
            class="home-all" 
            @touchstart="onTouchStart($event)" 
            @touchmove="onTouchMove($event)" 
            @touchend="onTouchEnd($event)" 
            :style="{ left, transition }"
        >
            <div class="settings-page" :style="{ backgroundImage: `url('${api}/images/1371511736.jpeg')` }">
                <div class="status_bar" style="opacity: 0;"></div>
                <functional-zone @toHome="toHome" style="height: calc(100% - 24px);"></functional-zone>
            </div>

            <div class="home" :style="{ backgroundImage: `url('${api}/images/1371511736.jpeg')` }">
                <div class="status_bar" style="background-color: #647D95;"></div>
                <div class="home-top">
                    <!-- 消息 -->
                    <div class="top_info" v-if="currentPath === '/info'">
                        <div>
                            <img @click="toFunctionalZone" :src="api + '/images/' + (userInfo.headPortrait || 'default_avatar.jpg')" alt="">
                            <div>
                                <p>{{ userInfo.username }}</p>
                                <p><span class="on_line" style="margin-bottom: -0.02rem;margin-right: 0.06rem;"></span>HUAWEI Mate 30 Pro 5G 在线 - WiFi</p>
                            </div>
                        </div>
                        <div>
                            <van-icon @click="moreClick" name="plus" size="0.44rem" class="click_active" />
                        </div>
                    </div>
                    <!-- 联系人 -->
                    <div class="top_relation" v-if="currentPath === '/relation'">
                        <div>
                            <img @click="toFunctionalZone" :src="api + '/images/' + (userInfo.headPortrait || 'default_avatar.jpg')" alt="">
                            <span class="on_line" style="margin-top: 0.42rem;"></span>
                        </div>
                        <p>联系人</p>
                        <p></p>
                    </div>
                    <!-- 看点 -->
                    <div class="top_watching" v-if="currentPath === '/watching'">
                        <div>
                            <img @click="toFunctionalZone" :src="api + '/images/' + (userInfo.headPortrait || 'default_avatar.jpg')" alt="">
                            <span class="on_line" style="margin-top: 0.42rem;"></span>
                        </div>
                        <p>看点</p>
                        <p></p>
                    </div>
                    <!-- 动态 -->
                    <div class="top_discover" v-if="currentPath === '/discover'">
                        <div>
                            <img @click="toFunctionalZone" :src="api + '/images/' + (userInfo.headPortrait || 'default_avatar.jpg')" alt="">
                            <span class="on_line" style="margin-top: 0.42rem;"></span>
                        </div>
                        <p>动态</p>
                        <p></p>
                    </div>
                </div>
                <div class="home-content">
                    <router-view></router-view>
                </div>
                <ul class="home-footer">
                    <li v-for="(item, index) in footList" :key="index" @click="footClick(item, index)" :style="{ color: item.status ? 'var(--color)' : '#666666', transform: item.transform }">
                        <i :class="item.icon"></i>
                        <p>{{item.name}}</p>
                    </li>
                </ul>
            </div>
            <More @close="moreShow = false" :show="moreShow"></More>
        </div>
    </div>
</template>

<script>
import './css/index.css'
import { reactive, toRefs, computed, onMounted, onUpdated } from 'vue'
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import { api } from '../../api/ap'
import functionalZone from '../functionalZone/index.vue'
import More from '../../components/more/index.vue'
export default {
    components: {
        functionalZone,
        More
    },
    setup() {
        const router = useRouter()
        const store = useStore()
        const path = computed(() => router.options.history.location)
        const userInfo = computed(() => store.state.home.userInfo)
        // console.log(router.options.history.location)
        const state = reactive({
            active: 0,
            footList: [
                {
                    name: '消息',
                    iconTrue: 'iconfont icon-pinglun1',
                    iconFalse: 'iconfont icon-pinglun',
                    icon: 'iconfont icon-pinglun1',
                    path: '/info',
                    status: true,
                    transform: 'scale(1)'
                },
                {
                    name: '联系人',
                    iconTrue: 'iconfont icon-tongxunlu',
                    iconFalse: 'iconfont icon-tongxunlu1',
                    icon: 'iconfont icon-tongxunlu1',
                    path: '/relation',
                    status: false,
                    transform: 'scale(1)'
                },
                {
                    name: '看点',
                    iconTrue: 'iconfont icon-dibutubiao_kandian-xuanzhong',
                    iconFalse: 'iconfont icon-dibutubiao_kandian',
                    icon: 'iconfont icon-icon_signal',
                    path: '/watching',
                    status: false,
                    transform: 'scale(1)'
                },
                {
                    name: '动态',
                    iconTrue: 'iconfont icon-faxian1',
                    iconFalse: 'iconfont icon-faxian',
                    icon: 'iconfont icon-faxian',
                    path: '/discover',
                    status: false,
                    transform: 'scale(1)'
                }
            ],
            moveIndex: 1,
            left: '-100%',
            transition: 'all 0s',
            startLocation: 0,
            calculateTime: 0,
            cannot: false,
            currentPath: router.currentRoute.value.fullPath,
            api,
            moreShow: false,
        })

        onMounted(() => {
            setFoot()
        })

        onUpdated(() => {
            setFoot()
        })

        const setFoot = () => {
            setTimeout(() => {
                let index = state.footList.findIndex(item => item.path === router.options.history.location)
                if(index !== -1) {
                    state.footList.forEach(item => {
                        item.icon = item.iconFalse
                        item.status = false
                    })
                    state.footList[index].icon = state.footList[index].iconTrue
                    state.footList[index].status = true
                }

                state.currentPath = router.currentRoute.value.fullPath
            })
        }

        const footClick = (item, index) => {
            router.push(item.path)
            item.transform = 'scale(0.7)'
            setTimeout(() => {
                item.transform = 'scale(1)'
            }, 100)
        }

        // 开始移动
        const onTouchStart = (e) => {
            if(state.cannot) return
            state.startLocation = e.changedTouches[0].clientX
            state.calculateTime = new Date().getTime()
        }

        // 移动中
        const onTouchMove = (e) => {
            if(state.cannot) return
            let clientX = e.changedTouches[0].clientX - state.startLocation
            if(state.moveIndex === 1 && clientX < 0) {
                state.left = '-100%'
                return
            } else if(state.moveIndex === 0 && clientX > 0) {
                state.left = 0
                return
            }
            let currentLocation = state.moveIndex * (-window.innerWidth)
            state.left = (currentLocation + clientX) + 'px'
        }

        // 移动结束
        const onTouchEnd = (e) => {
            if(state.cannot) return
            let clientX = e.changedTouches[0].clientX - state.startLocation
            let status = window.innerWidth / 2
            let timeCount = new Date().getTime() - state.calculateTime
            if(state.moveIndex === 0 && (-clientX > status || (clientX < -10 && timeCount < 250))) {
                state.moveIndex += 1
            } else if(state.moveIndex === 1 && (clientX > status || (clientX > 10 && timeCount < 250))) {
                state.moveIndex -= 1
            }
            toMove()
        }

        // 移动到 state.moveIndex 位置
        const toMove = () => {
            state.transition = 'all .2s'
            state.cannot = true
            state.left = (state.moveIndex * (-window.innerWidth)) + 'px'
            setTimeout(() => {
                state.transition = 'all 0s'
                state.cannot = false
            }, 200)
        }

        const toHome = () => {
            state.moveIndex = 1
            toMove()
        }

        const toFunctionalZone = () => {
            state.moveIndex = 0
            toMove()
        }

        const moreClick = () => {
            state.moreShow = true
        }

        return {
            ...toRefs(state),
            footClick,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            toHome,
            moreClick,
            userInfo,
            toFunctionalZone
        }
    }
}
</script>
