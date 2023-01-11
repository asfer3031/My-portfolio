<script>
	import { fly, slide, scale, fade } from 'svelte/transition';
	import { showUl, switchUl } from '$lib/Javascript/store.js';
	import { projects } from '$lib/Javascript/store.js';

	import '$lib/global.css';

	/**
	 * @type {boolean}
	 */

	let showUlValue;
	/**
	 * @type {number}
	 */
	let switchTab;

	showUl.subscribe((value) => {
		showUlValue = value;
	});

	switchUl.subscribe((value) => {
		switchTab = value;
	});

	function toggleUl() {
		showUl.update((showUl) => (showUl = false));
	}

	/**
	 * @param {number} i
	 */

	function setUlactive(i) {
		switchUl.update((switchUl) => (switchUl = i));
		showUl.update((showUl) => (showUl = true));
	}
</script>

<div class="header">
	<a href="/" class="top" in:fly={{ y: -100, duration: 900 }} on:click={toggleUl}>
		<h1>A.F</h1>
	</a>
	<div class="links">
		{#if showUlValue}
			<div class="middle" in:fly={{ y: -100, duration: 1000, delay: 500 }}>
				<p>Projects:</p>
				<ul>
					{#each projects as item, i}
						<!-- svelte-ignore a11y-invalid-attribute -->
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<li class:active={i === switchTab} on:click={() => setUlactive(i)}>
							<a href={item.url}>{item.id}</a>
						</li>
					{/each}
				</ul>
			</div>
		{:else}
			<h1 in:fly={{ y: -100, duration: 500 }}>Projects</h1>
		{/if}
	</div>
</div>
<slot />

<style>
	:global(body, html) {
		/* this will apply to <body> */
		margin: 0;
		overflow-x: hidden;
		padding: 0;
	}
	.active {
		border-bottom: 2px solid #0066ff;
	}
	.links > h1 {
		color: #999;
		font-family: 'roboto';
		text-transform: uppercase;
		margin: 0;
		text-align: center;
	}
	.links {
		margin-left: 30%;
		display: grid;
		place-content: center;
	}
	.middle {
		display: flex;
		flex-direction: column;
		align-items: center;
		align-self: center;
	}
	.middle > p {
		margin-bottom: 10px;
	}
	.middle > ul {
		display: flex;
		flex-direction: row;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.middle > ul > li {
		margin-right: 15px;
		padding: 0;
	}
	.middle > ul > li > a {
		padding: 0;
		color: #999;
		text-decoration: none;
		font-family: 'roboto-slab';
	}
	.middle > ul > li > a:hover {
		color: #fff;
		cursor: pointer;
	}

	.header {
		background-color: rgb(6, 11, 20);
		border: 0.5px solid #101010;
		display: flex;
		flex-direction: row;
		height: 80px;
	}

	.middle > p {
		color: #999;
		font-size: 1rem;
		margin-right: 5px;
		font-family: 'roboto';
		text-decoration: underline;
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
		.links > h1 {
			margin: 0;
			font-size: 1.5rem;
		}
		.middle > ul > li > a {
			padding: 0;
			margin: 0;
			color: #999;
			text-decoration: none;
			font-family: 'roboto-slab';
			font-size: 0.9rem;
		}
		.links {
			margin-left: 10px;
			display: grid;
			place-content: center;
		}
		.middle > ul > li {
			margin: 4px;
			padding: 0;
		}
		.middle > p {
			margin: 0;
		}
		.middle > ul {
			margin: 0;
			padding: 0;
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
