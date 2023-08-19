<script>
	import { fade, slide, scale } from 'svelte/transition';

	export let showModal = false;
</script>

{#if showModal}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="Modal" in:fade out:fade role="dialog" aria-modal="true" on:click|self>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="inner" in:scale out:scale>
			<slot />
		</div>
	</div>
{/if}

<style>
	.inner {
		margin-top: 20px;
		width: 80%;
		height: 600px;
		border-radius: 0.2em;
		background: white;
		margin-left: auto;
		margin-right: auto;
		box-sizing: border-box;
		overflow: auto;
		padding: 5px;
	}

	.Modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.8);
		z-index: 1000;
	}
	@media all and (max-width: 780px) {
		.inner {
			width: 100%;
			margin-top: 0px;
			height: 100%;
			padding-bottom: 40px;
		}
	}
</style>
