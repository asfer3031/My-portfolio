<script>
	import { fade, scale, slide } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import PollDetails from '$lib/PollsComponents/PollDetails.svelte';
	/**
	 * @type {{ id: number; question: string; answerA: string; answerB: string; votesA: number; votesB: number; }[]}
	 */
	export let polls = [];
	import PollStore from '$lib/PollsComponents/stores/PollStore.js';

	PollStore.subscribe(
		(
			/** @type {{ id: number; question: string; answerA: string; answerB: string; votesA: number; votesB: number; }[]} */ data
		) => {
			polls = data;
		}
	);
</script>

<div class="Poll-List">
	{#each $PollStore as poll (poll.id)}
		<div in:fade out:scale|local animate:flip={{ duration: 500 }}><PollDetails {poll} /></div>
	{/each}
</div>

<style>
	.Poll-List {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 20px;
	}

	@media only screen and (max-width: 768px) {
		.Poll-List {
			grid-template-columns: 1fr;
		}
	}
</style>
