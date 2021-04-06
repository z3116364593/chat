<template>
    <div>
        <div class="status_bar"></div>
        <div class="login">
            <div>
                <img :src="api + '/images/login_logo.png'" alt="">
                <div>
                    <div class="form-item">
                        <p>PHONE</p>
                        <input v-model="phone" type="text" placeholder="the phone" />
                    </div>
                    <div class="form-item">
                        <p>PASSWORD</p>
                        <input @keydown.enter="login" v-model="password" type="password" placeholder="the password" />
                    </div>
                </div>
            </div>
            <div class="login-footer">
                <van-button @click="login" :loading="loading" loading-text="Sign In" color="var(--color)" class="footer-btn">Sign In</van-button>
                <p>DON'T HAVE AN ACCOUNT? <span @click="toSignUp">SIGN UP</span></p>
            </div>
        </div>
    </div>
</template>

<script>
import './css/index.css'
import { reactive, toRefs, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from "vuex";
import { requestLogin, requestUserinfo } from '../../api/home'
import { api } from '../../api/ap'
export default {
    setup() {
        const router = useRouter()
        const store = useStore()
        const storeHome = computed(() => store.state.home)
        const state = reactive({
            phone: '',
            password: '',
            loading: false,
            status: false
        })

        const myHistory = () => {
            // router.push('/register')
        }

        onMounted(() => {
            // store.commit('isLogin')
            localStorage.clear()
            window.myHistory = myHistory
        })

        //登录
        const login = async () => {
            state.loading = true
            let params = {
                phone: state.phone,
                password: state.password
            }
            let response = await requestLogin(params)
            localStorage.setItem('token', JSON.stringify(params))
            // store.commit('login', params)
            state.loading = false
            if(response.data.type === 'success') {
                localStorage.setItem('connect', response.data.token)
                store.commit('connect', response.data.token)
                let res = await requestUserinfo({ phone: state.phone })
                // console.log(res.data.user)
                localStorage.setItem('userInfo', JSON.stringify(res.data.user))
                router.push('/info')
            }
        }

        //跳转到注册页面
        const toSignUp = () => {
            router.push('/register')
        }

        return {
            ...toRefs(state),
            toSignUp,
            login,
            api
        }
    }
}
</script>
