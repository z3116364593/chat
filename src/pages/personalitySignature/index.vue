<template>
    <div class="personality-signature">
        <div class="status_bar" style="background-color: #647D95;"></div>
        <div class="personality-signature-title">
            <van-icon @click="router.push('/info')" name="arrow-left" size="0.52rem" style="color: #7E7E7E;margin-left: -0.16rem;" />
            <p>编辑个签</p>
            <p @click="onPublish" :style="{ background: text === oldText ? '#B3EFFC' : '#05C9F9', transition: 'all .3s' }">发布</p>
        </div>
        <div class="personality-signature-content">
            <textarea @keydown="textChange" v-model="text" cols="30" rows="8" maxlength="80"></textarea>
            <div>
                <div></div>
                <p :style="{ color: text.length === 80 ? '#DB5B76' : '#B1B1B1' }">{{ text.length }}/80</p>
            </div>
        </div>
    </div>
</template>

<script>
import { requestPutPersonalizedSignature } from '../../api/home'
import { reactive, toRefs, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import './css/index.css'
export default {
    setup() {
        const store = useStore()
        const router = useRouter()
        const userInfo = computed(() => store.state.home.userInfo)

        const state = reactive({
            text: '',
            oldText: '',
            isHint: false
        })

        /**
         * @description 个性签名change
         * @returns {void}
         */
        const textChange = () => {
            if(state.isHint) {
                alert('超过字数上线！')
            }
            state.isHint = state.text.length === 80
        }

        /**
         * @description 发布功能
         * @returns {void}
         */
        const onPublish = async () => {
            if(state.text !== state.oldText) {
                let params = {
                    personalizedSignature: state.text,
                    userId: userInfo.value._id
                }
                let response = await requestPutPersonalizedSignature(params)
                if(response.data.type === 'success') {
                    store.commit('setUserInfo')
                    router.push('/info')
                }
            }
        }

        onMounted(() => {
            state.text = userInfo.value.personalizedSignature || ''
            state.oldText = userInfo.value.personalizedSignature || ''
        })

        return {
            ...toRefs(state),
            textChange,
            userInfo,
            onPublish,
            router
        }
    }
}
</script>
