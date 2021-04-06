<template>
    <div>
        <div class="status_bar"></div>
        <div class="register">
            <div>
                <van-icon @click="close" name="cross" class="close" style="position: absolute;left: 0.32rem;top: 0.65rem;" />
                <p class="register-title">Sign up</p>
                <div class="head-portrait">
                    <img v-if="url === ''" :src="api + '/images/default_avatar.jpg'" alt="">
                    <img v-else :src="api + '/images/' + url" alt="">
                    <p>
                        <van-button color="var(--color)" icon="plus" type="primary" class="register-upload" />
                        <van-uploader :after-read="afterRead" class="register-hide" />
                    </p>
                </div>
                <div>
                    <div class="form-item">
                        <p>USERNAME</p>
                        <input v-model="username" type="text" placeholder="the user name" />
                    </div>
                    <div class="form-item">
                        <p>PASSWORD</p>
                        <input v-model="password" type="password" placeholder="the password" />
                    </div>
                    <div class="form-item">
                        <p>PHONE</p>
                        <input v-model="phone" type="text" placeholder="the phone" />
                    </div>
                    <div class="form-item">
                        <p>EMALL</p>
                        <input type="email" placeholder="email address" />
                    </div>
                </div>
            </div>
            <div class="register-footer">
                <van-button @click="register" :loading="loading" loading-text="Create" color="var(--color)" class="footer-btn">Create</van-button>
                <p>ALREADY HAVE AN ACCOUNT? <span @click="close">SIGN IN</span></p>
            </div>
        </div>
    </div>
</template>

<script>
import './css/index.css'
import { requestUploadi, requestRegister } from '../../api/home'
import { reactive, toRefs, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
import { useStore } from "vuex";
import { api } from '../../api/ap'
import moment from 'moment'
export default {
    setup() {
        const router = useRouter()
        const store = useStore()
        const storeHome = computed(() => store.state.home)
        const state = reactive({
            username: '',
            password: '',
            phone: '',
            loading: false,
            url: ''
        })
        onMounted(() => {
            store.commit('getUsers')
        })

        const afterRead = async (file) => {
            let params = new FormData()
            params.append('file', file.file)
            let response = await requestUploadi(params)
            state.url = response.data.path
        }

        //注册
        const register = async () => {
            state.loading = true
            let params = {
                username: state.username, // 用户名
                password: state.password, // 密码
                phone: state.phone, // 手机号
                headPortrait: state.url, // 头像地址
                sex: '男', // 性别
                birthday: moment().format('YYYY-MM-DD') // 生日
            }
            let response = await requestRegister(params)
            if(response.data.type === 'success') {
                router.push('/login')
            }
            state.loading = false
            // store.commit('addUser', params)
        }

        //跳转到login
        const close = () => {
            router.push('/login')
        }

        return {
            ...toRefs(state),
            close,
            register,
            storeHome,
            afterRead,
            api
        }
    }
}
</script>
