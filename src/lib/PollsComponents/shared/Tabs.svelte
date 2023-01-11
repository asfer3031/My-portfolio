<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	/**
	 * @type {any}
	 */
	export let items;
	/**
	 * @type {any}
	 */
	export let activeItem;
</script>

<div class="tabs">
	<ul>
		{#each items as item}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li on:click={() => dispatch('tabChange', item)}>
				<div class:active={item === activeItem}>{item}</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.tabs {
		margin-bottom: 40px;
	}
	ul {
		display: flex;
		justify-content: center;
		padding: 0;
		list-style-type: none;
	}

	li {
		margin: 0px 16px;
		font-size: 16px;
		color: rgba(0, 0, 0, 0.8);
		cursor: pointer;
	}

	.active {
		color: #ff0080;
		border-bottom: 2px solid #ff0080;
		padding-bottom: 8px;
	}
</style>
