<template>
    <div class="add-friends" :style="{ backgroundImage: `url('${api}/images/1371511736.jpeg')` }">
        <div class="status_bar" style="opacity: 0;"></div>
        <div class="add-friends-top" ref="top">
            <p style="width: 1rem;"><van-icon @click="back" name="arrow-left" size="0.54rem" /></p>
            <div>
                <p @click="setIsWho(true)" :style="{ background: isWho ? '#D0E3EB' : '#F0F7F8', color: isWho ? '#000' : '#588495' }">找人</p>
                <p @click="setIsWho(false)" :style="{ background: isWho ? '#F0F7F8' : '#D0E3EB', color: isWho ? '#588495' : '#000' }">找群</p>
            </div>
            <p style="width: 1rem;"></p>
        </div>
        <div v-show="isWho" class="look-for-someone" id="someone">
            <div>
                <p @click="searchShow">
                    <span><span class="iconfont icon-search1"></span></span>
                    <span style="color: #454948;">手机号/群</span>
                </p>
                <p style="margin-top: 0.2rem;">
                    <span><span style="font-size: 0.44rem;" class="iconfont icon-telephone-fill"></span></span>
                    <span>添加手机联系人</span>
                </p>
                <p>
                    <span><span class="iconfont icon-scan"></span></span>
                    <span>扫一扫添加好友</span>
                </p>
                <p>
                    <span><span class="iconfont icon-wifi"></span></span>
                    <span>面对面加好友</span>
                </p>
                <p>
                    <span><span class="iconfont icon-search1"></span></span>
                    <span>按条件查找陌生人</span>
                </p>
                <p>
                    <span><span class="iconfont icon-wifi"></span></span>
                    <span>扩列匹配</span>
                </p>
                <p>
                    <span><span class="iconfont icon-wifi"></span></span>
                    <span>面对面发起群聊</span>
                </p>
                <p>
                    <span><span style="font-size: 0.54rem;" class="iconfont icon-location"></span></span>
                    <span>查看附近的人</span>
                </p>
            </div>
        </div>
        <Seeker ref="seeker"></Seeker>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../../api/ap'
import './css/index.css'
import Seeker from '../../components/seeker/index.vue'
export default {
    components: {
        Seeker
    },
    setup() {
        const router = useRouter()
        const state = reactive({
            isWho: true,
            api,
            scroll: null,
        })
        const top = ref()
        const seeker = ref()

        const back = () => {
            router.push('/info')
        }

        // 设置 isWho 这个状态
        const setIsWho = (status) => {
            state.isWho = status
        }

        onMounted(() => {
            state.scroll = new IScroll('#someone')
        })

        const searchShow = () => {
            seeker.value.back('show')
        }

        // 组件销毁
        onUnmounted(() => {
            state.scroll.destroy()
            state.scroll = null
        })

        return {
            ...toRefs(state),
            back,
            setIsWho,
            top,
            seeker,
            searchShow
        }
    }
}
</script>
