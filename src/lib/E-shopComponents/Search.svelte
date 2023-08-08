<script>
	// @ts-nocheck

	import { categoryValue, showcategories } from '$lib/Javascript/myStore.js';
	import { browser } from '$app/environment';
	import { onMount, afterUpdate } from 'svelte';
	import { filterProductsByCategory, isLoading } from '$lib/Javascript/Products.js';
	import { slide } from 'svelte/transition';

	let inputValue = '';
	let searchInput = '';

	/**
	 * @type {string | any[]}
	 */
	let filteredOptions = [];

	/**
	 * @type {boolean}
	 */
	let showclose;

	let selectedSuggestionIndex = -1;
	let shouldBlur = true; // Variable to track whether blur event should occur

	/**
	 * @param {{ target: { value: string; }; }} event
	 */
	function handleInput(event) {
		inputValue = event.target.value;
		filteredOptions = $categoryValue.filter((option) =>
			option.toLowerCase().includes(inputValue.toLowerCase())
		);

		selectedSuggestionIndex = filteredOptions.length;

		if (inputValue == '') {
			filteredOptions = [];
		}

		if (browser) {
			const searchBox = document.getElementById('myTextField');
			showclose = searchBox.value.trim().length > 0;
			searchBox.addEventListener('input', () => {
				if (searchBox.value.trim().length > 0) {
					showclose = true;
				} else {
					showclose = false;
				}
			});
		}
	}

	function handleSearch() {
		if (inputValue !== '') {
			const matchingOption = $categoryValue.find(
				(option) => option.toLowerCase() === inputValue.toLowerCase()
			);

			if (matchingOption) {
				applySelectedSuggestion(matchingOption);
			} else {
				// Show message to the user indicating no matching option found
				alert('No matching option found.');
			}
		}
	}

	function handleKeydown(event) {
		event.stopImmediatePropagation();

		if (event.key === 'ArrowDown') {
			if (selectedSuggestionIndex < filteredOptions.length - 1) {
				// Increment the selected suggestion index
				selectedSuggestionIndex++;
			} else {
				selectedSuggestionIndex = 0; // Wrap around to the first suggestion
			}
			inputValue = filteredOptions[selectedSuggestionIndex];
			console.log(inputValue);
		} else if (event.key === 'ArrowUp') {
			if (selectedSuggestionIndex > 0) {
				// Decrement the selected suggestion index
				selectedSuggestionIndex--;
			}
			inputValue = filteredOptions[selectedSuggestionIndex];
		} else if (event.key === 'Enter') {
			event.preventDefault();

			if (inputValue !== '') {
				const matchingOption = $categoryValue.find(
					(option) => option.toLowerCase() === inputValue.toLowerCase()
				);

				if (matchingOption) {
					applySelectedSuggestion(matchingOption);
				} else {
					// Show message to the user indicating no matching option found
					alert('No matching option found.');
				}
			}
		}
	}

	function handleScroll() {
		filteredOptions = [];
	}

	function clearInput() {
		inputValue = '';
		showclose = false;
		filteredOptions = [];
		if (browser) {
			document.getElementById('myTextField').focus();
			// sessionStorage.setItem('myString', inputValue);
		}
	}

	let lastSelectedSuggestion = ''; // Store the last selected suggestion separately

	function applySelectedSuggestion(selectedSuggestion) {
		if (selectedSuggestion !== '') {
			inputValue = selectedSuggestion;
		} else {
			// No selected suggestion, use the last selected suggestion if available
			if (lastSelectedSuggestion !== '') {
				inputValue = lastSelectedSuggestion;
			}
		}
		if (browser) {
			sessionStorage.setItem('myString', inputValue);
		}
		isLoading.update((isLoading) => (isLoading = true));
		window.location.href = '/Projects/E-shop/detailedpage';
	}

	function handleInputFocus() {
		if (inputValue !== '') {
			if (browser) {
				sessionStorage.setItem('myString', inputValue);
			}
		}
		console.log('Input field value:', inputValue);
		// Run additional code or function calls as needed
	}

	function handleBlur() {
		if (shouldBlur) {
			// Check if blur event should occur
			console.log('clicked outside');
			selectedSuggestionIndex = -1;
			filteredOptions = [];
		}
		shouldBlur = true; // Reset shouldBlur to true
	}

	function handleClickSearch(index) {
		console.log('igotclicked');
		if (filteredOptions[index]) {
			inputValue = filteredOptions[index];
			console.log(index);

			if (browser) {
				sessionStorage.setItem('myString', inputValue);
			}

			shouldBlur = false; // Prevent blur event from occurring
			applySelectedSuggestion(inputValue);
		}
	}
</script>

<svelte:window on:scroll={handleScroll} />

<main>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div class="autocomplete-container" on:blur={handleBlur} tabindex="0">
		<div class="input-area">
			<div class="input-form">
				<input
					type="text"
					class="autocomplete-input"
					on:input={handleInput}
					bind:value={inputValue}
					id="myTextField"
					placeholder="Search Here..."
					autocomplete="off"
					on:focus={handleInputFocus}
					on:keydown={handleKeydown}
				/>

				{#if showclose}
					<button on:click={clearInput}>X</button>
				{/if}
			</div>
		</div>
		<button class="submit-button" type="submit" on:click={handleSearch}>
			<i>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="m18.9 20.3l-5.6-5.6q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.625 5.625q.275.275.275.675t-.3.7q-.275.275-.7.275t-.7-.275ZM9.5 14q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z"
					/></svg
				>
			</i>
		</button>

		{#if filteredOptions.length > 0}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<ul class="autocomplete-list" in:slide out:slide on:click|stopPropagation id="liElement">
				{#each filteredOptions as option, index}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<li
						on:click={() => handleClickSearch(index)}
						class:selected={selectedSuggestionIndex === index}
					>
						{option}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</main>

<style>
	.selected {
		background-color: #e0dcdc;
		/* Add any other styles you want for the selected suggestion */
	}
	.autocomplete-container {
		position: relative;
		height: 35px;
		margin: 0;
		display: flex;
		flex-direction: row;
		border-radius: 4px;
		width: 100%;
		background-color: green;
	}
	.input-form {
		position: relative;
		height: 100%;
		border-radius: 4px;
		margin: 0;
	}
	.input-form button {
		position: absolute;
		top: 0;
		right: 0;
		font-size: 1.1rem;
		padding: 0;
		margin: 0;
		box-shadow: none;
		border: none;
		cursor: pointer;
		color: #4c5051;
		justify-self: flex-end;
		height: 100%;
		width: 35px;
		display: grid;
		place-content: center;
		background: none;
	}
	.input-form button:hover {
		color: rgba(0, 0, 0, 0.8);
	}
	.input-area {
		width: 100%;
		position: relative;
		border-radius: 4px;
		height: 100%;
		display: block;
		padding: 0;
		flex-direction: row;
	}
	.submit-button {
		background-color: #49fa9e;
		margin: 0;
		box-shadow: none;
		border: 0;
		cursor: pointer;
		display: grid;
		place-content: center;
		width: 50px;
		color: #333;
		font-family: sans-serif;
		font-weight: 400;
		font-size: 0.8rem;
		transition: ease-in-out 0.2s;
		border-radius: 0 4px 4px 0;
	}
	.submit-button i {
		font-size: 24px;
		display: grid;
		place-content: center;
	}

	.submit-button:hover {
		background-color: #00974a;
		color: #fff;
	}

	.autocomplete-input {
		height: 100%;
		padding: 14px;
		font-size: 16px;
		box-sizing: border-box;
		outline: #f2f2f2;
		background: #ffffff;
		border: 0.5px solid #ccc;
		border-radius: 4px 0 0px 4px;
		width: 100%;
	}

	.autocomplete-list {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		z-index: 1;
		margin-top: 5px;
		padding: 5px 5px;
		background-color: #fff;
		border: 1px solid #ccc;
		border-top: none;
		border-radius: 0 0 4px 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		list-style: none;
		height: auto;
		width: 100%;
		overflow-y: auto;
		color: rgba(0, 0, 0, 0.5);
		transition: ease-in-out 0.5s;
		box-sizing: border-box;
	}
	.autocomplete-list li {
		font-size: 0.9em !important;
		line-height: normal !important;
		font-family: 'poppins';
		letter-spacing: 0.5px;
		color: rgba(0, 0, 0, 0.7);
	}
	.autocomplete-list li:hover {
		background-color: #e0dcdc;
		cursor: pointer;
	}

	/* @media only screen and (max-width: 500px) {
		.autocomplete-container {
			width: 95%;
			height: 100%;
			padding: 0 0.5rem;
			margin: auto auto;
		}
		.input-area {
			width: 100%;
			height: 100%;
			margin: 0;
		}
	} */
</style>
