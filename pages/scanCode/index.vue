<template>
	<view class="sancode_style">
		<button type="default" @click="scanCode">点击扫描条形码</button>
		<view class="goods_detail" v-for="item in goodsInfo" :key="item.sku.id">
				<view class="goods_style">
					<text class="goods_title">{{item.sku.extend_info_flipos_spec_name}}</text>
				</view>
				<view class="goods_style">
					  <label>商家编码</label>：<text>{{item.sku.spec_no_harmay2}}</text>
				</view>
				<view class="goods_style">
					  <label>条码</label>：<text>{{scaninfo.result}}</text>
				</view>
				<view class="goods_style">
					  <label>品牌</label>：<text>{{item.sku.spu.brand.name}}</text>
				</view>
				<view class="goods_style">
					  <label>分类</label>：<text>{{item.sku.spu.class_name}}</text>
				</view>
				<view class="goods_style">
					  <label>货品名称</label>：<text>{{item.sku.spu.spu_desc.name}}</text>
				</view>
		      	<view class="goods_style">
					  <label>规格名称</label>：<text>{{item.sku.sku_desc.name_spec}}</text>
				</view>
				<view class="goods_style">
					  <label>零售价</label>：<text>{{item.sku.sku_price.retail}} 元</text>
				</view>
				<view class="goods_style">
					  <label>市场价</label>：<text>{{item.sku.sku_price.market}} 元</text>
				</view>
		</view>
	</view>
</template>

<script>
	import scanCodeApi from '../../request/scancode.js'
export default {
  data() {
  	return {
  		scaninfo: {},
		goodsInfo:[]
  	}
  },
  onLoad() {
	  // 隐藏回到首页按钮
	  uni.hideHomeButton()
	  // 隐藏回到首页按钮
      // if(wx.hideHomeButton){  
      //     wx.hideHomeButton();  
      // }  
  },
  methods: {
	  scanCode() {
		  this.scaninfo={};
		  this.goodsInfo=[];
		 uni.scanCode({
			  success:(res)=> {
				   this.scaninfo=res;
				   if(res.result){//res.result
				   // '0016429'||
					   this.getGoodsInfo(res.result);
				   }
			  },
			  fail() {
			  	 uni.showToast({
					 icon:'none',
					 title:'扫码失败'
				 })
			  }
		  });
	  },
	  //获取商品信息
	  getGoodsInfo(code) {
		  scanCodeApi.getGoodsDetail({code}).then((info)=>{
		   if(info.barcodes.length){
			   this.goodsInfo=info.barcodes;
		   }else{
			   // uni.showToast({
					 // icon:'none',
					 // title:'信息获取失败'
			   // })
			   uni.showModal({
			       title: '提示',
			       content: '信息获取失败！',
				   showCancel:false,
			       success: function (res) {
			           if (res.confirm) {
			           } else if (res.cancel) {
			           }
			       }
			   });
		   }
		   }).catch((err)=>{
			   console.log(err)
			   uni.showToast({
				         icon:'none',
						 title:'信息获取失败'
			   })
		   })
	  }
  }
 
 }
</script>
<style>
	.goods_title{
		display: block;
		margin-bottom: 20rpx;
		font-size: 40rpx;
		color: #666; 
	}
	.sancode_style{
		padding:20rpx 40rpx;
		margin-top:30rpx;
		color: #eee;
	}
	.goods_detail{
		margin-top:40rpx;
		margin-bottom:50rpx;
	}
	.goods_detail .goods_style{
		line-height: 60rpx;
		font-size: 35rpx;
		color:#999;
	}
</style>
