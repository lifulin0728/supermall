// 导出我们的配置
module.exports = {
	configureWebpack: {
		resolve: {
			// alias配置别名
			alias: {
				'assets': '@/assets',
				'common': '@/common',
				'components': '@/components',
				'network': '@/network',
				'views': '@/views',
			}
		}
	}
}