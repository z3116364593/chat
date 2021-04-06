<template>
    <div class="seeker" :style="{ left }">
        <div class="seeker-search">
            <van-icon @click="back('hide')" name="arrow-left" size="0.52rem" style="color: #7E7E7E;" />
            <div>
                <p :style="{ width: closeShow ? '4.66rem' : '5.7rem' }">
                    <span class="iconfont icon-search1" style="color: #A0A6AB;margin-top: 0.05rem;"></span>
                    <input @focus="onFocus" @blur="onBlur" type="text" placeholder="搜索">
                </p>
                <p v-show="closeShow">取消</p>
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
            left: '7.4rem',
            closeShow: false
        })

        const back = (status) => {
            if(status === 'show') {
                state.left = '0'
            } else if(status === 'hide') {
                state.left = '7.4rem'
            }
        }

        const onFocus = () => {
            state.closeShow = true
        }

        const onBlur = () => {
            state.closeShow = false
        }

        return {
            ...toRefs(state),
            back,
            onFocus,
            onBlur
        }
    }
}
</script>
