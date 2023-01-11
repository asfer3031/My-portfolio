<script>
	/**
	 * @type {number}
	 */
	let scrollpos = 320;
	import Linkedin from '$lib/assets/images/linkedin-brands.svg';
	import Github from '$lib/assets/images/github-brands (1).svg';
	import Facebook from '$lib/assets/images/facebook-brands (1).svg';
	import Bottunimage from '$lib/assets/images/download.png';
	import Button from '$lib/assets/images/close-window-64.png';
	import { showUl } from '$lib/Javascript/store.js';
	import { createEventDispatcher } from 'svelte';
	import { slide, fade, fly } from 'svelte/transition';
	let textcheck = '';

	const dispatch = createEventDispatcher();

	function toggleUl() {
		showUl.update((showUl) => (showUl = false));
	}

	/**
	 * @type {any}
	 */
	let inputval;

	function sendInputvalue() {
		if (inputval) {
			dispatch('message', {
				text: inputval
			});
			textcheck = '';
		} else {
			textcheck = '!Oops... search field is empty.';
		}
	}

	function setinputVal() {
		textcheck = '';
	}
</script>

<svelte:window bind:scrollY={scrollpos} on:click={setinputVal} />

<main>
	<header class="header">
		<div class="first">
			<div class="Title">
				<h4><span class="Big-P">P</span>icture Fetcher</h4>
			</div>

			<div class="a-button">
				<a href="/Projects" on:click={toggleUl}>
					<img src={Button} alt="" />
				</a>
			</div>
		</div>

		<div class="content">
			<p style="background-color: transparent; font-size:1rem">
				{textcheck}
			</p>
			<form action="" on:submit|preventDefault={sendInputvalue}>
				<input
					type="text"
					placeholder="Search Images..."
					bind:value={inputval}
					spellcheck="true"
					on:cancel={() => {
						alert('oops');
					}}
				/>
				<button class="btn" type="submit">
					<img src={Bottunimage} alt="bottun" />
				</button>
			</form>
			<p>
				Search high quality photos from <a
					style="text-decoration: none; color:#668cff"
					href="https://unsplash.com/">Unsplash.com</a
				> free Api.
			</p>
		</div>
	</header>
</main>

<style>
	@font-face {
		font-family: 'roboto';
		src: url(/src/lib/assets/fonts/roboto/Roboto-Black.ttf);
	}
	@font-face {
		font-family: 'roboto-slab';
		src: url(/src/lib/assets/fonts/roboto-slab/RobotoSlab-VariableFont_wght.ttf);
	}
	@font-face {
		font-family: 'open-sans';
		src: url(/src/lib/assets/fonts/open-sans/OpenSans-VariableFont_wdth\,wght.ttf);
	}

	.btn {
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
		width: 50px;
		border: 0;
		padding: 0;
		margin: 0;
		box-shadow: 0;
		cursor: pointer;
		background-color: #5556;
	}
	.btn:hover {
		background-color: #555;
	}
	.btn > img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		object-position: center;
		background-color: fff3;
	}
	.content {
		height: 400px;
		width: 50%;
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		margin: auto auto;
		justify-content: center;
		align-items: center;
	}

	form {
		width: 100%;
		padding: 0;
		margin: 0;
		height: 50px;
		position: relative;
	}

	input {
		width: 100%;
		height: 100%;
		border-radius: 6px 0 0 6px;
		border: 0;
		margin: 0;
		box-shadow: none;
		padding: 0;
	}
	input::placeholder {
		text-align: center;
	}

	input[type='text'] {
		width: 100%;
		padding: 12px 20px;
		box-sizing: border-box;
	}

	.content > p {
		font-size: 1rem;
		font-family: 'roboto-slab', 'sanserif';
		padding: 0;
		margin: 1rem;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.158);
	}

	.header {
		min-height: 550px;
		max-height: auto;
		width: 100%;
		background-size: cover;
		background-position: bottom;
		background-repeat: no-repeat;
		box-sizing: border-box;
		background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.486), rgba(0, 0, 0, 0.363)),
			url(/src/lib/assets/images/wallpaper.jpg);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.first {
		display: grid;
		grid-template-columns: 3.5fr 0.5fr;
		width: 100%;
		height: 65px;
		box-sizing: border-box;
		padding: 1rem;
		background-color: rgba(255, 255, 255, 0.185);
		border-bottom: 0.5px solid #333;
	}
	.first > div:nth-child(1) {
		height: 100%;
		display: grid;
		place-content: center;
	}

	.first > div:nth-child(2) {
		display: grid;
		place-content: center;
	}

	.a-button {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
	}

	.a-button > a {
		margin: 0;
		padding: 0;
		height: 2rem;
		width: 2rem;
		cursor: pointer;
		/* background-color: #fff; */
		border-radius: 6px;
		text-decoration: none;
		box-shadow: 0;
		border: 0;
	}

	.a-button > a > img {
		height: 100%;
		width: 100%;
		margin: 0;
		padding: 0;
		border-radius: 6px;
		border: 0;
	}

	.a-button > a:hover {
		opacity: 0.9;
		background-color: #fff;
		border-radius: 6px;
	}

	.Title {
		margin: 0;
		padding: 0;
		display: grid;
		place-content: center;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
	}

	.Big-P {
		font-size: 2rem;
		width: 1.5rem;
		text-shadow: none;
		background-image: linear-gradient(to bottom, #6b5551, #5c4c58);
		margin: 0;
		padding: 5px;
		color: #fff;
		border-radius: 6px;
		box-sizing: border-box;
	}

	.Title > h4 {
		color: #fff;
		margin: 0;
		padding: 0;
		text-shadow: 1px 1px #003b4f;
		text-align: left;
	}

	@media all and (max-width: 720px) {
		.header {
			display: grid;
			place-content: center;
		}
		.header > div:nth-child(2) {
			display: grid;
			place-content: center;
		}

		.header > div:nth-child(1) {
			display: grid;
			place-content: center;
		}
		.content {
			height: 400px;
			width: 90%;
			display: flex;
			box-sizing: border-box;
			flex-direction: column;
			margin: auto auto;
			justify-content: center;
			align-items: center;
		}
		.first {
			margin: 0;
		}

		.header {
			padding: 0;
			box-sizing: border-box;
			margin: 0;
			display: flex;
		}
		.first > div:nth-child(1) {
			height: 100%;
			display: grid;
			place-content: start;
		}
		.a-button > a > img {
			background-color: #fff9;
		}
	}
</style>
