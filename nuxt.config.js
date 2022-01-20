export default {
	target: 'static',
	loading: { color: '#fff' },
	generate: { routes: ["/"] },
	axios: { baseURL: '/' },
  modules: [
		'@nuxtjs/axios',
		'@nuxtjs/style-resources'
	],
  styleResources: { sass: [ './assets/*.sass' ] },
  build: {
    extend (config, ctx) {},
    build: {
      postcss: {
        plugins: {
          'postcss-url': false,
          'postcss-nested': {},
          'postcss-responsive-type': {},
          'postcss-hexrgba': {}
        },
        preset: { autoprefixer: { grid: true } }
      }
    }
  }
}
