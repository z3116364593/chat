<template>
    <div class="info">
        <div class="search">
            <div>
                <p><van-icon name="search" size="0.38rem" style="margin-top: 0.05rem;" /><span class="search_text">搜索</span></p>
            </div>
        </div>
    </div>
</template>

<script>
import './css/index.css'
import { reactive, toRefs, onMounted, computed } from 'vue'
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
export default {
    setup() {
        const router = useRouter()
        const store = useStore()
        const storeHome = computed(() => store.state.home)
        const state = reactive({
            // user: JSON.parse(localStorage.getItem('user'))
        })
        
        const skipChat = (item) => {
            store.commit('setAdverse', item)
            localStorage.setItem('adverse', JSON.stringify(item))
            router.push('/chatInterface')
        }

        return {
            ...toRefs(state),
            storeHome,
            skipChat
        }
    }
}
</script>

<style>

</style>