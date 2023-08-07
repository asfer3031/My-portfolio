<script>
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	function cleanup() {
		sessionStorage.removeItem('isFunctionLoaded');
		sessionStorage.removeItem('products');
		sessionStorage.removeItem('cartItems');
	}

	onDestroy(() => {
		if (browser) {
			window.addEventListener('unload', cleanup);
		}
	});
</script>


	<slot />

