<script>
	import '$lib/global.css';
	import Sveltkit from '$lib/assets/images/sveltekit.png';
	import Button from '$lib/PollsComponents/shared/Button.svelte';
	import { fly, slide, scale, fade } from 'svelte/transition';
</script>

<main>
	<div class="wrapper">
		<div class="picture">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src="/src/lib/assets/images/Asbel-picture-complete.png" alt="An Image of me " />
		</div>

		<article>
			<h2>Hey There,</h2>
			<p>Asbel Fernandez Here.</p>
			<span>
				<p>
					Aspiring Front-end web developer with a passion for responsive website design, a firm
					believer in the mobile-first approach. Kindly note that I only Implemented custom css
					styles and no css libraries.
				</p>
			</span>
		</article>

		<div class="svelte-div">
			<p>Powered By:</p>

			<a href="https://kit.svelte.dev/" class="sveltekit-tag">
				<div class="svelteimage">
					<img src={Sveltkit} alt="" />
					<p>SVELTEKIT</p>
				</div>
			</a>
		</div>
	</div>

	<div class="menu" out:slide|local>
		<a href="/">
			<div class="top" in:fly={{ y: -100, duration: 900 }}>
				<h1>A.F</h1>
			</div>
		</a>

		<div class="space" />
		<ul>
			<li>
				<a href="/Projects"
					><div class="item">
						<p>Projects</p>
					</div></a
				>
			</li>
			<li>
				<a href="/about"
					><div class="item">
						<p>About</p>
					</div></a
				>
			</li>
			<li>
				<a href="/Resume"
					><div class="item">
						<p>Resume</p>
					</div></a
				>
			</li>
		</ul>
		<p>Powered By:</p>

		<a href="https://kit.svelte.dev/" class="sveltekit-tag">
			<div class="svelteimage">
				<img src={Sveltkit} alt="" />
				<p>SVELTEKIT</p>
			</div>
		</a>
	</div>
</main>

<style>
	.svelte-div {
		display: none;
	}
	.sveltekit-tag {
		height: auto;
		width: auto;
	}
	main {
		box-sizing: border-box;
		overflow: hidden;
		height: 100vh;
		display: flex;
		flex-direction: row;
	}
	.svelteimage {
		width: 100%;
		height: 40px;
		padding: 0;
		margin: 5px 0 0 0;
		background-color: #333;
		display: flex;
		flex-direction: row;
		border-top: 0.5px solid orangered;
		border-bottom: 0.5px solid orangered;
	}
	.svelteimage:hover {
		box-shadow: 0 0 2px 3px orangered;
	}
	.svelteimage > img {
		height: 100%;
		width: 30px;
	}
	.svelteimage > p {
		color: #fff8;
		line-height: 2rem;
		padding: 0;
		margin: 0;
		font-size: 1rem;
		display: grid;
		place-content: center;
		margin-left: 3px;
	}

	.wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		width: 100%;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		object-fit: cover;
		height: 100vh;
		background-image: linear-gradient(60deg, rgba(0, 0, 0, 0.3) 10%, rgba(0, 0, 0, 0.3) 100%),
			url('$lib/assets/images/background.jpg');
		margin: 0;
	}
	.wrapper > div:nth-child(1) {
		grid-column: 1;
		grid-row: 1 / span 2;
		height: 100%;
		padding: 0;
	}

	.wrapper > article:nth-child(2) {
		grid-column: 2 / span 1;
		grid-row: 1 / span 2;
		height: 100%;
		box-sizing: border-box;
		display: grid;
		place-content: center;
	}
	.wrapper > div:nth-child(3) {
		height: 100%;
	}

	.picture {
		box-sizing: border-box;
		padding: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
		background-color: rgb(6, 11, 20);
	}

	.picture > img {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		object-fit: cover;
	}

	span {
		height: 100%;
	}
	span > p {
		margin: 10px;
		color: rgba(255, 255, 255, 0.904);
		font-size: 16px;
		line-height: 1.2rem;
		font-family: 'roboto-slab';
		font-weight: 400;
		text-align: center;
		padding: 1rem;
	}
	.top {
		background-color: rgba(0, 0, 0, 0.9);
		width: 100%;
		height: 120px;
		display: grid;
		place-content: center;
	}
	.top > h1 {
		color: #fff7;
		font-family: 'roboto';
		font-size: xx-large;
		box-shadow: 0 2px #0066ff;
	}

	.menu {
		/* background-color: #333232; */
		background-color: rgb(6, 11, 20);
		height: 100%;
		width: 140px;
		display: block;
	}

	.menu > p {
		color: #fff7;
		text-align: center;
		font-family: 'roboto';
		font-weight: 200;
		margin: 10px 0 0 0;
		padding: 0;
	}

	.menu > a {
		text-decoration: none;
	}
	.menu > ul {
		list-style: none;
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	.menu > ul > li {
		border-bottom: 0.5px solid rgba(73, 72, 72, 0.9);
		padding: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		height: 80px;
	}
	.menu > ul > li:hover {
		border-top: 0.5px solid #0066ff;
		border-bottom: 0.5px solid #0066ff;
		color: #fff;
	}
	.menu > ul > li > a {
		text-decoration: none;
		color: #fff;
	}

	.space {
		border-bottom: 0.5px solid rgba(73, 72, 72, 0.9);
		height: 100px;
	}
	.item {
		display: grid;
		place-content: center;
		height: 100%;
		width: 100%;
	}
	.item > p {
		color: #fff;
		font-size: 1rem;
		font-family: 'roboto-slab';
	}
	.item:hover {
		background-color: rgba(255, 255, 255, 0.178);
	}

	.wrapper > article > h2 {
		font-size: 3rem;
		color: #fff;
		font-family: 'roboto';
		font-weight: 200;
		margin-top: 40px;
		padding: 0;
		margin: 0;
		text-align: center;
		text-shadow: 1px 1px 3px #fff9;
	}
	.wrapper > article > p {
		font-size: 1.5rem;
		font-family: 'robo-slab';
		margin: 10px;
		padding: 0;
		color: #fff;
		font-weight: bold;
		text-align: center;
		text-indent: 8rem;
	}

	@media only screen and (max-width: 1000px) {
		/* For mobile phones: */
		.wrapper {
			display: grid;
			height: 100%;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 2fr 3fr 1fr;
		}
		.picture {
			padding: 0;
			width: 100%;
			height: 100%;
			clip-path: none;
			background-color: transparent;
			margin: 0;
		}
		.picture > img {
			object-fit: contain;
		}
		.wrapper > div:nth-child(1) {
			grid-row: span 2;
			grid-column: 1 / span 2;
			height: 100%;
			padding: 0;
			margin: 0;
		}
		.wrapper > article:nth-child(2) {
			grid-column: 1 / span 2;
			grid-row: 1 / span 1;
			height: 100%;
			padding: 0;
			display: grid;
			place-content: end;
		}

		.wrapper > div:nth-child(3) {
			grid-row: span 3;
			grid-column: 1 / span 2;
			height: 100%;
			padding: 0;
			margin: 0;
		}

		.menu {
			display: none;
		}
		.svelte-div {
			display: flex;
			flex-direction: row;
			height: 100%;
			justify-content: center;
			background-color: #333;
		}
		.svelte-div > a {
			margin-left: 5px;

			text-decoration: none;
		}
		.svelte-div > p {
			color: #fff;
		}
		.svelteimage {
			width: 100%;
			height: 40px;
			padding: 2px;
			margin: 5px 0 0 0;
			background-color: #333;
			display: flex;
			flex-direction: row;
			justify-content: center;
			border: 0;
		}
	}
	@media only screen and (max-width: 600px) {
		.wrapper {
			grid-template-rows: 2fr 1fr 2fr;
		}
		.picture > img {
			object-fit: cover;
		}
		.picture {
			height: 100%;
		}
		.wrapper > div:nth-child(3) {
			grid-row: span 3;
			grid-column: 1 / span 2;
			height: 100%;
			padding: 0;
			margin: 0;
		}
	}
</style>
