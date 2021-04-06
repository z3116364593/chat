<template>
    <transition name="fade" mode="out-in" appear>
        <div v-if="show" @click="close" class="more_bg"></div>
    </transition>
    <transition name="more" mode="out-in" appear>
        <div v-if="show" class="more">
            <div @click="onClick(item)" v-for="(item, index) in list" :key="index">
                <p><span :class="item.icon"></span></p>
                <span>{{ item.name }}</span>
            </div>
            <span class="more-triangle"></span>
        </div>
    </transition>
</template>

<script>
import { reactive, toRefs, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import './css/index.css'
export default {
    props: ['show'],
    setup(props, ctx) {
        const router = useRouter()
        const state = reactive({
            list: [
                { icon: 'iconfont icon-saoyisao', name: '创建群聊' },
                { icon: 'iconfont icon-saoyisao', name: '加好友/群' },
                { icon: 'iconfont icon-saoyisao', name: '匹配聊天' },
                { icon: 'iconfont icon-saoyisao', name: '一起排队' },
                { icon: 'iconfont icon-saoyisao', name: '扫一扫' },
                { icon: 'iconfont icon-saoyisao', name: '面对面快传' },
                { icon: 'iconfont icon-saoyisao', name: '首付款' }
            ],
            isHide: false,
            isShow: false
        })

        const close = () => {
            ctx.emit('close')
        }

        watchEffect(() => {
            if(props.show) {
                state.isHide = true
                setTimeout(() => {
                    state.isShow = true
                })
            } else {
                state.isShow = false
                setTimeout(() => {
                    state.isHide = false
                }, 400)
            }
        })

        const onClick = (item) => {
            switch(item.name) {
                case '加好友/群' :{
                    router.push('/addFriends')
                    ctx.emit('close')
                    break
                }
            }
        }

        return {
            ...toRefs(state),
            close,
            onClick
        }
    }
}
</script>
