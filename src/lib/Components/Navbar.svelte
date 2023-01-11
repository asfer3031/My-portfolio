<script>
	import { fly, slide, scale, fade } from 'svelte/transition';
	import Menu from '$lib/assets/images/menu-4-64.png';
	import Close from '$lib/assets/images/circle-xmark-solid.svg';
	import Sveltkit from '$lib/assets/images/sveltekit.png';

	export let Showmenu = false;

	const openNavbar = () => {
		Showmenu = !Showmenu;
		console.log(Showmenu);
	};
</script>

<main>
	<nav class="nav">
		<a href="/">
			<div class="logo"><h1>A.F</h1></div>
		</a>

		<button class="menu-button" on:click={openNavbar}>
			<img src={Menu} class="menu-icon" alt="" /></button
		>
	</nav>
	{#if Showmenu == true}
		<!-- svelte-ignore a11y-click-events-have-key-events -->

		<div class="Side-menu" in:fly={{ x: 700, duration: 600 }} out:fly={{ x: 900, duration: 1000 }}>
			<div class="side-nav-header">
				<button class="side-nav-close" on:click={openNavbar}>
					<img src={Close} class="menu-icon" alt="" /></button
				>
			</div>
			<ul>
				<li>
					<a href="/Projects" on:click={openNavbar}>Projects </a>
				</li>
				<li><a href="/about" on:click={openNavbar}>About</a></li>
				<li><a href="/Resume" on:click={openNavbar}>Resume</a></li>
			</ul>

			<div class="side-menu-footer">footer</div>
		</div>
	{/if}
</main>

<style>
	.nav {
		height: 80px;
		background-color: rgb(6, 11, 20);
		width: 100%;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		box-shadow: 0 0 2px 3px #fff;
		border-bottom: 1px solid black;
		/* z-index: 12;
		position: fixed;
		top: 0; */
	}
	.side-nav-header {
		height: 80px;
		background-color: rgb(6, 11, 20);
		width: 100%;
		border-bottom: 1px solid #fff7;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.menu-button {
		height: 100%;
		width: 80px;
		background: none;
		border: none;
		box-shadow: none;
		opacity: 0.5;
		padding: 25px;
		box-sizing: border-box;
	}
	.side-nav-close {
		height: 50px;
		width: 50px;
		box-shadow: none;
		padding: 0;
		box-sizing: border-box;
		border: 0.5px solid #fff7;
		border-radius: 50%;
		background-color: #fff7;
		margin-right: 1rem;
	}
	.menu-icon {
		height: 100%;
		width: 100%;
	}
	.logo > h1 {
		box-shadow: 0 2px #0066ff;
	}
	a {
		text-decoration: none;
	}
	.logo {
		height: 100%;
		width: 80px;
		display: grid;
		place-items: center;
		background-color: rgba(0, 0, 0, 0.9);
	}
	.logo > h1 {
		margin: 0;
		color: #fff9;
		text-align: center;
	}

	.side-menu-footer {
		height: 10px;
		background-color: white;
		width: 100%;
	}
	.Side-menu {
		height: 100vh;
		width: 80%;
		background-color: rgb(6, 11, 20);
		z-index: 114;
		position: fixed;
		right: 0;
		top: 0;
		border-top: 1px solid white;
		border-left: 0.5px solid #fff7;
		padding: 0;
	}
	.Side-menu > ul {
		width: 100%;
		display: flex;
		flex-direction: column;
		height: 100%;
		margin: 0;
		padding: 0;
		align-items: center;
		list-style: none;
		box-sizing: border-box;
	}
	.Side-menu ul > li {
		height: 5rem;
		width: 100%;
		text-align: center;
		display: grid;
		place-content: center;
		border-bottom: 1px solid;
	}

	.Side-menu ul > li > a {
		line-height: 5em;
		text-transform: uppercase;
		text-decoration: none;
		letter-spacing: 0.4em;
		color: #0066ff;
		display: block;
		font-family: 'roboto-slab';
	}

	@media only screen and (min-width: 1000px) {
		.nav {
			display: none;
		}
	}
</style>
