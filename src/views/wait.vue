<template>
    <div class="wait">
        页面跳转中，请稍候
    </div>
</template>
<script>
// import { Loading } from 'element-ui'
import store from '../publicJs/store'
import {showmessage,responseBack} from '../publicJs/utils'
import {requestBase,} from '../publicJs/request'
export default {
    data(){
        return{

        }
    },
    mounted(){
        this.login()
    },
    methods:{
        async login(){
            const loading = this.$loading({
                lock: true,
                text: '加速跳转中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0)'
            });
            let responseResult = await requestBase.baseApi('found/user/login','POST',{
                phone: '11111111111',
                password: '123456',
            });
            console.log(responseResult)
            responseBack(this,responseResult,this.getUserInfoSetLocation(responseResult.data));
            console.log(loading)
            setTimeout(() => {
                loading.close();
            }, 1000);
        },
        // 获取用户信息加入缓存和store
        getUserInfoSetLocation(locationStr) {
			return () => {
				let jsonStr = JSON.stringify(locationStr);
				localStorage.setItem('userLoginInfo',jsonStr);
				localStorage.setItem('logininfo',jsonStr);
				store.commit('logininfosave',locationStr);
				// navigator to index
				setTimeout(() => {
					this.$router.push({
						name: 'Home'
					})
				},1000)
			}
		},
    },
}
</script>
<style scoped>
    .wait{
        margin-top: 200px;
        font-size: 24px;
    }
</style>