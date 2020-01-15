<template>
	<div class="goods">
		<goods-list-item v-for="item in goods" :goods-item="item"/>
	</div>
</template>

<script>
	import GoodsListItem from './GoodsListItem'
	export default {
		name: "GoodsList",
		components: {
			GoodsListItem
		},
		props: {
			goods: {
				type: Array,
				dafault() {
					return []
				}
			}
		}
	}
</script>

<style>
	.goods {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>
