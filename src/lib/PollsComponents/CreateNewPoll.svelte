<script>
	import PollStore from '$lib/PollsComponents//stores/PollStore.js';
	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();
	import { fade, scale, slide } from 'svelte/transition';
	import Button from '$lib/PollsComponents/shared/Button.svelte';
	let fields = { question: '', answerA: '', answerB: '' };
	let errors = { question: '', answerA: '', answerB: '' };
	let valid = false;

	const submitHandler = () => {
		valid = true;

		if (fields.question.trim().length < 5) {
			valid = false;

			errors.question = '! Question must be more than 5 characters long';
		} else {
			errors.question = '';
		}

		if (fields.answerA.trim().length < 1) {
			valid = false;

			errors.answerA = '! Answer A connot be empty';
		} else {
			errors.answerA = '';
		}

		if (fields.answerB.trim().length < 1) {
			valid = false;

			errors.answerB = '! Answer B connot be empty';
		} else {
			errors.answerB = '';
		}

		if (valid) {
			let poll = { ...fields, votesA: 0, votesB: 0, id: Math.random() };

			PollStore.update((currentPolls) => {
				return [poll, ...currentPolls];
			});
			dispatch('add');
		}
	};
</script>

<form on:submit|preventDefault={submitHandler} in:fade out:scale>
	<div class="form-field">
		<label for="question">Poll Question: </label>
		<input type="text" id="question" bind:value={fields.question} />
		<div class="error">{errors.question}</div>
	</div>

	<div class="form-field">
		<label for="answer-a">Answer A: </label>
		<input type="text" id="answer-a" bind:value={fields.answerA} />
		<div class="error">{errors.answerA}</div>
	</div>

	<div class="form-field">
		<label for="answer-b">Answer B: </label>
		<input type="text" id="answer-b" bind:value={fields.answerB} />
		<div class="error">{errors.answerB}</div>
	</div>
	<Button type="secondary" flat={false}>Add Poll</Button>
</form>

<style>
	form {
		width: auto;
		text-align: center;
		box-shadow: 0px 2px 8px rgba(255, 0, 102, 0.5);
		padding: 25px;
		border-radius: 6px;
		border: 1px solid rgba(255, 0, 102, 0.9);
		margin: 10px;
	}

	.form-field {
		margin: 18px auto;
	}

	input {
		width: 100%;
		border-radius: 6px;
		border-left: 20px solid #45c496;
	}

	label {
		margin: 10px auto;
		text-align: center;
		color: rgba(0, 0, 0, 0.8);
		font-weight: bold;
	}

	.error {
		font-weight: bold;
		font-size: 12px;
		color: red;
	}

	label {
		display: block;
	}

	input {
		font-family: inherit;
		font-size: inherit;
		-webkit-padding: 0.4em 0;
		padding: 0.4em;
		margin: 0 0 0.5em 0;
		box-sizing: border-box;
		border: 1px solid #ccc;
		border-radius: 2px;
	}

	input:disabled {
		color: #ccc;
	}

	button {
		color: #333;
		background-color: #f4f4f4;
		outline: none;
	}

	button:disabled {
		color: #999;
	}

	button:not(:disabled):active {
		background-color: #ddd;
	}

	button:focus {
		border-color: #666;
	}
</style>
