<template>
	<div class="register">
		<div class="registerview">
			<div v-show="islogin == 'login'">
				<p class="text">
					基坑管理页面
				</p>
				<p class="input_p">
					<el-input class="input_p_input" v-model="login.phone" maxlength="11" 
						placeholder="请输入您的手机号" clearable>
						<i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
					</el-input>
				</p>
				<p class="input_p btten">
					<el-input class="input_p_input" v-model="login.password" 
					placeholder="请输入您的登录密码" show-password>
						<i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
					</el-input>
				</p>
				<!-- <p class="message">
					{{ message }}
				</p> -->
				<p class="input_p nobottom btten">
					<el-button class="loginbtn" type="primary" @click="_loginFromCloud('login')">登录</el-button>
				</p>
				<p class="register_p">
					<span class="register_p_span" @click="changepage('sensorLogin')">读数仪登陆</span>
					<span class="register_p_span" @click="changepage('forgetpassword')">手机号验证码登录</span>
					<span @click="changepage('register')">注册账户</span>
				</p>
			</div>
			<div v-show="islogin == 'sensorLogin'">
				<p class="text">
					读数仪登陆
				</p>
				<p class="input_p">
					<el-input class="input_p_input" v-model="sensorLogin.sensorCode" 
						placeholder="请输入SensorCode" clearable>
						<i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
					</el-input>
				</p>
				<p class="input_p btten">
					<el-input class="input_p_input" v-model="sensorLogin.password" 
					placeholder="请输入您的登录密码" show-password>
						<i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
					</el-input>
				</p>
				<!-- <p class="message">
					{{ message }}
				</p> -->
				<p class="input_p nobottom btten">
					<el-button class="loginbtn" type="primary" @click="_loginFromCloud('sensorLogin')">登录</el-button>
				</p>
				<p class="register_p">
					<span class="register_p_span" @click="changepage('forgetpassword')">手机号验证码登录</span>
					<span @click="changepage('login')">密码登录</span>
				</p>
			</div>
			<!-- 注册 -->
			<div v-show="islogin == 'register'">
				<p class="text">
					注册账号
				</p>
				<p class="input_p">
						<el-input class="input_p_input" v-model="login.phone" 
						placeholder="请输入您的手机号码" maxlength="11" @blur="makeisnum" required clearable>
							<i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
						</el-input>
				</p>
				<p class="input_p">
						<el-input class="input_p_input" v-model="registerinfo.password" 
						placeholder="请输入您的登录密码" show-password>
							<i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
						</el-input>
				</p>	
				<!-- <p class="message">
					{{ message }}
				</p> -->
				<p class="input_p nobottom btten">
					<el-button class="loginbtn" type="primary" @click="_loginFromCloud('register')">注册</el-button>
				</p>
				<p class="register_p" @click="changepage('login')">
					密码登录
				</p>
			</div>

			<!-- 忘记密码 -->
			<div v-show="islogin == 'forgetpassword'">
				<p class="text">
					手机号快捷登录
				</p>
				<p class="input_p">
						<el-input class="input_p_input" v-model="login.phone" maxlength="11"
							placeholder="请输入您的手机号" clearable @blur="getmyquestion">
							<i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
						</el-input>
				</p>
				<p class="input_p codeInputView">
					<el-input class="input_p_input" v-model="forgetpassword.code" 
						placeholder="4位验证码" clearable @input="checkright">
						<i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
					</el-input>
					<el-button
					 	class="codeInputView_btn"
						:disabled="codeIsDisabled"
						@click="getCode">{{codeMessage}}</el-button>
				</p>
				<!-- <p class="message">
					{{ message }}
				</p> -->
				<p class="input_p nobottom btten">
					<el-button class="loginbtn" type="primary" @click="_loginFromCloud('forgetpassword')">登录</el-button>
				</p>
				<p class="register_p">
					<span class="register_p_span" @click="changepage('register')">注册账户</span>
					<span @click="changepage('login')">密码登录</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import store from '../../publicJs/store'
import {showmessage,responseBack} from '../../publicJs/utils'
import {requestBase,} from '../../publicJs/request'
export default {
    data () {
		return {
			loginname: '',
			password: '',
			message: '',
			islogin: 'login', // 是否登录 还是注册
			registerinfo: {
				answer: '',
				question: '',
				email: '',
				phone: '',
			}, // 注册收集信息
			login: {}, // 登录收集信息
			sensorLogin: {}, // 读数仪登陆信息
			forgetpassword: {}, // 忘记密码设置信息
			ischeckright: false, // 核实问题和答案是否相同
			codeMessage: '获取验证码', // code message
			codeIsDisabled: false, // button is disabled
			codeTimer: null, // code use timer
		}
	},
	computed: {
		questionoption () {
			let questionlist = [
				'我的第一所小学是',
				'我的生日是',
				'我是哪一年出生的',
				'我最喜欢的颜色是',
				'我最爱吃的食物是',
				'我最爱的人是',
			]
			return questionlist
		}
	},
	methods: {
		// 登录
		loginadmin () {
			// 提交 登录 或者是注册
			if(this.islogin == 'login') {
				if(!this.login.username || !this.login.password) {
					this.message = '用户名或密码未填写'
				}else {

					if(this.login.username == 'admin' && this.login.password == '123456') {
						let logininfo = {
							username: 'admin',
							role: '1'
						}
						store.commit('logininfosave', logininfo);
						// localStorage.setItem('logininfo', JSON.stringify(logininfo))
						setTimeout (() => {
							this.$router.go(-1);
						}, 1000)
					}
				}
			}else if (this.islogin == 'register') {
				if(!this.registerinfo.username || !this.registerinfo.password) {
					this.message = '用户名或密码未填写'
				}else {
					this.message = ''
					let formdata = new FormData()
					formdata.append('username', this.registerinfo.username)
					formdata.append('password', this.registerinfo.password)
					formdata.append('email', this.registerinfo.email)
					formdata.append('phone', this.registerinfo.phone)
					formdata.append('question', this.registerinfo.question)
					formdata.append('answer', this.registerinfo.answer)
					let lxl = {
						username: this.registerinfo.username,
						password: this.registerinfo.password,
						email: this.registerinfo.email,
						phone: this.registerinfo.phone,
						question: this.registerinfo.question,
						answer: this.registerinfo.answer,
					}
					this.$axios.post('/user/register.do',lxl).then((res) => {
						console.log(res)
						let data = res.data
						if(data.status == 0) {
							this.message =  '注册成功 请您登录'
							this.islogin = 'login'
							this.registerinfo = {}
						}else {
							this.message = data.msg
						}
					})
				}
			}else if (this.islogin == 'forgetpassword') {
				let forgetdata = new FormData()
				forgetdata.append('username', this.forgetpassword.username)
				forgetdata.append('passwordNew', this.forgetpassword.password)
				forgetdata.append('forgetToken', this.forgetpassword.forgetToken)
				this.$axios.post('/user/forget_reset_password.do',forgetdata).then((res) => {
					console.log(res)
					let data = res.data
					if(data.status == 0) {
						this.message =  '密码修改成功 请您登录'
						setTimeout(() => {
							this.islogin = 'login'
						}, 1000);
					}else {
						this.message = data.msg
					}
				})
			}else {
				if(this.sensorLogin.sensorCode == '' || this.sensorCode.password == '') {
					showmessage(this,'读数仪和密码不能为空','warning');
					return
				}
				this.$axios.post('/user/readMeterLogin',{
					sim: this.sensorLogin.sensorCode,
					password: this.sensorLogin.password
				}).then((res) => {
					console.log(res)
					let data = res.data
					if(data.status == 0) {
						this.message =  '登陆成功'
						this.islogin = 'login'
						this.registerinfo = {}
					}else {
						this.message = data.msg
					}
				})
			}
		},
		// 检查是否是手机号格式
		makeisnum () {
			// console.log(event.target.value)
			let val = event.target.value 
			if(!(/^1[34578]\d{9}$/.test(val))) {
				this.message = '手机号格式错误'
			}else {
				this.message = ''
			}
		},
		// 改变 注册还是登录
		changepage (val) {
			this.islogin = val
		},
		// 获取我设置的问题
		getmyquestion () {
			let formdata = new FormData()
			formdata.append('username', this.forgetpassword.username)
			// {
			// 	username: this.forgetpassword.username
			// }
			this.$axios.post('/user/forget_get_question.do', formdata).then((res) => {
				const data = res.data
				if(data.status == 0) {
					this.message = ''
					console.log(data.data)
					this.$set(this.forgetpassword, 'question', data.data)
					// this.forgetpassword.question = data.data
				}else {
					this.message = data.msg
				}
			})
		},
		// 检查答案的正确性
		checkright () {
			if(!this.forgetpassword.question) {
				this.message = '预设问题出错/账号未输入'
			}else {
				let formdata = new FormData()
				formdata.append('username', this.forgetpassword.username)
				formdata.append('question', this.forgetpassword.question)
				formdata.append('answer', this.forgetpassword.answer)
				// {
				// 	username: this.forgetpassword.usernmae,
				// 	question: this.forgetpassword.question,
				// 	answer: this.forgetpassword.answer,
				// }
				this.$axios.post('/user/forget_check_answer.do', formdata).then((res) => {
					const data = res.data
					if(data.status == 0) {
						this.message = ''
						// 揭开按钮和密码输入的封印
						this.ischeckright = true
						this.$set(this.forgetpassword, 'forgetToken', data.data)
						// this.forgetpassword.question = data.data
					}else {
						this.message = data.msg
					}
				})
			}
		},
		// click send code and disable
		getCode() {
			// if button is disabled. return
			if(this.codeIsDisabled) {
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
			// check 
			if(this.login.phone == null || this.forgetpassword.phone == '') {
				showmessage(this,'请输入手机号');
				return;
			}
			// pass check and get from cloud.
			let responseResult = await requestBase.baseApi('found/user/sendMessageCode','GET',{
				phone: this.login.phone
			});
			console.log('get code...')
			console.log(responseResult);
			responseBack(this,responseResult);
		},
		/**
		 * login
		 * type: login type
		 */
		async _loginFromCloud(type) {
			if(type == 'forgetpassword') {
				this.checkAllArguments(this.login.phone,this.forgetpassword.code);
				// login use code.
				let responseResult = await requestBase.baseApi('found/user/smsVerificationLogin','GET',{
					code: this.forgetpassword.code,
					phone: this.login.phone,
				});
				responseBack(this,responseResult,this.getUserInfoSetLocation(responseResult.data));
			}else if(type == 'login') {
				this.checkAllArguments(this.login.phone,this.login.password);
				console.log('登录')
				// console.log({
				// 	password: this.login.password,
				// 	phone: this.login.phone,
				// })
				// login use code.
				let responseResult = await requestBase.baseApi('found/user/login','POST',{
					phone: this.login.phone,
					password: this.login.password,
				});
				console.log(responseResult)
				responseBack(this,responseResult,this.getUserInfoSetLocation(responseResult.data));
			}else if(type == 'register') {
				this.checkAllArguments(this.login.phone,this.registerinfo.password);
				// login use code.
				let responseResult = await requestBase.baseApi('found/user/regist','POST',{
					password: this.registerinfo.password,
					phone: this.login.phone,
				});
				responseBack(this,responseResult);
			}else {
				this.checkAllArguments(this.sensorLogin.sensorCode,this.sensorLogin.password);
				console.log('使用读数仪登录')
				// console.log({
				// 	password: this.login.password,
				// 	phone: this.login.phone,
				// })
				// login use code.
				let responseResult = await requestBase.baseApi('found/factory/readMeterLogin','POST',{
					sim: this.sensorLogin.sensorCode,
					password: this.sensorLogin.password,
				});
				console.log(responseResult)
				if(responseResult.getResponseStatus() == 'success') {
					this.$router.push({
						path: '/read',
						query: {
							sim: this.sensorLogin.sensorCode
						}
					})
				}else {
					showmessage(this,responseResult.msg)
				}
				this.$router.push({
					path: '/read',
					query: {
						sim: this.sensorLogin.sensorCode
					}
				})
			}
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
						name: 'CollectionIndex'
					})
				},1500)
			}
		},
		// check all arguments is not null and empty.
		checkAllArguments() {
			for(var i=0; i<arguments.length; i++){
				if(arguments[i] == null || arguments[i] == '') {
					showmessage(this,'请检查输入项','warning');
					return;
				}
			}
		},
		// make code message
		makeCodeMsg(time) {
			return time + 's后重新获取'
		},
		// test method
		testMethod(sss) {
			return () => {
				console.log(sss);
			}
		},
	},
	watch: {
		loginname (val) {
			if(val && this.password) {
				this.message = ''
			}
		},
		password (val) {
			if(val && this.loginname) {
				this.message = ''
			}
		},
		// 切换注册还是登录状态的时候 进行message置零
		islogin (val) {
			this.message = ''
		},
	}
}
</script>

<style lang="less" scoped>
.register {
    width: 100%;
    min-height: 100vh;
	// background: url(../../assets/backGroupdImage.jpg);
	background-image: linear-gradient(90deg, #409EFF, #67C23A);
	background-repeat: no-repeat;
	background-size: 100% 100%;
    position: relative;
    .registerview {
        position: absolute;
        width: 500px;
        // margin: 0 auto;
        top: 40%;
        left: 50%;
        transform: translate(-50%,-50%);
        .text {
            width: 100%;
            text-align: center;
			font-size: 34px;
			margin-bottom: 30px;
			color: #fff;
        }
        .input_p {
            width: 100%;
            text-align: center;
			// height: 80px;
			box-sizing: border-box;
			padding: 0 10%;
			margin-bottom: 30px;
			.input_p_input {
				width: 100%;
				text-align: left;
			}
		}
		.codeInputView {
			position: relative;
			.codeInputView_btn {
				position: absolute;
				right: 10%;
				top: 50%;
				transform: translateY(-50%);
				cursor: pointer;
				color: #409eff;
			}
		}
				.loginbtn {
					width: 100%;
					cursor: pointer;
				}
				.register_p {
					width: 100%;
					box-sizing: border-box;
					margin: 0;
					padding: 0;
					padding-right: 10%;
					margin-top: 10px;
					text-align: right;
					color: #fff;
					// color: #409EFF;
					cursor: pointer;
					font-size: 20px;
					.register_p_span {
						margin-right: 20px;
					}
				}
				.message {
					text-align: left;
					font-size: 18px;
					width: 100%;
					box-sizing: border-box;
					padding-left: 10%;
					padding-top: 10px;
					color: brown;
				}
    }
}
</style>
<style scoped>
.register>>>.el-input__inner {
	width: 100%;
	height: 40px !important;
	text-align: left !important;
	box-sizing: border-box;
	padding-left: 30px;
}
.register>>>.el-input__suffix {
	width: 100%;
	height: 40px !important;
	text-align: left !important;
	box-sizing: border-box;
	padding-left: 10px;
}
.nobottom {
	padding: 0;
	margin: 0;
}
.btten {
	margin-top: 30px;
}
</style>

