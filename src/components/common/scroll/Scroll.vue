<template>
	<!-- 1.ref如果是绑定在组件中的，那么通过this.$refs.refname获取到的是一个组件对象
	     2.ref如果是绑定在普通的元素中，那么通过this.$refs.refname获取的是一个元素对象-->
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		name: "Scroll",
		props: {
			probeType: {
				type: Number,
				default: 0
			},
			pullUpLoad: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				scroll: null
			}
		},
		mounted() {
			// 1.创建Bscroll对象
			this.scroll = new BScroll(this.$refs.wrapper, {
				click: true,
				probeType: this.probeType,
				pullUpLoad: this.pullUpLoad
			})
			
			// 2.监听我们滚动的位置
			if (this.probeType === 2 || this.probeType === 3) {
				this.scroll.on('scroll', (position) => {
					this.$emit("scroll", position);
				})
			}
			
			// 3.监听scroll滚动到底部
			if (this.pullUpLoad) {
				this.scroll.on('pullingUp', () => {
					this.$emit("pullingUp")
				})
			}
		},
		methods: {
			scrollTo(x, y, time=300) {
				this.scroll && this.scroll.scrollTo(x, y, time);
			},
			refresh() {
				this.scroll && this.scroll.refresh();
			},
			finishPullUp() {
				this.scroll && this.scroll.finishPullUp()
			},
			getScrollY() {
				return this.scroll ? this.scroll.y : 0
			}
		}
	}
</script>

<style scoped>
	
</style>
