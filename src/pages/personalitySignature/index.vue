<template>
    <div class="personality-signature">
        <div class="status_bar" style="background-color: #647D95;"></div>
        <div class="personality-signature-title">
            <van-icon name="arrow-left" size="0.52rem" style="color: #7E7E7E;margin-left: -0.16rem;" />
            <p>编辑个签</p>
            <p :style="{ background: text.length === 0 ? '#B3EFFC' : '#1890ff' }">发布</p>
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
import { reactive, toRefs } from 'vue'
import './css/index.css'
export default {
    setup() {
        const state = reactive({
            text: '',
            isHint: false
        })

        const textChange = () => {
            if(state.isHint) {
                alert('超过字数上线！')
            }
            state.isHint = state.text.length === 80
        }


        return {
            ...toRefs(state),
            textChange
        }
    }
}
</script>
