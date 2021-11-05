<template>
	<div id="page">
		<div id="prompt-wrapper" v-if="triesRemaining">
			<div id="checks">
				<div class="check">
					<input type="checkbox" name="show" id="show">
					<label class="check-label" for="show">show</label>
				</div>
				<div class="check">
					<input type="checkbox" name="save" id="save">
					<label class="check-label" for="save">save</label>
				</div>
			</div>
			<input type="text" name="p" id="search" @keyup.enter="decrypt">
			<p id="remaining" v-text="remaining"></p>
			<br>
		</div>
		<div id="content-wrapper" class="hide"></div>
	</div>
</template>

<script>
import CryptoJS from 'crypto-js'
import FileSaver from 'file-saver'
import e from '@/static/assets/e.json'
export default {
	data() {
		return {
			tries: 0,
			e,
			d: {}
		}
	},
	computed: {
		triesRemaining: function() { return this.tries > 0 },
		remaining: function() {
			if (this.tries > 1) {
				return `${this.tries} tries remaining`
			} else if (this.tries == 1) {
				return "1 try remaining"
			} else if (this.tries <= 0) {
				return "0 tries remaining"
			}
		}
	},
	methods: {
		show: function() {
			let wrapper = document.getElementById("content-wrapper")
			wrapper.innerHTML = this.d.h
			wrapper.classList.remove("hide")
		},
		save: function() {
			let text = new Blob([this.d.t], {type: "text/plain"})
			FileSaver.saveAs(text, "index.txt")
		},
		decrypt: function() {
			let p = document.getElementById("search")
			try {
				let show = document.getElementById("show").checked
				let save = document.getElementById("save").checked
				let prompt = document.getElementById("prompt-wrapper")
				const b = CryptoJS.AES.decrypt(this.e, p.value)
				const d = JSON.parse(b.toString(CryptoJS.enc.Utf8))
				this.d = d
				p.value = ""
				if (show == true) {
					this.show()
					prompt.classList.add("hide")
				}
				if (save == true) {
					this.save()
					prompt.classList.add("hide")
				}
			} catch (error) {
				this.tries--
				localStorage.setItem("t", this.tries)
				p.value = ""
			}
		}
	},
	mounted() {
		let l = localStorage.getItem("t")
		if (l == null) {
			localStorage.setItem("t", 3)
			this.tries = 3
		} else this.tries = l
	}
}
</script>

<style lang="sass">
#page
	@include pageWrapper
	background: #000
	#content-wrapper
	#prompt-wrapper
		margin: 0 auto
		@include flexCenter
		flex-direction: column
		margin-top: calc(5rem + 10vw)
		@media (min-width: 40rem)
			margin-top: calc(15rem + 10vw)
		#search
			width: 100%
			color: black
			max-width: 23rem
			padding: 0.5rem
			font-size: 3rem
			line-height: 3rem
			border-radius: 0.5rem
		#remaining
			padding: 0.5rem
		#checks
			width: 17rem
			@include flexCenter
			.check
				flex: 1
				@include flexCenter
				#show, #save
					padding: 0.25rem
				.check-label
					padding: 0.5rem
</style>
