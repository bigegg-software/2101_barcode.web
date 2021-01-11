<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<text class="title">{{title}}</text>
		<view class="text-area">
			<view class="input_box">
				<input class="input_style" type="text" v-model="user.username" placeholder="请输入账号" />
				<input class="input_style" password v-model="user.password"  type="text" placeholder="请输入密码" />
			</view>
			<button class="submit" type="primary" @click="submit">登录</button>
		</view>
	</view>
</template>

<script>
	import userApi from '../../request/user.js'
	export default {
		data() {
			return {
				title: '话梅',
				user:{
					username:'',
					password:''
				}
			}
		},
		onLoad() {
         this.validateLogin();
		},
		methods: {
			validateLogin(){
				 uni.getStorage({
				 	key:'userInfo',
				 	success:async function(res){
				 		// res.data.sessionToken
				 	userApi.currentUser().then((res)=>{
				 		res=JSON.parse(JSON.stringify(res));
				 			if(res.sessionToken){
				 			uni.reLaunch({
				 					url: '/pages/scanCode/index'
				 				})
				 			}
				 		}).catch((err)=>{
				 		})
				 	},
				 	fail(err) {
				 	}
				 })
			},
            async submit() {
				if(this.user.username==''){
					  uni.showToast({
					  	title:'请输入用户名',
					  	icon:'none'
					  })
					  return;
				}else if(this.user.password==''){
						  uni.showToast({
						  	title:'请输入密码',
						  	icon:'none'
						  })
						  return;
					}
				     userApi.logIn(this.user).then((user)=>{
					   user=JSON.parse(JSON.stringify(user));
					   if(user&&user.objectId){
							  uni.showToast({
								title:'登录成功！',
								icon:'success',
								success() {
									 uni.setStorage({
										key:'userInfo',
										data: user,
										success:function() {
											uni.reLaunch({
												url: '/pages/scanCode/index'
											 })
										}
									 })
									 
								}
							  })
					   }
				   }).catch((err)=>{
					   uni.showToast({
					   	title:'用户名或密码错误',
					   	icon:'none'
					   })
				   });
				   
					
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		width: 80%;
		margin-top:60rpx;
	}
	.input_box{
		
	}
    .input_style{
		display: block;
		margin-top:30rpx;
		border-bottom:1rpx solid #eee;
		line-height: 100rpx;
		height: 100rpx;
	}
	.title {
		margin-top: 220rpx;
		font-size: 36rpx;
		color: #8f8f94;
	}
	.submit{
		font-size:40rpx;
		margin-top:80rpx;
	}
</style>
