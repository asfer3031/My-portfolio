<script>
	// import NavBar from '$lib/navbar.svelte';
	import Footer from '$lib/Picture-FetcherComponents/Footer.svelte';
</script>

<!-- <NavBar /> -->
<slot />
<Footer />

<style>
	:global(body, html) {
		/* this will apply to <body> */
		margin: 0;
		overflow-x: hidden;
		padding: 0;
	}
</style>
