<script>
	import { fly, slide, scale, fade } from 'svelte/transition';

	import '$lib/global.css';
</script>

<div class="header">
	<a href="/" class="top" in:fly={{ y: -100, duration: 900 }}>
		<h1>A.F</h1>
	</a>
</div>

<slot />

<style>
	:global(body, html) {
		/* this will apply to <body> */
		margin: 0;
		overflow-x: hidden;
		padding: 0;
	}

	.header {
		position: fixed;
		top: 0;
		width: 100%;
		background-color: rgb(6, 11, 20);
		border: 0.5px solid #101010;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 80px;
		z-index: 100;
	}

	.top {
		background-color: rgba(0, 0, 0, 0.9);
		width: 80px;
		height: 100%;
		display: grid;
		place-content: center;
		text-decoration: none;
		height: 100%;
	}
	.top > h1 {
		color: #fff7;
		font-family: 'roboto';
		font-size: xx-large;
		box-shadow: 0 2px #0066ff;
		margin: 0;
	}

	.top:hover::after {
		content: 'Home';
		color: #fff;
		text-align: center;
		font-size: 0.8rem;
		transition: height 0.5s;
		margin-top: 5px;
		/* background-color: #0066ff; */
		border: 0.5px solid #0066ff;
		border-radius: 6px;
	}
	@media only screen and (max-width: 768px) {
		/* for mobile phones */

		.top {
			background-color: rgba(0, 0, 0, 0.9);
			width: 80px;
			height: 100%;
			display: grid;
			place-content: center;
			text-decoration: none;
			height: 100%;
			padding: 5px;
			box-sizing: border-box;
		}

		.top > h1 {
			color: #fff7;
			font-family: 'roboto';
			font-size: 1.5rem;
			box-shadow: 0 2px #0066ff;
			margin: 0;
		}
		.header {
			background-color: rgb(6, 11, 20);
			border: 0.5px solid #101010;
			display: flex;
			flex-direction: row;
			height: 80px;
		}
	}
</style>
