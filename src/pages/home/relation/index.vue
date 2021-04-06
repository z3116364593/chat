<template>
    <div class="relation">
        <div class="search">
            <div>
                <p><van-icon name="search" size="0.38rem" style="margin-top: 0.05rem;" /><span class="search_text">搜索</span></p>
            </div>
        </div>
        <p class="relation_inform">新朋友</p>
        <p class="relation_inform">群通知</p>
        <!-- <van-index-bar>
            <div v-for="(item, index) in storeHome.allUsers" :key="index">
                <van-index-anchor :index="item.title" />
                <ul class="friend-list">
                    <li @click="skipChat(v)" v-for="(v, i) in item.list" :key="index + '-' + i">
                        <img :src="api + '/images/' + v.headPortrait" alt="">
                        <p>{{ v.username }}</p>
                    </li>
                </ul>
            </div>
        </van-index-bar> -->
    </div>
</template>

<script>
import './css/index.css'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { api } from '../../../api/ap'
export default {
    setup() {
        const store = useStore()
        const router = useRouter()
        const storeHome = computed(() => store.state.home)
        const rightLink = computed(() => store.state.home.map(item => item.title))

        const skipChat = (item) => {
            localStorage.setItem('adverse', JSON.stringify(item))
            router.push('/chatInterface')
        }

        return {
            storeHome,
            skipChat,
            api
        }
    }
}
</script>
