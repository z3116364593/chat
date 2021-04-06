<template>
    <div class="interface">
        <div class="interface-top">
            <i @click="back" class="iconfont icon-fanhui"></i>
            <div>
                <p>{{ adverse.username }}</p>
            </div>
            <i class="iconfont icon-043caidan"></i>
        </div>
        <div class="interface-content" ref="content" :style="{ 
            background: 'url(' + api + '/images/���G_20201227150214.jpg) no-repeat',
            backgroundSize: '100%'
        }">
            <van-pull-refresh
                v-model="isLoading"
                success-text="刷新成功"
                @refresh="onRefresh"
            >
                <ul>
                    <li v-for="(item, index) in storeHome.chatInfo" :key="index">
                        <span v-if="item.oneseif === oneseif.phone"></span>
                        <div v-if="item.oneseif === oneseif.phone">
                            <p style="background: var(--color);">{{ item.msg }}</p>
                            <img :src="api + '/images/' + user.headPortrait" alt="">
                        </div>

                        <div v-if="item.oneseif !== oneseif.phone">
                            <img :src="api + '/images/' + adverse.headPortrait" alt="">
                            <p style="background: #fff;">{{ item.msg }}</p>
                        </div>
                        <span v-if="item.oneseif !== oneseif.phone"></span>
                    </li>
                </ul>
            </van-pull-refresh>
        </div>
        <div class="interface-footer">
            <div>
                <input ref="send" v-model="msg" type="text">
                <van-button @click="sendMsg" color="var(--color)" class="send-btn">发送</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import './css/index.css'
import { useRouter } from 'vue-router'
import { reactive, toRefs, ref, onMounted, computed, watchEffect } from 'vue'
import { useStore } from "vuex";
import { api } from '../../api/ap'
// import { Toast } from 'vant';
export default {
    setup() {
        const router = useRouter()
        const store = useStore()
        const send = ref()
        const content = ref()
        const storeHome = computed(() => store.state.home)
        const oneseif = computed(() => JSON.parse(localStorage.getItem('token')))
        const adverse = computed(() => JSON.parse(localStorage.getItem('adverse')))
        const user = computed(() => JSON.parse(localStorage.getItem('userInfo')))
        const state = reactive({
            msg: '',
            isLoading: false
        })

        onMounted(() => {
            let params = {
                oneseif: oneseif.value.phone,
                adverse: adverse.value.phone,
                msg: '获取初始数据'
            }
            store.commit('sendMsg', params)
            toBottom()
        })

        //到底部
        const toBottom = () => {
            if(content && content.value) {
                let left = content.value
                const scrollHeight = content.value.scrollHeight;
                const height = content.value.clientHeight;
                const maxScrollTop = scrollHeight - height;
                content.value.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
            }
        }

        //发送
        const sendMsg = () => {
            let params = {
                oneseif: oneseif.value.phone,
                adverse: adverse.value.phone,
                msg: state.msg
            }
            store.commit('sendMsg', params)
            send.value.focus()
            state.msg = ''
            
            // setTimeout(() => {
            //     toBottom()
            // }, 100)
        }

        const back = () => {
            // router.push('/info')
            router.back()
        }

        //下拉刷新
        const onRefresh = () => {
            setTimeout(() => {
                state.isLoading = false;
            }, 1000);
        }

        watchEffect(() => {
            if(storeHome.value.chatInfo) {
                setTimeout(() => {
                    const scrollHeight = content.value.scrollHeight;
                    const height = content.value.clientHeight;
                    const maxScrollTop = scrollHeight - height;
                    if((maxScrollTop - content.value.scrollTop) <= 200) {
                        toBottom()
                    } else {
                        console.log('提示他下面有新消息！')
                    }
                }, 200)
            }
        })

        return {
            ...toRefs(state),
            back,
            sendMsg,
            send,
            content,
            storeHome,
            onRefresh,
            oneseif,
            adverse,
            user,
            api
        }
    }
}
</script>
