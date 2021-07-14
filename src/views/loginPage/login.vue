<template>
    <div class="login">
        <p class="title">基坑管理页面</p>
        <div class="loginBox">
            <div class="topHr"></div>
            <div class="loginContent">
                <div class="toggleLogin">
                    <div class="toggleLoginItem" :class="loginWay != 'sensor' ? 'toggleLoginItem_active' : ''" @click="toggleWay('password')">
                        用户登录
                    </div>
                    <div class="toggleLoginItem" :class="loginWay == 'sensor' ? 'toggleLoginItem_active' : ''" @click="toggleWay('sensor')">
                        读数仪登录
                    </div>
                </div>
                <div class="sersorLogin" v-show="loginWay == 'sensor'">
                    <el-input placeholder="请输入sensorCode" v-model="sensorLogin.sensorCode" clearable>
                        <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                    </el-input>
                    <el-input placeholder="请输入密码"  v-model="sensorLogin.password" show-password>
                        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                    </el-input>
                    <el-button @click="_login()">登录</el-button>
                </div>
                <div class="passwordLogin" v-show="loginWay == 'password'">
                    <el-input placeholder="请输入手机号" v-model="passwordLogin.phone" clearable>
                        <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
                    </el-input>
                    <el-input placeholder="请输入密码"  v-model="passwordLogin.password" show-password>
                        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                    </el-input>
                    <el-button @click="_login()">登录</el-button>
                </div>
                <div class="phoneLogin" v-show="loginWay == 'phone'">
                    <el-input placeholder="请输入手机号" v-model="phoneLogin.phone" clearable>
                        <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
                    </el-input>
                    <div class="verificationCode">
                        <el-input placeholder="请输入验证码"  v-model="phoneLogin.code" show-password>
                            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                        </el-input>
                        <el-button :disabled="codeIsDisabled" @click="getCode">{{codeMessage}}</el-button>
                    </div>
                    
                    <el-button @click="_login()">登录</el-button>
                </div>
                <div class="register" v-show="loginWay == 'register'">
                    <el-input placeholder="请输入手机号" v-model="registerInfo.phone" clearable>
                        <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
                    </el-input>
                    <el-input placeholder="请输入密码"  v-model="registerInfo.password" show-password>
                        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                    </el-input>
                    <el-button @click="_login()">注册</el-button>
                </div>
                <div class="toggleUserLogin" v-show="loginWay != 'sensor'">
                    <div @click="toggleWay('phone')" v-if="loginWay != 'phone'">手机号验证码登录</div>
                    <div @click="toggleWay('password')" v-if="loginWay != 'password'">密码登录</div>
                    <div @click="toggleWay('register')" v-if="loginWay != 'register'">注册账号</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import store from '../../publicJs/store'
import {showmessage,responseBack} from '../../publicJs/utils'
import {requestBase,} from '../../publicJs/request'
export default {
    data(){
        return{
            loginWay:'password',
            sensorLogin:{
                sensorCode:'',  //读数仪code
                password:''
            },
            passwordLogin:{
                phone:'',
                password:''
            },
            phoneLogin:{
                phone:'',
                code:''
            },
            registerInfo:{
                phone:'',
                password:''
            },
            codeMessage: '获取验证码', // code message
			codeIsDisabled: false, // button is disabled
        }
    },
    mounted(){
        let loginWay = this.$route.query.loginWay
        if(loginWay){
            this.loginWay = loginWay
        }
    },
    methods:{
        toggleWay(val){
            this.loginWay = val
        },
        // 登录
        async _login(){
            // this.isEmpty()
            let loginWay = this.loginWay 
            if(loginWay == 'password'){
                if(this.passwordLogin.phone == '' || this.passwordLogin.password == ''){
                    this.$message.warning('请检查输入项')
                    return
                }
                let responseResult = await requestBase.baseApi('found/user/login','POST',{
					phone: this.passwordLogin.phone,
					password: this.passwordLogin.password,
				});
				console.log(responseResult)
				responseBack(this,responseResult,this.getUserInfoSetLocation(responseResult.data));
            }else if(loginWay == 'phone'){
                if(this.phoneLogin.code == '' || this.phoneLogin.phone == ''){
                    this.$message.warning('请检查输入项')
                    return
                }
                let responseResult = await requestBase.baseApi('found/user/smsVerificationLogin','GET',{
					code: this.phoneLogin.code,
					phone: this.phoneLogin.phone,
				});
				responseBack(this,responseResult,this.getUserInfoSetLocation(responseResult.data));
            }else if(loginWay == 'register'){
                if(this.registerInfo.phone == '' || this.registerInfo.password == ''){
                    this.$message.warning('请检查输入项')
                    return
                }
                let reg = /^1[3456789]\d{9}$/
                console.log(reg.test(this.registerInfo.phone))
                if(!reg.test(this.registerInfo.phone)){
                    this.$message.error('手机号格式错误，请重试')
                    return
                }
                let responseResult = await requestBase.baseApi('found/user/regist','POST',{
					password: this.registerInfo.password,
					phone: this.registerInfo.phone,
                });
                console.log(responseResult)
                if(responseResult.responseStatus == 'success'){
                    this.$message.success('注册成功，请登录')
                }
				responseBack(this,responseResult);
            }else if(loginWay == 'sensor'){
                if(this.sensorLogin.sensorCode == '' || this.sensorLogin.password == ''){
                    this.$message.warning('请检查输入项')
                    return
                }
                let responseResult = await requestBase.baseApi('found/factory/readMeterLogin','POST',{
					sim: this.sensorLogin.sensorCode,
					password: this.sensorLogin.password,
				});
				console.log(responseResult)
				if(responseResult.getResponseStatus() == 'success') {
					this.$router.push({
						path: '/read',
						query: {
                            sim: this.sensorLogin.sensorCode,
                            id:responseResult.data.id
						}
					})
				}else {
					showmessage(this,responseResult.msg)
				}
				this.$router.push({
					path: '/read',
					query: {
                        sim: this.sensorLogin.sensorCode,
                        id:responseResult.data.id
					}
				})
            }
        },
        checkAllArguments() {
			for(var i=0; i<arguments.length; i++){
				if(arguments[i] == null || arguments[i] == '') {
					showmessage(this,'请检查输入项','warning');
					return;
				}
			}
		},
        // 判断所有的方式下输入框是否为空
        isEmpty(){
            let loginWay = this.loginWay
            if(loginWay == 'password'){
                if(this.passwordLogin.phone == null || this.passwordLogin.phone == ''){
                    this.$message.warning('请输入手机号')
                    return
                }
                if(this.passwordLogin.password == null || this.passwordLogin.password == ''){
                    this.$message.warning('请输入密码')
                    return
                }
            }else if(loginWay == 'phone'){
                if(this.phoneLogin.phone == null || this.phoneLogin.phone == ''){
                    this.$message.warning('请输入手机号')
                    return
                }
                if(this.phoneLogin.password == null || this.phoneLogin.password == ''){
                    this.$message.warning('请输入密码')
                    return
                }
            }else if(loginWay == 'register'){
                if(this.registerInfo.phone == null || this.registerInfo.phone == ''){
                    this.$message.warning('请输入手机号')
                    return
                }
                if(this.registerInfo.password == null || this.registerInfo.password == ''){
                    this.$message.warning('请输入密码')
                    return
                }
            }else if(loginWay == 'sensor'){
                if(this.sensorLogin.sensorCode == null || this.sensorLogin.sensorCode == ''){
                    this.$message.warning('请输入sensorCode')
                    return
                }
                if(this.sensorLogin.password == null || this.sensorLogin.password == ''){
                    this.$message.warning('请输入密码')
                    return
                }
            }
        },
        // 获取验证码
        getCode(){
            if(this.codeIsDisabled) {
				return;
            }
            // check 
			if(this.phoneLogin.phone == null || this.phoneLogin.phone == '') {
				showmessage(this,'请输入手机号');
				return;
			}
            this._getCodeFromCloud();
			// not disabled
			let timeTotal = 30;
			this.codeTimer = setInterval(() => {
				timeTotal--;
				this.codeMessage = this.makeCodeMsg(timeTotal);
				this.codeIsDisabled = true;
				// if total is reduce 0. set code is disabled is false
				if(timeTotal <= 0) {
					// set default.
					this.codeMessage = '获取验证码';
					this.codeIsDisabled = false;
					clearInterval(this.codeTimer);
					this.codeTimer = null;
				}
			},1000)
        },
        // get code from cloud
		async _getCodeFromCloud() {
			// pass check and get from cloud.
			let responseResult = await requestBase.baseApi('found/user/sendMessageCode','GET',{
				phone: this.phoneLogin.phone
			});
			console.log('get code...')
			console.log(responseResult);
			responseBack(this,responseResult);
        },
        // make code message
		makeCodeMsg(time) {
			return time + 's后重新获取'
        },
        // get userInfo and set localStroage
		getUserInfoSetLocation(locationStr) {
			return () => {
				let jsonStr = JSON.stringify(locationStr);
				localStorage.setItem('userLoginInfo',jsonStr);
				localStorage.setItem('logininfo',jsonStr);
				store.commit('logininfosave',locationStr);
				// navigator to index
				setTimeout(() => {
					this.$router.push({
						// name: 'CollectionIndex'
						name: 'Home'
					})
				},500)
			}
		},
    }
}
</script>
<style scoped>
    .login{
        width: 100%;
        min-height: 100vh;
        background-image: linear-gradient(90deg, #409EFF, #67C23A);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .title{
        width: 100%;
        font-size: 34px;
        /* margin-bottom: 30px; */
        color: #fff;
        position: absolute;
        top: 16%;
    }
    .loginBox{
        width: 450px;
        height: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        background: #fff;
        transform: translate(-50%,-50%);
    }
    .loginBox .topHr{
        width: 100%;
        height: 10px;
        background: #295197;
    }
    .loginBox .loginContent{
        padding: 0 40px;
    }
    .loginContent .toggleLogin{
        display: flex;
        margin-top: 30px;
        justify-content: space-around;
        margin-bottom: 30px;
    }
    .toggleLoginItem{
        color: #dcdcdc;
        flex: 1;
        font-size: 16px;
        padding-bottom: 10px;
        border-bottom:2px solid #dcdcdc;
        cursor: pointer;
    }
    .toggleLoginItem_active{
        border-bottom:2px solid #454f68;
        color: #000;
        
    }
    .verificationCode .el-button{
        position: absolute;
        right: 0;
        top: 6px;
        width: 130px;
        height: 40px;
        color: #409eff;
        margin-top: 0;
        background: #fff;
    }
    .el-input{
        margin-bottom: 20px;
    }
    .el-button{
        width: 250px;
        height: 44px;
        color: #fff;
        margin-top: 20px;
        background: #2e558e;
    }
    .toggleUserLogin{
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
    }
    .toggleUserLogin div{
        color: #000;
        cursor: pointer;
        font-size: 16px;
    }
    .verificationCode{
        width: 100%;
        position: relative;
    }
    
</style>