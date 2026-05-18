const defaults = require('@wordpress/scripts/config/webpack.config')
const path = require('path')

module.exports = {
	...defaults,
	entry: {
		...defaults.entry(),
		main_page: path.resolve(process.cwd(), 'src', 'main-page.tsx'),
		metabox_extra: path.resolve(process.cwd(), 'src', 'metabox-extra.tsx'),
		metabox_temporary: path.resolve(
			process.cwd(),
			'src',
			'metabox-temporary.tsx',
		),
		block_frontend: path.resolve(process.cwd(), 'src', 'block-frontend.tsx'),
	},
	output: {
		filename: '[name].js',
		path: path.resolve(process.cwd(), 'build'),
	},
	module: {
		...defaults.module,
		rules: [
			...defaults.module.rules,
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.json',
							transpileOnly: true,
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: [
			'.ts',
			'.tsx',
			...(defaults.resolve
				? defaults.resolve.extensions || ['.js', '.jsx']
				: []),
		],
	},
}
