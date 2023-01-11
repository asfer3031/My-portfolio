<script>
	import Button from '$lib/assets/images/close-window-64.png';
	import { showUl } from '$lib/Javascript/store.js';
	function toggleUl() {
		showUl.update((showUl) => (showUl = false));
	}
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a href="/Projects" on:click={toggleUl}>
	<img src={Button} alt="" />
</a>

<style>
	a {
		margin: 0;
		padding: 0px;
		height: 2rem;
		width: 2rem;
		cursor: pointer;
	}
	a > img {
		margin: auto auto;
		height: 100%;
		width: 100%;
		margin: 0;
		opacity: 0.7;
	}
	a > img:hover {
		opacity: 0.9;
	}
</style>
