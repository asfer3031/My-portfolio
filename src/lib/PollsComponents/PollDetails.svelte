<script>
	/**
	 * @type {{ votesA: number; votesB: number; question: any; id: any; answerA: any; answerB: any; }}
	 */
	export let poll;
	import Card from '$lib/PollsComponents/shared/Card.svelte';
	import Button from '$lib/PollsComponents/shared/Button.svelte';
	$: totalVotes = poll.votesA + poll.votesB;
	$: percentA = Math.floor((100 / totalVotes) * poll.votesA) || 0;
	$: percentB = Math.floor((100 / totalVotes) * poll.votesB) || 0;
	import PollStore from '$lib/PollsComponents/stores/PollStore.js';
	import { tweened } from 'svelte/motion';

	const tweenedA = tweened(0);
	const tweenedB = tweened(0);

	$: tweenedA.set(percentA);
	$: tweenedB.set(percentB);

	const handleVote = (/** @type {string} */ option, /** @type {number} */ id) => {
		PollStore.update((currentPolls) => {
			let copiedPolls = [...currentPolls];
			const upvotedPoll = copiedPolls.find((poll) => poll.id == id);

			if (option === 'a') {
				upvotedPoll.votesA++;
			}

			if (option === 'b') {
				upvotedPoll.votesB++;
			}
			return copiedPolls;
		});
	};

	const handleDelete = (/** @type {number} */ id) => {
		PollStore.update((currentPolls) => {
			return currentPolls.filter((poll) => poll.id != id);
		});
	};
</script>

<Card>
	<div class="Poll">
		<h3>{poll.question}</h3>

		<p>Total Votes: {totalVotes}</p>

		<div class="answer" on:click={() => handleVote('a', poll.id)}>
			<div class="percent percent-a" style="width:{$tweenedA}%" />
			<span> {poll.answerA}({poll.votesA}) </span>
		</div>

		<div class="answer" on:click={() => handleVote('b', poll.id)}>
			<div class="percent percent-b" style="width:{$tweenedB}%" />
			<span> {poll.answerB}({poll.votesB}) </span>
		</div>
		<div class="delete">
			<Button flat={true} on:click={() => handleDelete(poll.id)}>Delete</Button>
		</div>
	</div>
</Card>

<style>
	h3 {
		margin: 0 auto;
		color: #555;
	}

	p {
		margin-top: 6px;
		font-size: 14px;
		margin-bottom: 30px;
		color: #aaa;
	}

	.answer {
		background: #fafafa;
		cursor: pointer;
		margin: 10px auto;
		position: relative;
	}

	.answer:hover {
		opacity: 0.6;
	}

	span {
		display: inline-block;
		padding: 10px 20px;
	}

	.percent {
		height: 100%;
		position: absolute;
		box-sizing: border-box;
	}

	.percent-a {
		border-left: 4px solid #d91b42;
		background: rgba(255, 0, 102, 0.1);
	}
	.percent-b {
		border-left: 4px solid #45c495;
		background: rgba(69, 196, 150, 0.1);
	}

	.delete {
		margin-top: 30px;
		text-align: center;
	}
</style>
