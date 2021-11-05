<template>
	<div>
		<nuxt />
	</div>
</template>

<script>
export default {
	transition: {
		name: 'fade',
		duration: 200
	},
	head() { return { title: '.' } }
}
</script>


<style lang="sass">
@keyframes fadeIn
	from
		opacity: 0
	to
		opacity: 1
.hide
	display: none !important
@font-face
	font-style: normal
	font-weight: normal
	font-family: 'Open Sans'
	src: url('../static/assets/fonts/OpenSans-Regular.ttf') format('truetype')
html
	font-size: 14px
	background: #000
	box-sizing: border-box
	-ms-text-size-adjust: 100%
	-webkit-text-size-adjust: 100%
	-moz-osx-font-smoothing: grayscale
	-webkit-font-smoothing: antialiased
	font-family: 'Open Sans', 'Roboto', sans-serif
*,
*:before,
*:after
	margin: 0
	padding: 0
	color: white
	font-size: 14px
	line-height: 1.1rem
	box-sizing: border-box
.page-enter-active, .page-leave-active
  transition: opacity 0.2s
.page-enter, .page-leave-to
  opacity: 0
  transition: opacity 0.2s
.fade-in
	animation: fadeIn 0.2s ease-in-out
</style>
