<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav"/>
		<scroll class="content" ref="scroll">
			<detail-swiper :top-images="topImages"/>
			<detail-base-info :goods="goods"/>
			<detail-shop-info :shop="shop"/>
			<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
		</scroll>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper'
	import DetailBaseInfo from './childComps/DetailBaseInfo'
	import DetailShopInfo from './childComps/DetailShopInfo'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo'
	
	import Scroll from 'components/common/scroll/Scroll'
	
	import {getDetail, Goods, Shop} from 'network/detail'
	
	export default {
		name: "Detail",
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			Scroll
		},
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {}
			}
		},
		created() {
			// 1.保存传入的iid
			this.iid = this.$route.params.iid
			
			// 2.根据iid请求详情数据
			getDetail(this.iid).then(res => {
				// 1.获取顶部的图片轮播数据
				console.log(res);
				const data = res.result;
				this.topImages = data.itemInfo.topImages
				
				// 2.获取商品信息
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
				
				// 3.获取店铺信息
				this.shop = new Shop(data.shopInfo)
				
				// 4.保存商品的详细数据
				this.detailInfo = data.detailInfo
			})
		},
		methods: {
			imageLoad() {
				this.$refs.scroll.refresh();
			}
		}
	}
</script>

<style scoped>
	#detail {
		position: relative;
		z-index: 9;
		background-color: #fff;
		height: 100vh;
		overflow: hidden;
	}
	
	.detail-nav {
		position: relative;
		z-index: 9;
		background-color: #fff;
	}
	
	.content {
		height: calc(100% - 44px);
	}
</style>
