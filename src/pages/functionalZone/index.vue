<template>
    <div class="functional">
        <div class="functional_zone">
            <!-- <p @touchstart="opacity = '0.5'" @touchmove="opacity = '1'" :style="{ opacity }">今天还没有打卡哦</p> -->
            <p>今天还没有打卡哦</p>
            <van-icon @click.stop="toHome" name="cross" size="0.4rem" />
        </div>
        <div class="functional_personage click_active">
            <div>
                <img :src="api + '/images/' + userInfo.headPortrait" alt="">
            </div>
            <div>
                <div>
                    <p>{{ userInfo.username }}</p>
                    <p class="svip" style="margin-top: 0.1rem">svip9</p>
                </div>
                <div>
                    <p>💎💎💎</p>
                </div>
                <p @click.stop.prevent="toPersonalitySignature" class="click_active"><span class="iconfont icon-edit-fill"></span>{{ userInfo.personalizedSignature || '这家伙懒得筋疼，什么也没有留下。' }}</p>
            </div>
        </div>
        <div class="functional_list">
            <ul>
                <li v-for="(item, index) in functionList" :key="index">
                    <p>
                        <span :class="`iconfont ${ item.icon }`"></span>
                        <span>{{ item.text }}</span>
                    </p>
                    <span class="iconfont icon-ic_page_next"></span>
                </li>
            </ul>
        </div>
        <div class="functional_foot">
            <div>
                <span class="iconfont icon-shezhi"></span>
                <p>设置</p>
            </div>
            <div>
                <span>10°</span>
                <p>海淀</p>
            </div>
        </div>
    </div>
</template>

<script>
import './css/index.css'
import { reactive, toRefs, computed } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../../api/ap'
import { useStore } from "vuex";
export default {
    setup(props, ctx) {
        const store = useStore()
        const router = useRouter()
        const userInfo = computed(() => store.state.home.userInfo)
        const state = reactive({
            functionList: [
                { icon: 'icon-Bookmarkdeleteweb', text: '开播啦鹅' },
                { icon: 'icon-Bookmarkdeleteweb', text: '我的超级会员' },
                { icon: 'icon-Bookmarkdeleteweb', text: '我的钱包' },
                { icon: 'icon-Bookmarkdeleteweb', text: '我的个性装扮' },
                { icon: 'icon-Bookmarkdeleteweb', text: '我的情侣空间' },
                { icon: 'icon-Bookmarkdeleteweb', text: '我的收藏' },
                { icon: 'icon-Bookmarkdeleteweb', text: '我的相册' },
                { icon: 'icon-Bookmarkdeleteweb', text: '我的文件' },
                { icon: 'icon-Bookmarkdeleteweb', text: '我的腾讯文档' },
                { icon: 'icon-Bookmarkdeleteweb', text: '送12个月SVIP' }
            ],
            opacity: 1
        })

        const toHome = () => {
            ctx.emit('toHome')
        }

        const toPersonalitySignature = () => {
            router.push('/personalitySignature')
        }

        return {
            ...toRefs(state),
            api,
            toHome,
            userInfo,
            toPersonalitySignature
        }
    }
}
</script>
