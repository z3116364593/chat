<template>
    <!-- <transition name="right" mode="out-in">
      <router-view></router-view>
    </transition> -->
    <router-view v-slot="{ Component }">
      <transition :name="direction">
        <component :is="Component" />
      </transition>
    </router-view>
</template>

<script>
import { onMounted, reactive, watchEffect, toRefs } from 'vue'
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      method: '',
      direction: 'left'
    })

    onMounted(() => {
      store.commit('getUsers')
      // store.commit('isLogin')
      store.commit('getMsg')

      let id = localStorage.getItem('connect')
      if(id) store.commit('connect', id)

      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if(userInfo) {
        store.commit('setUserInfo', userInfo)
      }
    })

    watchEffect(() => {
      let path = router.currentRoute.value.path
      switch(path) {
        case '/info': {
          state.direction = 'left'
          break
        }
        case '/addFriends': {
          state.direction = 'right'
          break
        }
        case '/personalitySignature': {
          state.direction = 'right'
          break
        }
        default: {
          state.direction = ''
          break
        }
      }
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style>
@import 'vant/lib/index.css';

.right-enter-active, .right-leave-active {
  transition: all 0.3s;
}

.right-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.right-enter-from {
  transform: translate3d(100%, 0, 0);
}



.left-enter-active, .left-leave-active {
  transition: all 0.3s;
}

.left-leave-to {
  transform: translate3d(100%, 0, 0);
}

.left-enter-from {
  transform: translate3d(-100%, 0, 0);
}
</style>
