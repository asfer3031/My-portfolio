<script>
	import { slide } from 'svelte/transition';
	import Navbar from '$lib/Components/Navbar.svelte';
</script>

<Navbar />

<slot />

<style>
	:global(body, html) {
		/* this will apply to <body> */
		margin: 0;
		/* background: linear-gradient(90deg, rgb(30, 35, 46) 0%, rgb(16, 23, 34) 100%); */
		overflow-x: hidden;
		padding: 0;
	}
</style>
